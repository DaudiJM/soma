package tz.ac.dit.simsbe.modules.staff_module;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.api.request.ApiRequestBody;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.curriculum.Curriculum;
import tz.ac.dit.simsbe.curriculum.CurriculumDao;
import tz.ac.dit.simsbe.modules.ModuleDto;
import tz.ac.dit.simsbe.modules.ModuleService;
import tz.ac.dit.simsbe.programme.Programme;
import tz.ac.dit.simsbe.programme.ProgrammeDao;
import tz.ac.dit.simsbe.programme.ProgrammeDto;
import tz.ac.dit.simsbe.staff.Staff;
import tz.ac.dit.simsbe.staff.StaffDao;
import tz.ac.dit.simsbe.utilities.Status;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class StaffModuleService {
    @Autowired
    private StaffModuleDao staffModuleDao;
    @Autowired
    private StaffDao staffDao;
    @Autowired
    private CurriculumDao curriculumDao;
    @Autowired
    private ProgrammeDao programmeDao;
    @Autowired
    private ModuleService moduleService;

    public ApiResponse<StaffModuleDto> assignModule(ApiRequestBody<StaffModuleDto> requestBody){
        ApiResponse<StaffModuleDto> response = new ApiResponse<>();
        String responseMessage;
        StaffModuleDto staffModuleData = requestBody.getData();
        if(staffDao.existsById(staffModuleData.getStaffId())){
            Optional<Staff> staff = staffDao.findById(staffModuleData.getStaffId());
            assert staff.isPresent();
            for(Long moduleId: staffModuleData.getModulesIds()){
                if(!curriculumDao.findByModuleId(moduleId).isEmpty()){
                    for(Curriculum courseModule: curriculumDao.findByModuleId(moduleId)){
                        StaffModule staffModule = new StaffModule();
                        staffModule.setLecturer(staff.get());
                        staffModule.setCurriculum(courseModule);
                        staffModule.setYear(String.valueOf(LocalDate.now().getYear()));
                        staffModule.setStatus(Status.ACTIVE);
                        staffModuleDao.save(staffModule);
                    }
                }
            }
            responseMessage = "Modules Assigned Successfully";
            return response.success(staffModuleData, responseMessage);
        }
        responseMessage = "Failed to Assign Module to Staff. No Staff with Id " + staffModuleData.getStaffId();
        return response.failed(staffModuleData, responseMessage);
    }

    public ApiResponse<ModuleDto> getLecturerClassModule(Long classId, Long lecturerId){
        ApiResponse<ModuleDto> response = new ApiResponse<>();
        if(Objects.isNull(classId) || programmeDao.findById(classId).isEmpty()){
            return response.failed(new ModuleDto(), "Class was not found");
        }

        if(Objects.isNull(lecturerId) || staffModuleDao.findByLecturerId(lecturerId).isEmpty()){
            return response.failed(new ModuleDto(), "Modules not found");
        }

        Programme programme = programmeDao.findById(classId).get();

        List<StaffModule> staffModules = staffModuleDao.findByLecturerId(lecturerId);
        for(StaffModule staffModule : staffModules){
            if(staffModule.getCurriculum().getCourse().equals(programme.getCourse())){
                return response.success(moduleService.getModuleDto(staffModule.getCurriculum().getModule()), "");
            }
        }

        return response.failed(new ModuleDto(), "Modules not found");
    }
}
