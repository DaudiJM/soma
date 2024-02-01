package tz.ac.dit.simsbe.result.programme_result;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.course.Course;
import tz.ac.dit.simsbe.curriculum.CurriculumDao;
import tz.ac.dit.simsbe.modules.staff_module.StaffModule;
import tz.ac.dit.simsbe.modules.staff_module.StaffModuleDao;
import tz.ac.dit.simsbe.programme.Programme;
import tz.ac.dit.simsbe.programme.ProgrammeDao;
import tz.ac.dit.simsbe.programme.ProgrammeDto;
import tz.ac.dit.simsbe.programme.ProgrammeService;
import tz.ac.dit.simsbe.staff.StaffDao;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ProgrammeResultService {
    @Autowired
    private ProgrammeDao programmeDao;
    @Autowired
    private StaffModuleDao staffModuleDao;
    @Autowired
    private StaffDao staffDao;
    @Autowired
    private CurriculumDao curriculumDao;
    @Autowired
    private ProgrammeService programmeService;

    public ApiResponse<ProgrammeList> getProgrammeList(Long lecturerId){
        ApiResponse<ProgrammeList> response = new ApiResponse<>();
        String responseMessage;
        ProgrammeList programmeList = new ProgrammeList();
        List<ProgrammeDto> programmes = new ArrayList<>();
        if(staffDao.existsById(lecturerId)){
            if(!staffModuleDao.findAllByLecturerIdAndYear(lecturerId, String.valueOf(LocalDate.now().getYear())).isEmpty()){
                for(StaffModule staffModule: staffModuleDao.findAllByLecturerIdAndYear(lecturerId, String.valueOf(LocalDate.now().getYear()))){
                    Course course = staffModule.getCurriculum().getCourse();
                    if(!programmeDao.findByCourseId(course.getId()).isEmpty()){
                        for(Programme programme: programmeDao.findByCourseId(course.getId())){
                            if(Objects.equals(programme.getAward(), staffModule.getCurriculum().getModule().getAward())){
                                programmes.add(programmeService.getProgrammeDto(programme));
                            }
                        }
                    }
                }
                programmeList.setLecturerId(lecturerId);
                programmeList.setProgrammes(programmes);
                responseMessage = programmes.size() + " Classes found for Lecturer.";
                return response.success(programmeList, responseMessage);
            }
            responseMessage = "Failed to get Lecturer's class List. Lecturer has no assigned modules";
            return response.failed(programmeList, responseMessage);
        }
        responseMessage = "Failed to get Lecturer's Class list. No Staff with Id " + lecturerId;
        return response.failed(programmeList, responseMessage);
    }
}
