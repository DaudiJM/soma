package tz.ac.dit.simsbe.modules;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.api.request.ApiRequestBody;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.award.Award;
import tz.ac.dit.simsbe.award.AwardDao;
import tz.ac.dit.simsbe.course.CourseDao;
import tz.ac.dit.simsbe.curriculum.Curriculum;
import tz.ac.dit.simsbe.curriculum.CurriculumDao;
import tz.ac.dit.simsbe.department.Department;
import tz.ac.dit.simsbe.department.DepartmentDao;
import tz.ac.dit.simsbe.utilities.Status;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ModuleService {
    @Autowired
    private ModuleDao moduleDao;
    @Autowired
    private DepartmentDao departmentDao;
    @Autowired
    private AwardDao awardDao;
    @Autowired
    private CurriculumDao curriculumDao;
    @Autowired
    private CourseDao courseDao;

    public ApiResponse<ModuleDto> createModule(ApiRequestBody<ModuleDto> requestBody){
        ApiResponse<ModuleDto> response = new ApiResponse<>();
        String responseMessage;
        ModuleDto moduleData = requestBody.getData();
        if(moduleDao.findByCode(moduleData.getCode()).isEmpty()){
            if(departmentDao.existsById(moduleData.getDepartmentId())){
                if(awardDao.findByLevel(moduleData.getAwardLevel()).isPresent()){
                    Optional<Award> award = awardDao.findByLevel(moduleData.getAwardLevel());
                    assert award.isPresent();
                    if(!moduleDao.findAllByAwardLevel(moduleData.getAwardLevel()).isEmpty()){
                        for(Module module: moduleDao.findAllByAwardLevel(moduleData.getAwardLevel())){
                            if(Objects.equals(module.getTitle(), moduleData.getTitle())){
                                responseMessage = "Failed to Add Module. Module with the same Title exist";
                                return response.failed(moduleData, responseMessage);
                            }
                        }
                    }
                    Optional<Department> department = departmentDao.findById(moduleData.getDepartmentId());
                    assert department.isPresent();
                    Module module = new Module();
                    module.setTitle(moduleData.getTitle());
                    module.setCode(moduleData.getCode());
                    module.setStatus(Status.ACTIVE);
                    module.setAward(award.get());
                    module.setDepartment(department.get());
                    module.setCredits(moduleData.getCredits());
                    module.setSemester(moduleData.getSemester());
                    responseMessage = "Module Saved successfully.";
                    return response.success(getModuleDto(moduleDao.save(module)), responseMessage);
                }
                responseMessage = "Failed to Add module. Selected award was not found in records";
                return response.failed(moduleData, responseMessage);
            }
            responseMessage = "failed to Add module. Module no department provided.";
            return response.failed(moduleData, responseMessage);
        }
        responseMessage = "Failed to Add module. module with the same Module code already exist in records.";
        return response.failed(moduleData, responseMessage);
    }

    public ApiResponse<List<ModuleDto>> getAllModules(){
        ApiResponse<List<ModuleDto>> response = new ApiResponse<>();
        String responseMessage;
        List<ModuleDto> modules = new ArrayList<>();
        Sort sort = Sort.by("award").ascending().and(Sort.by("code"));
        for(Module module: moduleDao.findAll()){
            modules.add(getModuleDto(module));
        }
        responseMessage = modules.size() + " modules found in records";
        return response.success(modules, responseMessage);
    }

    public ApiResponse<List<ModuleDto>> getAllDepartmentModules(Long departmentId){
        ApiResponse<List<ModuleDto>> response = new ApiResponse<>();
        String responseMessage;
        List<ModuleDto> modules = new ArrayList<>();
        Sort sort = Sort.by("award").ascending().and(Sort.by("code"));
        for(Module module: moduleDao.findAllByDepartmentId(departmentId, sort)){
            modules.add(getModuleDto(module));
        }
        responseMessage = modules.size() + " modules found in records";
        return response.success(modules, responseMessage);
    }

    public ApiResponse<ModuleDto> getModule(Long moduleId){
        ApiResponse<ModuleDto> response = new ApiResponse<>();
        String responseMessage;
        if(moduleDao.existsById(moduleId)){
            Optional<Module> module = moduleDao.findById(moduleId);
            assert module.isPresent();
            responseMessage = "Module data found in records.";
            return response.success(getModuleDto(module.get()), responseMessage);
        }
        responseMessage = "Failed to get Module. No module with Id " + moduleId;
        return response.failed(new ModuleDto(), responseMessage);
    }

    public ApiResponse<List<ModuleDto>> getUnsignedModules(Long courseId){
        ApiResponse<List<ModuleDto>> response = new ApiResponse<>();
        String responseMessage;
        List<ModuleDto> modules = new ArrayList<>();
        if(courseDao.existsById(courseId)){
            for(Module module: moduleDao.findAll(Sort.by("award").and(Sort.by("code")))){
                if(curriculumDao.findByModuleId(module.getId()).isEmpty()){
                    modules.add(getModuleDto(module));
                } else {
                    for(Curriculum courseModule: curriculumDao.findByModuleId(module.getId())){
                        if(!Objects.equals(courseId, courseModule.getCourse().getId())){
                            modules.add(getModuleDto(module));
                        }
                    }
                }

            }

            responseMessage = modules.size() + " Unsigned Modules found in records.";
            return response.success(modules, responseMessage);
        }
        responseMessage = "Failed to get Modules. No Course with Id " + courseId;
        return response.failed(modules, responseMessage);
    }
    public ModuleDto getModuleDto(Module module){
        ModuleDto moduleData = new ModuleDto();
        moduleData.setId(module.getId());
        moduleData.setCode(module.getCode());
        moduleData.setTitle(module.getTitle());
        moduleData.setDepartment(Objects.equals(null, module.getDepartment()) ? null : module.getDepartment().getName());
        moduleData.setCreatedAt(module.getCreatedAt());
        moduleData.setUpdatedAt(module.getUpdatedAt());
        moduleData.setCredits(module.getCredits());
        moduleData.setStatus(module.getStatus().name());
        moduleData.setSemester(module.getSemester());
        moduleData.setAwardLevel(module.getAward().getLevel());
        return moduleData;
    }
}
