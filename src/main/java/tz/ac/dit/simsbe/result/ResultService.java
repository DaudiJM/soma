package tz.ac.dit.simsbe.result;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.api.request.ApiRequestBody;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.grade.Grade;
import tz.ac.dit.simsbe.grade.GradeDao;
import tz.ac.dit.simsbe.modules.Module;
import tz.ac.dit.simsbe.modules.ModuleDao;
import tz.ac.dit.simsbe.modules.ModuleService;
import tz.ac.dit.simsbe.programme.Programme;
import tz.ac.dit.simsbe.programme.ProgrammeDao;
import tz.ac.dit.simsbe.result.module_result.ProgrammeModuleResults;
import tz.ac.dit.simsbe.result.module_result.StudentModuleResult;
import tz.ac.dit.simsbe.result.student_result.StudentSemesterResult;
import tz.ac.dit.simsbe.student.Student;
import tz.ac.dit.simsbe.student.StudentDao;
import tz.ac.dit.simsbe.student.StudentService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ResultService {
    @Autowired
    private ResultDao resultDao;
    @Autowired
    private StudentService studentService;
    @Autowired
    private ModuleService moduleService;
    @Autowired
    private ProgrammeDao programmeDao;
    @Autowired
    private StudentDao studentDao;
    @Autowired
    private ModuleDao moduleDao;
    @Autowired
    private GradeDao gradeDao;

    public ApiResponse<ProgrammeModuleResults> uploadCAResult(ApiRequestBody<ProgrammeModuleResults> requestBody){
        ApiResponse<ProgrammeModuleResults> response = new ApiResponse<>();
        String responseMessage;
        ProgrammeModuleResults results = requestBody.getData();
        List<StudentModuleResult> uploadedResults = new ArrayList<>();
        if(moduleDao.findByCode(results.getModuleCode()).isPresent()){
            Module module = moduleDao.findByCode(results.getModuleCode()).get();
            for(StudentModuleResult studentModuleResult: results.getResults()){
                System.out.println("results " + studentModuleResult);
                if(studentDao.findByRegistrationNumber(studentModuleResult.getRegistrationNumber()).isPresent()){
                    Student student = studentDao.findByRegistrationNumber(studentModuleResult.getRegistrationNumber()).get();
                    if(resultDao.findByStudentRegistrationNumberAndModuleCode(studentModuleResult.getRegistrationNumber(), module.getCode()).isEmpty()){
                        Result result = getResult(studentModuleResult, student, module);
                        uploadedResults.add(getStudentModuleResult(resultDao.save(result)));
                        System.out.println("Duplicated");
                    }
                    else {
                        Optional<Result> result = resultDao.findByStudentRegistrationNumberAndModuleCode(studentModuleResult.getRegistrationNumber(), module.getCode());
                        assert result.isPresent();
                        result.get().setCa(studentModuleResult.getCa());
                        uploadedResults.add(getStudentModuleResult(resultDao.save(result.get())));
                    }
                }
            }

            results.setResults(uploadedResults);
            if(uploadedResults.isEmpty()){
                responseMessage = "Failed to Upload results.";
                return response.failed(results, responseMessage);
            } else if(uploadedResults.size() < results.getResults().size()){
                responseMessage = uploadedResults.size() + " Students results have been uploaded successfully. " + (results.getResults().size() - uploadedResults.size()) + " Failed ";
                return response.incomplete(results, responseMessage);
            } else {
                responseMessage = "Results have been uploaded successfully.";
                return response.success(results, responseMessage);
            }
        }
        responseMessage = "Failed to Upload results. No module with Module code " + results.getModuleCode();
        return response.failed(results, responseMessage);
    }

    private static Result getResult(StudentModuleResult studentModuleResult, Student student, Module module) {
        Result result = new Result();
        result.setStudent(student);
        result.setModule(module);
        result.setFe(0F);
        result.setCa(studentModuleResult.getCa());
        result.setAcademicYear(student.getProgramme().getAcademicYear());
        result.setYear(student.getProgramme().getYear());
        result.setSemester(student.getProgramme().getSemester());
        return result;
    }

    public ApiResponse<ProgrammeModuleResults> uploadResults(ApiRequestBody<ProgrammeModuleResults> requestBody){
        ApiResponse<ProgrammeModuleResults> response = new ApiResponse<>();
        String responseMessage;
        ProgrammeModuleResults moduleResults = requestBody.getData();
        if(moduleDao.findByCode(moduleResults.getModuleCode()).isPresent()){
            List<StudentModuleResult> uploadedResults = new ArrayList<>();
            for(StudentModuleResult studentModuleResult: moduleResults.getResults()){
                for(Result result: resultDao.findAllByStudentRegistrationNumber(studentModuleResult.getRegistrationNumber())){
                    if(Objects.equals(moduleResults.getModuleCode(), result.getModule().getCode())){
                        result.setFe(studentModuleResult.getFe());
                        uploadedResults.add(getStudentModuleResult(resultDao.save(result)));
                    }
                }
            }
            moduleResults.setResults(uploadedResults);
            if(uploadedResults.isEmpty()){
                responseMessage = "Failed to Upload Results. ";
                return response.failed(moduleResults, responseMessage);
            } else if(uploadedResults.size() < moduleResults.getResults().size()){
                responseMessage = uploadedResults.size() + " Student results have been uploaded. " + (moduleResults.getResults().size() - uploadedResults.size()) + " Failed.";
                return response.incomplete(moduleResults, responseMessage);
            } else {
                responseMessage = "Results have been uploaded successfully";
                return response.success(moduleResults, responseMessage);
            }
        }
        responseMessage = "Failed to Upload results. No Module with module Code " + moduleResults.getModuleCode();
        return response.failed(moduleResults, responseMessage);
    }

    public StudentSemesterResult getStudentSemesterResult(String registrationNumber, Integer semester, Integer year){
        StudentSemesterResult studentSemesterResult = new StudentSemesterResult();
        if(studentDao.findByRegistrationNumber(registrationNumber).isPresent()){
            Optional<Student> student = studentDao.findByRegistrationNumber(registrationNumber);
            assert student.isPresent();
            studentSemesterResult.setId(student.get().getId());
            studentSemesterResult.setSemester(student.get().getProgramme().getSemester());
            studentSemesterResult.setStudent(studentService.getStudentDto(student.get()));
            studentSemesterResult.setAwardLevel(student.get().getProgramme().getAward().getLevel());
            studentSemesterResult.setAwardTitle(student.get().getProgramme().getAward().getTitle());
            List<StudentModuleResult> moduleResults = new ArrayList<>();
            for(Result result: resultDao.findAllByStudentRegistrationNumber(registrationNumber)){
                if(Objects.equals(semester, result.getSemester()) && Objects.equals(year, result.getYear())){
                    moduleResults.add(getStudentModuleResult(result));
                }
            }
            studentSemesterResult.setResults(moduleResults);
            studentSemesterResult.setSemesterGpa(computeSemesterGpa(moduleResults));
            studentSemesterResult.setStatus(getSemesterStatus(moduleResults));
            return studentSemesterResult;
        }
        return null;
    }

    public ApiResponse<List<StudentSemesterResult>> getStudentYearResult(String registrationNumber, Integer year){
        ApiResponse<List<StudentSemesterResult>> response = new ApiResponse<>();
        String responseMessage;
        List<StudentSemesterResult> results = new ArrayList<>();
        if(studentDao.findByRegistrationNumber(registrationNumber).isPresent()){
            Optional<Student> student = studentDao.findByRegistrationNumber(registrationNumber);
            assert student.isPresent();
            for(int i = 1; i <= 2; i++){
                results.add(getStudentSemesterResult(registrationNumber, i, year));
            }
            responseMessage = "Students results.";
            return response.success(results, responseMessage);
        }
        responseMessage = "Failed to get student results. No student with registration Number " + registrationNumber;
        return response.failed(results, responseMessage);
    }

    public ApiResponse<StudentSemesterResult> getStudentCurrentSemesterResult(String registrationNumber){
        ApiResponse<StudentSemesterResult> response = new ApiResponse<>();
        String responseMessage;
        if(studentDao.findByRegistrationNumber(registrationNumber).isPresent()){
            Optional<Student> student = studentDao.findByRegistrationNumber(registrationNumber);
            assert student.isPresent();
            StudentSemesterResult semesterResult = getStudentSemesterResult(registrationNumber, student.get().getProgramme().getSemester(), student.get().getProgramme().getYear());
            if(Objects.equals(semesterResult, null)){
                responseMessage = "failed to get Current Semester results.";
                return response.failed(new StudentSemesterResult(), responseMessage);
            }
            responseMessage = "Student Current Semester Results found.";
            return response.success(semesterResult, responseMessage);
        }
        responseMessage = "Failed to get Student Current Semester result. No student with registration number " + registrationNumber;
        return response.failed(new StudentSemesterResult(), responseMessage);
    }

    public ApiResponse<List<StudentSemesterResult>> getStudentCurrentYearResult(String registrationNumber){
        ApiResponse<List<StudentSemesterResult>> response = new ApiResponse<>();
        String responseMessage;
        if(studentDao.findByRegistrationNumber(registrationNumber).isPresent()){
            Optional<Student> student = studentDao.findByRegistrationNumber(registrationNumber);
            assert student.isPresent();
            return getStudentYearResult(registrationNumber, student.get().getProgramme().getYear());
        }
        responseMessage = "failed to get Student Current year result. No Student with registration number " + registrationNumber;
        return response.failed(new ArrayList<>(), responseMessage);
    }

    public ApiResponse<List<StudentSemesterResult>> getProgrammeCurrentSemesterResult(Long programmeId){
        ApiResponse<List<StudentSemesterResult>> response = new ApiResponse<>();
        String responseMessage;
        List<StudentSemesterResult> results = new ArrayList<>();
        if(programmeDao.existsById(programmeId)){
            Optional<Programme> programme = programmeDao.findById(programmeId);
            assert programme.isPresent();
            for(Student student: programme.get().getStudents()){
                results.add(getStudentSemesterResult(student.getRegistrationNumber(), programme.get().getSemester(), programme.get().getYear()));
            }
            responseMessage = results.size() + " Student results found in records";
            return response.success(results, responseMessage);
        }
        responseMessage = "Failed to get student class semester results. No Class with Id " + programmeId;
        return response.failed(results, responseMessage);
    }

    public ApiResponse<ProgrammeModuleResults> getProgrammeModuleResult(Long programId, Long moduleId){
        ApiResponse<ProgrammeModuleResults> response = new ApiResponse<>();
        String responseMessage;
        ProgrammeModuleResults moduleResults = new ProgrammeModuleResults();
        if(programmeDao.existsById(programId)){
            if(moduleDao.existsById(moduleId)){
                Optional<Module> module = moduleDao.findById(moduleId);
                assert module.isPresent();

                Optional<Programme> programme = programmeDao.findById(programId);
                assert programme.isPresent();
                moduleResults.setId(programId);
                moduleResults.setModuleTitle(module.get().getTitle());
                moduleResults.setModuleCode(module.get().getCode());
                moduleResults.setProgramme(programme.get().getName());
                moduleResults.setProgrammeId(programId);
                List<StudentModuleResult> studentModuleResults = new ArrayList<>();
                for(Result result: resultDao.findAllByModuleCode(module.get().getCode())){
                    if(Objects.equals(result.getStudent().getProgramme(), programme.get())){
                        studentModuleResults.add(getStudentModuleResult(result));
                    }
                }
                moduleResults.setResults(studentModuleResults);
                responseMessage = studentModuleResults.size() + " Students results found in records.";
                return response.success(moduleResults, responseMessage);
            }
            responseMessage = "Failed to get Module Results for class. No Module with Id " + moduleId;
            return response.failed(new ProgrammeModuleResults(), responseMessage);
        }
        responseMessage = "Failed to get Module results for class. No class with Id " + programId;
        return response.failed(new ProgrammeModuleResults(), responseMessage);
    }

    public StudentModuleResult getStudentModuleResult(Result result){
        StudentModuleResult studentModuleResult = new StudentModuleResult();
        studentModuleResult.setCa(result.getCa());
        studentModuleResult.setFe(result.getFe());
        studentModuleResult.setId(result.getId());
        studentModuleResult.setModuleTitle(result.getModule().getTitle());
        studentModuleResult.setModuleCode(result.getModule().getCode());
        studentModuleResult.setRegistrationNumber(result.getStudent().getRegistrationNumber());
        studentModuleResult.setName(result.getStudent().getFirstName() + " " + result.getStudent().getMiddleName() + " " + result.getStudent().getLastName());
        Grade  grade = computeResultGrade(result);
        studentModuleResult.setGrade(Objects.equals(null, grade) ? null : grade.getGrade());
        studentModuleResult.setStatus(getModuleStatus(result));
        return studentModuleResult;
    }

    public ApiResponse<List<StudentModuleResult>> getModuleStudents(Long programmeId, Long moduleId){
        ApiResponse<List<StudentModuleResult>> response = new ApiResponse<>();
        String responseMessage;
        List<StudentModuleResult> students = new ArrayList<>();
        if(moduleDao.findById(moduleId).isPresent()){
            if(programmeDao.findById(programmeId).isPresent()){
                Programme programme = programmeDao.findById(programmeId).get();
                Module module = moduleDao.findById(moduleId).get();
                for(Student student: programme.getStudents()){
                    StudentModuleResult studentModuleResult = getStudentModuleResult(student, module);
                    students.add(studentModuleResult);
                }
                responseMessage = students.size() + " Students found in records.";
                return response.success(students, responseMessage);
            }
            responseMessage = "Failed to get Student. No programme with Id " + programmeId;
            return response.failed(students, responseMessage);
        }
        responseMessage = "Failed to get Students. No Module with Id " + moduleId;
        return response.failed(students, responseMessage);
    }

    private static StudentModuleResult getStudentModuleResult(Student student, Module module) {
        StudentModuleResult studentModuleResult = new StudentModuleResult();
        studentModuleResult.setName(student.getFirstName() + " " + student.getMiddleName() + " " + student.getLastName());
        studentModuleResult.setModuleTitle(module.getTitle());
        studentModuleResult.setModuleCode(module.getCode());
        studentModuleResult.setRegistrationNumber(student.getRegistrationNumber());
        studentModuleResult.setId(student.getId());
        studentModuleResult.setCa(0F);
        studentModuleResult.setFe(0F);
        return studentModuleResult;
    }

    public Grade computeResultGrade(Result result){
        float score = result.getCa() + result.getFe();
        if(!gradeDao.findByAwardId(result.getModule().getAward().getId()).isEmpty()){
            for(Grade grade: gradeDao.findByAwardId(result.getModule().getAward().getId())){
                if(score >= grade.getMinimum() && score <= grade.getMaximum()){
                    return grade;
                }
            }
        }
        return null;
    }

    public float computeSemesterGpa(List<StudentModuleResult> results){
        System.out.println("Results " + results);
        float credits = 0;
        float creditPoints = 0;
        for (StudentModuleResult studentModuleResult: results){
            System.out.println("Student results: " + studentModuleResult);
            if(moduleDao.findByCode(studentModuleResult.getModuleCode()).isPresent()){
                Module module = moduleDao.findByCode(studentModuleResult.getModuleCode()).get();
                for(Result result: resultDao.findAllByStudentRegistrationNumber(studentModuleResult.getRegistrationNumber())){
                    System.out.println("Result module: " + result.getModule());
                    System.out.println("Module: " + module);
                    if(Objects.equals(result.getModule(), module)){
                        Grade grade = computeResultGrade(result);
                        if(!Objects.equals(null, grade)){
                            credits += module.getCredits();
                            creditPoints += (grade.getPoints() * module.getCredits());
                            System.out.println("Points : " + creditPoints);
                        }
                    }
                }
            }
        }
        System.out.println("Credits " + credits);
        return creditPoints / credits;
    }

    public String getModuleStatus(Result result){
        double caPassMark = 0.4 * result.getStudent().getProgramme().getCourse().getCourseWorkScore();
        double fePassMark = 0.4 * result.getStudent().getProgramme().getCourse().getFinalExaminationScore();

        if(result.getCa() < caPassMark){
            if(result.getStudent().getProgramme().getSemester() < result.getModule().getAward().getSemesters()){
                return "CARRY";
            }
            return "RETAKE";
        } else {
            if(result.getFe() < fePassMark){
                return "SUPP";
            }
            return "PASS";
        }
    }

    public String getSemesterStatus(List<StudentModuleResult> results){
        int carryCount = 0;
        int supCount = 0;
        int retakeCount = 0;
        for(StudentModuleResult studentModuleResult: results){
            if(Objects.equals(studentModuleResult.getStatus(), "CARRY")){
                carryCount++;
            }
            if(Objects.equals(studentModuleResult.getStatus(), "SUPP")){
                supCount++;
            }
            if(Objects.equals(studentModuleResult.getStatus(), "RETAKE")){
                retakeCount++;
            }
        }

        if(carryCount > 0 || supCount > 0 || retakeCount > 0 ){
            if(carryCount > 3){
                return "RETAKE";
            } else if(retakeCount > 0){
                return "RETAKE";
            } else if(carryCount > 0){
                return "CARRY";
            } else {
                return "SUPP";
            }
        }
        return "PASS";
    }
}
