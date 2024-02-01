package tz.ac.dit.simsbe.programme;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.api.request.ApiRequestBody;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.application.Application;
import tz.ac.dit.simsbe.award.Award;
import tz.ac.dit.simsbe.award.AwardDao;
import tz.ac.dit.simsbe.course.Course;
import tz.ac.dit.simsbe.course.CourseDao;
import tz.ac.dit.simsbe.student.StudentService;
import tz.ac.dit.simsbe.utilities.Category;
import tz.ac.dit.simsbe.utilities.Status;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ProgrammeService {
    @Autowired
    private ProgrammeDao programmeDao;
    @Autowired
    private CourseDao courseDao;
    @Autowired
    private StudentService studentService;
    @Autowired
    private AwardDao awardDao;

    public ApiResponse<ProgrammeDto> createProgramme(ApiRequestBody<ProgrammeDto> requestBody){
        ApiResponse<ProgrammeDto> response = new ApiResponse<>();
        String responseMessage;
        ProgrammeDto programmeData = requestBody.getData();
        if(programmeDao.existsById(programmeData.getId())){
            return updateProgramme(requestBody);
        }

        if(programmeDao.findByName(programmeData.getName()).isEmpty()){
            if(courseDao.existsById(programmeData.getCourseId())){
                if(awardDao.findByLevel(programmeData.getAwardLevel()).isPresent()){
                    Optional<Award> award = awardDao.findByLevel(programmeData.getAwardLevel());
                    assert award.isPresent();

                    Optional<Course> course = courseDao.findById(programmeData.getCourseId());
                    assert course.isPresent();

                    Programme programme = new Programme();
                    programme.setAward(award.get());
                    programme.setCourse(course.get());
                    programme.setStatus(Status.CONTINUING);
                    programme.setStartingYear(programmeData.getStartingYear());
                    programme.setSemester(programmeData.getSemester());
                    programme.setAcademicYear(programmeData.getAcademicYear());
                    programme.setYear(programmeData.getYear());
                    programme.setName(programmeData.getName().isEmpty() || programmeData.getName().isBlank() ? generateProgrammeName(programmeData) : programmeData.getName());
                    responseMessage = "Class added successfully";
                    return response.success(getProgrammeDto(programmeDao.save(programme)), responseMessage);
                }
                responseMessage = "Failed to add class. Selected NTA Level does not exist in records";
                return response.failed(programmeData, responseMessage);
            }
            responseMessage = "Failed to create class. Selected course does not exist in records";
            return response.failed(programmeData, responseMessage);
        }
        responseMessage = "Failed to Create class. Class with the same name already exist.";
        return response.failed(programmeData, responseMessage);
    }
    public ApiResponse<ProgrammeDto> updateProgramme(ApiRequestBody<ProgrammeDto> requestBody){
        ApiResponse<ProgrammeDto> response = new ApiResponse<>();
        String responseMessage;
        ProgrammeDto programmeData = requestBody.getData();
        if(programmeDao.existsById(programmeData.getId())){
            if(courseDao.existsById(programmeData.getCourseId())){
                if(awardDao.findByLevel(programmeData.getAwardLevel()).isPresent()){
                    Optional<Programme> programme = programmeDao.findById(programmeData.getId());
                    assert programme.isPresent();

                    if(programmeDao.findByName(programmeData.getName()).isPresent() && !Objects.equals(programmeDao.findByName(programmeData.getName()).get().getId(), programme.get().getId())){
                        responseMessage = "Failed to Update Class. Class with the same name already exist in records";
                        return response.failed(programmeData, responseMessage);
                    }

                    Optional<Course> course = courseDao.findById(programmeData.getCourseId());
                    assert course.isPresent();

                    Optional<Award> award = awardDao.findByLevel(programmeData.getAwardLevel());
                    assert award.isPresent();

                    programme.get().setName(programmeData.getName());
                    programme.get().setCourse(course.get());
                    programme.get().setAward(award.get());
                    programme.get().setSemester(programmeData.getSemester());
                    programme.get().setStartingYear(programmeData.getStartingYear());
                    programme.get().setYear(programmeData.getYear());
                    programme.get().setYear(programmeData.getYear());
                    responseMessage = "Class updated successfully.";
                    return response.success(getProgrammeDto(programmeDao.save(programme.get())), responseMessage);
                }
                responseMessage = "Failed to update class. selected Award level does not exist in records.";
                return response.failed(programmeData, responseMessage);
            }
            responseMessage = "Failed to Update Class. Selected course does not exist in records.";
            return response.failed(programmeData, responseMessage);
        }
        responseMessage = "Failed to Update Class. No Class with Id " + programmeData.getId();
        return response.failed(programmeData, responseMessage);
    }

    public ApiResponse<ProgrammeDto> getProgramme(Long programmeId){
        ApiResponse<ProgrammeDto> response = new ApiResponse<>();
        String responseMessage;
        if(programmeDao.existsById(programmeId)){
            Optional<Programme> programme = programmeDao.findById(programmeId);
            assert programme.isPresent();
            responseMessage = "Class Data found in records.";
            return response.success(getProgrammeDto(programme.get()), responseMessage);
        }
        responseMessage = "Failed to get Class. No class with Id " + programmeId;
        return response.failed(new ProgrammeDto(), responseMessage);
    }

    public ApiResponse<List<ProgrammeDto>> getAllProgrammes(){
        ApiResponse<List<ProgrammeDto>> response = new ApiResponse<>();
        String responseMessage;
        List<ProgrammeDto> programmes = new ArrayList<>();
        for(Programme programme: programmeDao.findAll(Sort.by("name").ascending())){
            programmes.add(getProgrammeDto(programme));
        }
        responseMessage = programmes.size() + " Classes found in records";
        return response.success(programmes, responseMessage);
    }

    public ApiResponse<List<ProgrammeDto>> getAllDepartmentProgrammes(Long departmentId){
        ApiResponse<List<ProgrammeDto>> response = new ApiResponse<>();
        String responseMessage;
        List<ProgrammeDto> programmes = new ArrayList<>();
        for(Programme programme: programmeDao.findAllByCourseDepartmentId(departmentId, Sort.by("name").ascending())){
            programmes.add(getProgrammeDto(programme));
        }
        responseMessage = programmes.size() + " Classes found in records";
        return response.success(programmes, responseMessage);
    }

    public ProgrammeDto getProgrammeDto(Programme programme){
        ProgrammeDto programmeData = new ProgrammeDto();
        programmeData.setId(programme.getId());
        programmeData.setName(programme.getName());
        programmeData.setAwardLevel(programme.getAward().getLevel());
        programmeData.setCourse(programme.getCourse().getTitle());
        programmeData.setCourseId(programme.getCourse().getId());
        programmeData.setStartingYear(programme.getStartingYear());
        programmeData.setStatus(programme.getStatus().name());
        programmeData.setCreatedAt(programme.getCreatedAt());
        programmeData.setYear(programme.getYear());
        programmeData.setUpdatedAt(programme.getUpdatedAt());
        programmeData.setSemester(programme.getSemester());
        programmeData.setAcademicYear(programme.getAcademicYear());
//        programmeData.setStudents(studentService.getAllStudentsInClass(programme.getId()).getBody().getData());
        return programmeData;
    }

    public String generateProgrammeName(ProgrammeDto programmeDto){
        Optional<Award> award = awardDao.findByLevel(programmeDto.getAwardLevel());
        assert award.isPresent();

        Optional<Course> course = courseDao.findById(programmeDto.getCourseId());
        assert course.isPresent();

        String name = null;

        if(award.get().getLevel() < 7){
            name = "OD";
        } else if(award.get().getLevel() < 9){
            name = "BENG";
        }

        name = name + programmeDto.getStartingYear().substring(1) + " " + course.get().getCode();
        return name;
    }

    public Programme getSuitableProgramme(Application application){
        List<Programme> programmes = programmeDao.findByCourseId(application.getCourse().getId());
        for(Programme programme: programmes){
            if(Objects.equals(programme.getStartingYear(), application.getYear()) && Objects.equals(application.getAward().getLevel(), programme.getAward().getLevel())){
                return programme;
            }
        }

        Programme programme = new Programme();
        ProgrammeDto programmeDto = new ProgrammeDto();
        programmeDto.setCourseId(application.getCourse().getId());
        programmeDto.setStartingYear(application.getYear());
        programmeDto.setAwardLevel(application.getAward().getLevel());
        programmeDto.setSemester(1);
        programmeDto.setName(generateProgrammeName(programmeDto));

        programme.setName(programmeDto.getName());
        programme.setCourse(application.getCourse());
        programme.setStatus(Status.ACTIVE);
        programme.setAward(application.getAward());
        programme.setSemester(1);
        programme.setStartingYear(application.getYear());

        return programmeDao.save(programme);
    }

    public ApiResponse<List<ProgrammeDto>> getAllProgrammesByCourse(Long courseId){
        ApiResponse<List<ProgrammeDto>> response = new ApiResponse<>();
        String responseMessage;
        List<ProgrammeDto> programmes = new ArrayList<>();
        if(courseDao.existsById(courseId)){
            if(!programmeDao.findByCourseId(courseId).isEmpty()){
                for(Programme programme: programmeDao.findByCourseId(courseId)){
                    programmes.add(getProgrammeDto(programme));
                }
                responseMessage = programmes.size() + " Classes found for Course.";
                return response.success(programmes, responseMessage);
            }
            responseMessage = "Failed to get Classes. Course has No classes associated with It ";
            return response.failed(programmes, responseMessage);
        }
        responseMessage = "failed to get Classes. No Course with Id " + courseId;
        return response.failed(programmes, responseMessage);
    }
}
