package tz.ac.dit.simsbe.curriculum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.api.request.ApiRequestBody;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.course.Course;
import tz.ac.dit.simsbe.course.CourseDao;
import tz.ac.dit.simsbe.modules.Module;
import tz.ac.dit.simsbe.modules.ModuleDao;
import tz.ac.dit.simsbe.programme.Programme;
import tz.ac.dit.simsbe.programme.ProgrammeDao;
import tz.ac.dit.simsbe.utilities.Category;
import tz.ac.dit.simsbe.utilities.Status;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CurriculumService {
    @Autowired
    private CurriculumDao curriculumDao;
    @Autowired
    private ModuleDao moduleDao;
    @Autowired
    private CourseDao courseDao;
    @Autowired
    private ProgrammeDao programmeDao;

    public ApiResponse<CurriculumDto> addModuleToCourseCurriculum(ApiRequestBody<CurriculumDto> requestBody){
        ApiResponse<CurriculumDto> response = new ApiResponse<>();
        String responseMessage;
        CurriculumDto curriculumData = requestBody.getData();
        if(!Objects.equals(null, curriculumData.getId()) && curriculumDao.existsById(curriculumData.getId())){
            return updateCurriculum(requestBody);
        }

        if(moduleDao.findByCode(curriculumData.getModuleCode()).isPresent()){
            if(courseDao.findById(curriculumData.getCourseId()).isPresent()){
                Course course = courseDao.findById(curriculumData.getCourseId()).get();
                Module module = moduleDao.findByCode(curriculumData.getModuleCode()).get();
                if(Objects.isNull(curriculumData.getModuleCategory())){
                    curriculumData.setModuleCategory(Category.CORE.name());
                }

                Category category = switch (curriculumData.getModuleCategory()){
                    case "FUNDAMENTAL" -> Category.FUNDAMENTAL;
                    case "ELECTIVE" -> Category.ELECTIVE;
                    default -> Category.CORE;
                };

                Curriculum section = new Curriculum();
                section.setCourse(course);
                section.setModule(module);
                section.setModuleCategory(category);
                section.setStatus(Status.ACTIVE);
                responseMessage = "Module Added to Course Curriculum Successfully";
                return response.success(getCurriculumDto(curriculumDao.save(section)), responseMessage);
            }
            responseMessage = "Failed to Add Module to Course Curriculum. No Course with Id " + curriculumData.getCourseId();
            return response.failed(curriculumData, responseMessage);
        }
        responseMessage = "Failed to Add Module to Course Curriculum. No Module with Module Code " + curriculumData.getModuleCode();
        return response.failed(curriculumData, responseMessage);
    }

    public ApiResponse<CurriculumDto> updateCurriculum(ApiRequestBody<CurriculumDto> requestBody){
        ApiResponse<CurriculumDto> response = new ApiResponse<>();
        String responseMessage;
        CurriculumDto curriculumData = requestBody.getData();
        if(curriculumDao.existsById(curriculumData.getId())){
           if(moduleDao.findByCode(curriculumData.getModuleCode()).isPresent()){
               Optional<Curriculum> section = curriculumDao.findById(curriculumData.getId());
               assert section.isPresent();

               Category category = switch (curriculumData.getModuleCategory()){
                   case "FUNDAMENTAL" -> Category.FUNDAMENTAL;
                   case "ELECTIVE" -> Category.ELECTIVE;
                   default -> Category.CORE;
               };

               section.get().setModuleCategory(category);
               responseMessage = "Course Module updated successfully.";
               return response.success(getCurriculumDto(curriculumDao.save(section.get())), responseMessage);
           }
            responseMessage = "Failed to Update Course Module. No Module with Module Code " + curriculumData.getModuleCode();
           return response.failed(curriculumData, responseMessage);
        }
        responseMessage = "Failed to Update Course Module. Failed to find Course Module with Id " + curriculumData.getId();
        return response.failed(curriculumData, responseMessage);
    }

    public ApiResponse<CourseCurriculum> getCourseCurriculum(Long courseId){
        ApiResponse<CourseCurriculum> response = new ApiResponse<>();
        String responseMessage;
        List<CurriculumDto> modules = new ArrayList<>();
        CourseCurriculum courseCurriculum = new CourseCurriculum();
        if(courseDao.existsById(courseId)){
            Optional<Course> course = courseDao.findById(courseId);
            assert course.isPresent();
            courseCurriculum.setId(courseId);
            courseCurriculum.setCourse(course.get().getTitle());
            if(!curriculumDao.findByCourseId(courseId).isEmpty()){
                for(Curriculum curriculum: curriculumDao.findByCourseId(courseId)){
                    modules.add(getCurriculumDto(curriculum));
                }
                courseCurriculum.setModules(modules);
                responseMessage = "Course Curriculum found in records.";
                return response.success(courseCurriculum, responseMessage);
            }
            responseMessage = "Course curriculum has no modules assigned";
            return response.success(courseCurriculum, responseMessage);
        }
        responseMessage = "Failed to get course Curriculum. No course with Id " + courseId;
        return response.failed(courseCurriculum, responseMessage);
    }

    public ApiResponse<CourseCurriculum> getClassSemesterModules(Long programmeId){
        ApiResponse<CourseCurriculum> response = new ApiResponse<>();
        String responseMessage;
        CourseCurriculum courseCurriculum = new CourseCurriculum();
        if(programmeDao.existsById(programmeId)){
            Optional<Programme> programme = programmeDao.findById(programmeId);
            assert programme.isPresent();
            courseCurriculum.setCourse(programme.get().getCourse().getTitle());
            courseCurriculum.setId(programme.get().getCourse().getId());
            List<CurriculumDto> modules = new ArrayList<>();
            if(!curriculumDao.findByCourseId(programme.get().getCourse().getId()).isEmpty()){
                for(Curriculum courseModule: curriculumDao.findByCourseId(programme.get().getCourse().getId())){
                    if(Objects.equals(programme.get().getAward(), courseModule.getModule().getAward())){
                        modules.add(getCurriculumDto(courseModule));
                    }
                }
                courseCurriculum.setModules(modules);
                responseMessage = modules.size() + " Modules for Current Semester Found.";
                return response.success(courseCurriculum, responseMessage);
            }
            responseMessage = "No Modules assigned for the Course.";
            return response.failed(courseCurriculum, responseMessage);
        }
        responseMessage = "Failed to get Class Semester Modules. No Class with Id " + programmeId;
        return response.failed(courseCurriculum, responseMessage);
    }

    public ApiResponse<CourseCurriculum> setCourseCurriculum(CourseCurriculum courseCurriculum){
        ApiResponse<CourseCurriculum> response = new ApiResponse<>();
        List<CurriculumDto> modules = new ArrayList<>();

        courseCurriculum.getModules().forEach(curriculumDto -> {
            if(moduleDao.findById(curriculumDto.getModuleId()).isPresent() && curriculumDao.findByModuleId(curriculumDto.getModuleId()).isEmpty()){
                curriculumDto.setModuleCode(moduleDao.findById(curriculumDto.getModuleId()).get().getCode());
                ApiResponse<CurriculumDto> curriculumApiResponse = addModuleToCourseCurriculum(new ApiRequestBody<>(curriculumDto, 1L));
                if(curriculumApiResponse.getHeader().getResponseCode().equals("0")){
                    modules.add(curriculumApiResponse.getBody().getData());
                }
            }
        });

        return response.success(new CourseCurriculum(courseCurriculum.getId(), courseCurriculum.getCourse(), modules), "Curriculum Set");
    }
    public CurriculumDto getCurriculumDto(Curriculum curriculum){
        CurriculumDto curriculumData = new CurriculumDto();
        curriculumData.setId(curriculum.getId());
        curriculumData.setModuleCategory(curriculum.getModuleCategory().name());
        curriculumData.setModuleCode(curriculum.getModule().getCode());
        curriculumData.setModuleTitle(curriculum.getModule().getTitle());
        curriculumData.setStatus(curriculum.getStatus().name());
        curriculumData.setCourseId(curriculum.getCourse().getId());
        curriculumData.setCourse(curriculum.getCourse().getTitle());
        curriculumData.setSemester(curriculum.getModule().getSemester());
        curriculumData.setAwardLevel(curriculum.getModule().getAward().getLevel());
        curriculumData.setModuleId(curriculum.getModule().getId());
        return curriculumData;
    }
}
