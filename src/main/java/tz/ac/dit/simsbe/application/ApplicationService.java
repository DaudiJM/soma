package tz.ac.dit.simsbe.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.api.request.ApiRequestBody;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.award.Award;
import tz.ac.dit.simsbe.award.AwardDao;
import tz.ac.dit.simsbe.course.Course;
import tz.ac.dit.simsbe.course.CourseDao;
import tz.ac.dit.simsbe.programme.ProgrammeService;
import tz.ac.dit.simsbe.student.StudentDto;
import tz.ac.dit.simsbe.student.StudentService;
import tz.ac.dit.simsbe.user.User;
import tz.ac.dit.simsbe.user.UserDao;
import tz.ac.dit.simsbe.user.UserDto;
import tz.ac.dit.simsbe.user.UserService;
import tz.ac.dit.simsbe.user_role.UserRole;
import tz.ac.dit.simsbe.user_role.UserRoleDao;
import tz.ac.dit.simsbe.utilities.Category;
import tz.ac.dit.simsbe.utilities.Roles;
import tz.ac.dit.simsbe.utilities.Status;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationDao applicationDao;
    @Autowired
    private CourseDao courseDao;
    @Autowired
    private AwardDao awardDao;
    @Autowired
    private StudentService studentService;
    @Autowired
    private ProgrammeService programmeService;
    @Autowired
    private UserDao userDao;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRoleDao userRoleDao;

    public ApiResponse<ApplicationDto> createApplication(ApiRequestBody<ApplicationDto> requestBody) throws NoSuchAlgorithmException {
        ApiResponse<ApplicationDto> response = new ApiResponse<>();
        String responseMessage;
        ApplicationDto applicationData = requestBody.getData();
        if(applicationDao.existsById(applicationData.getId())){
            return updateApplication(requestBody);
        }

        if(courseDao.existsById(applicationData.getCourseId())){
            if(applicationDao.findByFormFourIndexNumber(applicationData.getFormFourIndexNumber()).isEmpty()){
                if(applicationDao.findByEmail(applicationData.getEmail()).isEmpty()){
                    if(applicationDao.findByPhoneNumber(applicationData.getPhoneNumber()).isEmpty()){
                        if(userDao.findByEmail(applicationData.getEmail()).isEmpty()){
                            int awardLevel = 0;
                            String awardTitle;
                            int semesters = 2;
                            Category category;
                            Award award = new Award();
                            if(Objects.equals(applicationData.getCategory(), Category.DIPLOMA.name())){
                                awardLevel = 4;
                                awardTitle = "BASIC TECHNICIAN CERTIFICATE";
                                category = Category.DIPLOMA;
                            } else if(Objects.equals(applicationData.getCategory(), Category.DEGREE.name())){
                                awardLevel = 7;
                                awardTitle = "HIGHER DIPLOMA";
                                category = Category.DEGREE;
                            } else if(Objects.equals(applicationData.getCategory(), Category.MASTERS.name())){
                                awardLevel = 9;
                                awardTitle = "MASTER DEGREE";
                                category = Category.MASTERS;
                            } else {
                                responseMessage = "Failed to submit application. Selected category does not exist.";
                                return response.failed(applicationData, responseMessage);
                            }

                            if(awardDao.findByLevel(awardLevel).isPresent()){
                                award = awardDao.findByLevel(awardLevel).get();
                            } else {
                                award.setLevel(awardLevel);
                                award.setTitle(awardTitle);
                                award.setStatus(Status.ACTIVE);
                                award.setSemesters(semesters);
                                award = awardDao.save(award);
                            }

                            Application application = new Application();
                            Optional<Course> course = courseDao.findById(applicationData.getCourseId());
                            assert course.isPresent();
                            application.setFirstName(applicationData.getFirstName());
                            application.setMiddleName(applicationData.getMiddleName());
                            application.setLastName(applicationData.getLastName());
                            application.setGender(applicationData.getGender());
                            application.setAddress(applicationData.getAddress());
                            application.setEmail(applicationData.getEmail());
                            application.setPhoneNumber(applicationData.getPhoneNumber());
                            application.setGuardianEmail(applicationData.getGuardianEmail());
                            application.setGuardianName(applicationData.getGuardianName());
                            application.setGuardianPhoneNumber(applicationData.getGuardianPhoneNumber());
                            application.setStatus(Status.PENDING);
                            application.setDateOfBirth(applicationData.getDateOfBirth());
                            application.setFormFourIndexNumber(applicationData.getFormFourIndexNumber());
                            application.setFormSixIndexNumber(applicationData.getFormSixIndexNumber());
                            application.setCategory(category);
                            application.setCourse(course.get());
                            application.setAward(award);
                            application.setYear(applicationData.getYear());

                            List<Roles> roles = new ArrayList<>();
                            roles.add(Roles.APPLICANT);

                            UserDto userData = new UserDto();
                            userData.setEmail(application.getEmail());
                            userData.setPassword(application.getEmail());
                            userData.setUserRoles(roles);

                            ApiResponse<UserDto> accountCreationResponse = userService.createUser(userData);
                            if(Objects.equals(accountCreationResponse.getHeader().getResponseCode(), "0")){
                                responseMessage = "Application Submitted successfully.";
                                return response.success(getApplicationDto(applicationDao.save(application)), responseMessage);
                            }
                        }
                        responseMessage = "Failed to submit application. Student account creation failed. Email has already been used.";
                        return response.failed(applicationData, responseMessage);
                    }
                    responseMessage = "Failed to submit application. Phone number has already been used.";
                    return response.failed(applicationData, responseMessage);
                }
                responseMessage = "Failed to submit application. Email has already been used.";
                return response.failed(applicationData, responseMessage);
            }
            responseMessage = "Failed to submit application. Form four index number has already been used.";
            return response.failed(applicationData, responseMessage);
        }
        responseMessage = "Failed to Submit application. Selected course does not exist.";
        return response.failed(applicationData, responseMessage);
    }

    public ApiResponse<ApplicationDto> updateApplication(ApiRequestBody<ApplicationDto> requestBody){
        ApiResponse<ApplicationDto> response = new ApiResponse<>();
        String responseMessage;
        ApplicationDto applicationData = requestBody.getData();
        if(applicationDao.existsById(applicationData.getId())){
            if(courseDao.existsById(applicationData.getCourseId())){
                Optional<Application> application = applicationDao.findById(applicationData.getId());
                assert application.isPresent();

                if(applicationDao.findByEmail(applicationData.getEmail()).isPresent() && !Objects.equals(applicationDao.findByEmail(applicationData.getEmail()).get().getId(), application.get().getId())){
                    responseMessage = "Failed to update application. Email has already been used.";
                    return response.failed(applicationData, responseMessage);
                }

                if(applicationDao.findByPhoneNumber(applicationData.getPhoneNumber()).isPresent() && !Objects.equals(applicationDao.findByPhoneNumber(applicationData.getPhoneNumber()).get().getId(), application.get().getId())){
                    responseMessage = "Failed to update application. Phone number has already been used.";
                    return response.failed(applicationData, responseMessage);
                }

                Optional<Course> course = courseDao.findById(applicationData.getCourseId());
                assert course.isPresent();

                application.get().setFirstName(applicationData.getFirstName());
                application.get().setMiddleName(applicationData.getMiddleName());
                application.get().setLastName(applicationData.getLastName());
                application.get().setGender(applicationData.getGender());
                application.get().setEmail(applicationData.getEmail());
                application.get().setPhoneNumber(applicationData.getPhoneNumber());
                application.get().setAddress(applicationData.getAddress());
                application.get().setGuardianPhoneNumber(applicationData.getGuardianPhoneNumber());
                application.get().setFormSixIndexNumber(applicationData.getFormSixIndexNumber());
                application.get().setFormFourIndexNumber(applicationData.getFormFourIndexNumber());
                application.get().setGuardianName(applicationData.getGuardianName());
                application.get().setGuardianEmail(applicationData.getGuardianEmail());
                responseMessage = "application Updated successfully";
                return response.success(getApplicationDto(applicationDao.save(application.get())), responseMessage);
            }
            responseMessage = "Failed to Update application. Selected course does not exist.";
            return response.failed(applicationData, responseMessage);
        }
        responseMessage = "Failed to update application. No application with id " + applicationData.getId();
        return response.failed(applicationData, responseMessage);
    }

    public ApiResponse<ApplicationDto> getApplication(Long applicationId){
        ApiResponse<ApplicationDto> response = new ApiResponse<>();
        String responseMessage;
        if(applicationDao.existsById(applicationId)){
            Optional<Application> application = applicationDao.findById(applicationId);
            assert application.isPresent();
            responseMessage = "Application data found in records";
            return response.success(getApplicationDto(application.get()), responseMessage);
        }
        responseMessage = "Failed to get application data";
        return response.failed(new ApplicationDto(), responseMessage);
    }

    public ApiResponse<List<ApplicationDto>> getAllApplications(String year){
        ApiResponse<List<ApplicationDto>> response = new ApiResponse<>();
        String responseMessage;
        List<ApplicationDto> applications = new ArrayList<>();
        for(Application application: applicationDao.findByYear(year, Sort.by("createdAt").ascending())){
           if(Objects.equals(application.getStatus(), Status.PENDING)){
               applications.add(getApplicationDto(application));
           }
        }
        responseMessage = applications.size() + " applications found in records";
        return response.success(applications, responseMessage);
    }

    public ApiResponse<List<ApplicationDto>> getAllApplications(){
        ApiResponse<List<ApplicationDto>> response = new ApiResponse<>();
        String responseMessage;
        List<ApplicationDto> applications = new ArrayList<>();
        for(Application application: applicationDao.findAll(Sort.by("year").descending().and(Sort.by("createdAt").ascending()))){
            if(Objects.equals(Status.PENDING, application.getStatus())){
                applications.add(getApplicationDto(application));
            }
        }
        responseMessage = applications.size() + " applications found in records";
        return response.success(applications, responseMessage);
    }

    public ApplicationDto getApplicationDto(Application application){
        ApplicationDto applicationData = new ApplicationDto();
        applicationData.setId(application.getId());
        applicationData.setFirstName(application.getFirstName());
        applicationData.setMiddleName(application.getMiddleName());
        applicationData.setLastName(application.getLastName());
        applicationData.setGender(application.getGender());
        applicationData.setDateOfBirth(application.getDateOfBirth());
        applicationData.setEmail(application.getEmail());
        applicationData.setPhoneNumber(application.getPhoneNumber());
        applicationData.setAddress(application.getAddress());
        applicationData.setGuardianName(application.getGuardianName());
        applicationData.setGuardianEmail(application.getGuardianEmail());
        applicationData.setGuardianPhoneNumber(application.getGuardianPhoneNumber());
        applicationData.setFormFourIndexNumber(application.getFormFourIndexNumber());
        applicationData.setFormSixIndexNumber(application.getFormSixIndexNumber());
        applicationData.setCourse(application.getCourse().getTitle());
        applicationData.setCategory(application.getCategory().name());
        applicationData.setAwardLevel(application.getAward().getLevel());
        applicationData.setYear(application.getYear());
        applicationData.setUpdatedAt(application.getUpdatedAt());
        applicationData.setCreatedAt(application.getCreatedAt());
        applicationData.setStatus(application.getStatus().name());
        applicationData.setCourseId(application.getCourse().getId());
        return applicationData;
    }

    public ApiResponse<List<StudentDto>> enrollStudent(ApiRequestBody<List<Long>> requestBody) throws NoSuchAlgorithmException {
        ApiResponse<List<StudentDto>> response = new ApiResponse<>();
        String responseMessage;
        List<StudentDto> enrolledStudents = new ArrayList<>();
        List<Long> applicationIds = requestBody.getData();

        for(Long id: applicationIds){
            if(applicationDao.existsById(id)){
                Optional<Application> application = applicationDao.findById(id);
                assert application.isPresent();
                StudentDto studentDto = getStudentDto(application.get());
                studentDto.setProgrammedId(programmeService.getSuitableProgramme(application.get()).getId());
                ApiResponse<StudentDto> saveStudentApiResponse = studentService.createStudent(studentDto);
                if(Objects.equals(saveStudentApiResponse.getHeader().getResponseCode(), "0")){
                    enrolledStudents.add(saveStudentApiResponse.getBody().getData());
                    if(userDao.findByEmail(application.get().getEmail()).isPresent()){
                        Optional<User> user = userDao.findByEmail(application.get().getEmail());
                        assert user.isPresent();
                        user.get().setUsername(saveStudentApiResponse.getBody().getData().getRegistrationNumber());
                        user.get().setPassword(userService.hashPassword(saveStudentApiResponse.getBody().getData().getRegistrationNumber()));

                        if(!userRoleDao.findByUserId(user.get().getId()).isEmpty()){
                            for(UserRole userRole: userRoleDao.findByUserId(user.get().getId())){
                                if(Objects.equals(userRole.getRole(), Roles.APPLICANT)){
                                    userRole.setRole(Roles.STUDENT);
                                    userRoleDao.save(userRole);
                                }
                            }
                        }
                    }
                    application.get().setStatus(Status.ENROLLED);
                    applicationDao.save(application.get());
                }
            }
        }

        if(enrolledStudents.size() == 0){
            responseMessage = "Failed to enroll students.";
            return response.failed(enrolledStudents, responseMessage);
        } else if(enrolledStudents.size() == applicationIds.size()){
            responseMessage = "Students enrolled successfully";
            return response.success(enrolledStudents, responseMessage);
        } else {
            responseMessage = enrolledStudents.size() + " Students enrolled successfully. Failed to enroll " + (applicationIds.size() - enrolledStudents.size());
            return response.incomplete(enrolledStudents, responseMessage);
        }
    }

    public StudentDto getStudentDto(Application application){
        StudentDto studentData = new StudentDto();
        studentData.setFirstName(application.getFirstName());
        studentData.setMiddleName(application.getMiddleName());
        studentData.setLastName(application.getLastName());
        studentData.setGender(application.getGender());
        studentData.setPhoneNumber(application.getPhoneNumber());
        studentData.setEmail(application.getEmail());
        studentData.setGuardianName(application.getGuardianName());
        studentData.setGuardianEmail(application.getGuardianEmail());
        studentData.setGuardianPhoneNumber(application.getGuardianPhoneNumber());
        studentData.setFormSixIndexNumber(application.getFormSixIndexNumber());
        studentData.setFormFourIndexNumber(application.getFormFourIndexNumber());
        studentData.setAddress(application.getAddress());
        studentData.setAwardLevel(application.getAward().getLevel());
        return studentData;
    }

}
