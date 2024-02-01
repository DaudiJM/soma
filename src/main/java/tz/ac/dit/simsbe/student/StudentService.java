package tz.ac.dit.simsbe.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.api.request.ApiRequestBody;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.department.DepartmentDao;
import tz.ac.dit.simsbe.programme.Programme;
import tz.ac.dit.simsbe.programme.ProgrammeDao;
import tz.ac.dit.simsbe.utilities.Status;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentDao studentDao;
    @Autowired
    private ProgrammeDao programmeDao;
    @Autowired
    private DepartmentDao departmentDao;

    public ApiResponse<StudentDto> createStudent(StudentDto studentData){
        ApiResponse<StudentDto> response = new ApiResponse<>();
        String responseMessage;
        if(!Objects.equals(null, studentData.getId()) && studentDao.existsById(studentData.getId())){
            ApiRequestBody<StudentDto> requestBody = new ApiRequestBody<>();
            requestBody.setData(studentData);
            return updateStudent(requestBody);
        }

        if(studentDao.findByEmail(studentData.getEmail()).isEmpty()){
            if(studentDao.findByPhoneNumber(studentData.getPhoneNumber()).isEmpty()){
                if(studentDao.findByFormFourIndexNumber(studentData.getFormFourIndexNumber()).isEmpty()){
                    if(programmeDao.existsById(studentData.getProgrammedId())){
                        Optional<Programme> programme = programmeDao.findById(studentData.getProgrammedId());
                        assert programme.isPresent();
                        Student student = new Student();
                        student.setFirstName(studentData.getFirstName());
                        student.setMiddleName(studentData.getMiddleName());
                        student.setLastName(studentData.getLastName());
                        student.setGender(studentData.getGender());
                        student.setAddress(studentData.getAddress());
                        student.setEmail(studentData.getEmail());
                        student.setPhoneNumber(studentData.getPhoneNumber());
                        student.setRegistrationNumber(studentData.getRegistrationNumber());
                        student.setGuardianEmail(studentData.getGuardianEmail());
                        student.setGuardianName(studentData.getGuardianName());
                        student.setGuardianPhoneNumber(studentData.getGuardianPhoneNumber());
                        student.setStatus(Status.CONTINUING);
                        student.setDateOfBirth(studentData.getDateOfBirth());
                        student.setFormFourIndexNumber(studentData.getFormFourIndexNumber());
                        student.setFormSixIndexNumber(studentData.getFormSixIndexNumber());
                        student.setProgramme(programme.get());
                        student.setRegistrationNumber(generateRegistrationNumber(studentData));

                        responseMessage = "Student added successfully.";
                        return response.success(getStudentDto(studentDao.save(student)), responseMessage);
                    }
                    responseMessage = "Failed to add student. Provided class does not exist";
                    return response.failed(studentData, responseMessage);
                }
                responseMessage = "failed to add student. Student with the same Form Four index number already exist.";
                return response.failed(studentData, responseMessage);
            }
            responseMessage = "Failed to Add Student. Student with the same Phone Number already exist.";
            return response.failed(studentData, responseMessage);
        }
        responseMessage = "Failed to Add student. Student with the same email already exist.";
        return response.failed(studentData, responseMessage);
    }

    public ApiResponse<StudentDto> updateStudent(ApiRequestBody<StudentDto> requestBody){
        ApiResponse<StudentDto> response = new ApiResponse<>();
        String responseMessage;
        StudentDto studentData = requestBody.getData();
        if(studentDao.existsById(studentData.getId())){
            Optional<Student> student = studentDao.findById(studentData.getId());
            assert student.isPresent();

            if(studentDao.findByEmail(studentData.getEmail()).isPresent() && !Objects.equals(studentDao.findByEmail(studentData.getEmail()).get().getId(), student.get().getId())){
                responseMessage = "Failed to update student. Student with the same email already exist in records";
                return response.failed(studentData, responseMessage);
            }

            if(studentDao.findByFormFourIndexNumber(studentData.getFormFourIndexNumber()).isPresent() && !Objects.equals(studentDao.findByFormFourIndexNumber(studentData.getFormFourIndexNumber()).get().getId(), student.get().getId())){
                responseMessage = "Failed to Update Student. Student with the same form four index number already exist";
                return response.failed(studentData, responseMessage);
            }

            if(studentDao.findByFormSixIndexNumber(studentData.getFormSixIndexNumber()).isPresent() && !Objects.equals(studentDao.findByFormSixIndexNumber(studentData.getFormSixIndexNumber()).get().getId(), student.get().getId())){
                responseMessage = "Failed to Update student. Student with the same form Six index number already exist in records";
                return response.failed(studentData, responseMessage);
            }

            if(studentDao.findByPhoneNumber(studentData.getPhoneNumber()).isPresent() && !Objects.equals(studentDao.findByPhoneNumber(studentData.getPhoneNumber()).get().getId(), student.get().getId())){
                responseMessage = "Failed to Update student. Student with the same phone number already exist in records.";
                return response.failed(studentData, responseMessage);
            }

            student.get().setAddress(studentData.getAddress());
            student.get().setGender(studentData.getGender());
            student.get().setPhoneNumber(studentData.getPhoneNumber());
            student.get().setEmail(studentData.getEmail());
            student.get().setFirstName(studentData.getFirstName());
            student.get().setMiddleName(studentData.getMiddleName());
            student.get().setLastName(studentData.getLastName());
            student.get().setDateOfBirth(studentData.getDateOfBirth());
            student.get().setGuardianName(studentData.getGuardianName());
            student.get().setGuardianEmail(studentData.getGuardianEmail());
            student.get().setGuardianPhoneNumber(studentData.getGuardianPhoneNumber());
            student.get().setFormFourIndexNumber(studentData.getFormFourIndexNumber());
            student.get().setFormSixIndexNumber(studentData.getFormSixIndexNumber());
            responseMessage = "Student Updated successfully.";
            return response.success(getStudentDto(studentDao.save(student.get())), responseMessage);
        }
        responseMessage = "Failed to update student. No student with Id " + studentData.getId();
        return response.failed(studentData, responseMessage);
    }

    public ApiResponse<List<StudentDto>> getAllStudents(){
        ApiResponse<List<StudentDto>> response = new ApiResponse<>();
        String responseMessage;
        List<StudentDto> students = new ArrayList<>();
        Sort sort = Sort.by("programmeName").ascending().and(Sort.by("gender").and(Sort.by("firstName").ascending()).and(Sort.by("middleName").ascending()).and(Sort.by("lastName")));
        for(Student student: studentDao.findAll()){
            students.add(getStudentDto(student));
        }
        responseMessage = students.size() + "Students found in records ";
        return response.success(students, responseMessage);
    }

    public ApiResponse<List<StudentDto>> getAllStudentsInClass(Long programmeId){
        ApiResponse<List<StudentDto>> response = new ApiResponse<>();
        String responseMessage;
        List<StudentDto> students = new ArrayList<>();
        if(programmeDao.existsById(programmeId)){
            Optional<Programme> programme = programmeDao.findById(programmeId);
            assert programme.isPresent();
            Sort sort = Sort.by("gender").and(Sort.by("firstName").ascending()).and(Sort.by("middleName").ascending()).and(Sort.by("lastName"));
            for(Student student: studentDao.findByProgrammeId(programmeId, sort)){
                students.add(getStudentDto(student));
            }
            responseMessage = students.size() + "Students found for class " + programme.get().getName();
            return response.success(students, responseMessage);
        }
        responseMessage = "Failed to get Students. No Class with Id " + programmeId;
        return response.failed(students, responseMessage);
    }

    public ApiResponse<List<StudentDto>> getAllDepartmentStudents(Long departmentId){
        ApiResponse<List<StudentDto>> response = new ApiResponse<>();
        String responseMessage;
        List<StudentDto> students = new ArrayList<>();
        if(departmentDao.existsById(departmentId)){
            Sort sort = Sort.by("gender").and(Sort.by("firstName").ascending()).and(Sort.by("middleName").ascending()).and(Sort.by("lastName"));
            for(Student student: studentDao.findAllByProgrammeCourseDepartmentId(departmentId, sort)){
                students.add(getStudentDto(student));
            }
            responseMessage = students.size() + "Students found for Department ";
            return response.success(students, responseMessage);
        }
        responseMessage = "Failed to get Students. No Department with Id " + departmentId;
        return response.failed(students, responseMessage);
    }

    public ApiResponse<StudentDto> getStudentByRegistrationNumber(String registrationNumber){
        ApiResponse<StudentDto> response = new ApiResponse<>();
        String responseMessage;
        if(studentDao.findByRegistrationNumber(registrationNumber).isPresent()){
            Optional<Student> student = studentDao.findByRegistrationNumber(registrationNumber);
            assert student.isPresent();
            return getStudent(student.get().getId());
        }
        responseMessage = "Failed to get Student. No student with registration number " + registrationNumber;
        return response.failed(new StudentDto(), responseMessage);
    }

    public ApiResponse<StudentDto> getStudent(Long studentId){
        ApiResponse<StudentDto> response = new ApiResponse<>();
        String responseMessage;
        if(studentDao.existsById(studentId)){
            Optional<Student> student = studentDao.findById(studentId);
            assert student.isPresent();
            responseMessage = "Student data found in records.";
            return response.success(getStudentDto(student.get()), responseMessage);
        }
        responseMessage = "Failed to get student data. No student with Id " + studentId;
        return response.failed(new StudentDto(), responseMessage);
    }

    public ApiResponse<StudentDto> getStudent(String email){
        ApiResponse<StudentDto> response = new ApiResponse<>();
        if(studentDao.findByEmail(email).isPresent()){
            Optional<Student> student = studentDao.findByEmail(email);
            assert student.isPresent();
            return getStudent(student.get().getId());
        }
        return response.failed(new StudentDto(), "Failed to get Student data.");
    }
    public StudentDto getStudentDto(Student student){
        StudentDto studentData = new StudentDto();
        studentData.setId(student.getId());
        studentData.setFirstName(student.getFirstName());
        studentData.setMiddleName(student.getMiddleName());
        studentData.setLastName(student.getLastName());
        studentData.setGender(student.getGender());
        studentData.setDateOfBirth(student.getDateOfBirth());
        studentData.setEmail(student.getEmail());
        studentData.setPhoneNumber(student.getPhoneNumber());
        studentData.setAddress(student.getAddress());
        studentData.setGuardianName(student.getGuardianName());
        studentData.setGuardianEmail(student.getGuardianEmail());
        studentData.setGuardianPhoneNumber(student.getGuardianPhoneNumber());
        studentData.setFormFourIndexNumber(student.getFormFourIndexNumber());
        studentData.setFormSixIndexNumber(student.getFormSixIndexNumber());
        studentData.setRegistrationNumber(student.getRegistrationNumber());
        studentData.setProgrammedId(student.getProgramme().getId());
        studentData.setAwardLevel(student.getProgramme().getAward().getLevel());
        studentData.setProgramme(student.getProgramme().getName());
        studentData.setStatus(student.getStatus().name());
        return studentData;
    }

    public String generateRegistrationNumber(StudentDto studentData){
        String registrationNumber = null;
        if(programmeDao.existsById(studentData.getProgrammedId())){
            Optional<Programme> programme = programmeDao.findById(studentData.getProgrammedId());
            assert programme.isPresent();
            String categoryCode = switch (studentData.getAwardLevel()){
                case 4 -> "01";
                case 7 -> "02";
                case 9 -> "03";
                default -> "00";
            };
            int studentCount = studentDao.findAll().size() + 1;
            String departmentCode = programme.get().getCourse().getDepartment().getId() < 9 ? "0" + programme.get().getCourse().getDepartment().getId() : programme.get().getCourse().getDepartment().getId().toString();
            String genderCode = Objects.equals(studentData.getGender().toUpperCase(), "MALE") ? "01" : "02";
            String courseCode = programme.get().getCourse().getId() < 9 ? "0"+programme.get().getCourse().getId() : programme.get().getCourse().getId().toString();
            String studentNumber;
            if(studentCount > 9999) studentNumber = String.valueOf(studentCount);
            else if(studentCount > 999) studentNumber = "0" + String.valueOf(studentCount);
            else if(studentCount > 99) studentNumber = "00" + String.valueOf(studentCount);
            else if(studentCount > 9) studentNumber = String.valueOf(studentCount);
            else studentNumber = "000" + String.valueOf(studentCount);

            registrationNumber = programme.get().getStartingYear().substring(2) + categoryCode + departmentCode +courseCode +studentNumber;
        }
        return registrationNumber;
    }
}
