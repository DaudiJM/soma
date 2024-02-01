package tz.ac.dit.simsbe.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tz.ac.dit.simsbe.api.request.ApiRequest;
import tz.ac.dit.simsbe.api.response.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = {"*"})
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<StudentDto>>> getAllStudents(){
        return new ResponseEntity<>(studentService.getAllStudents(), HttpStatus.OK);
    }

    @GetMapping("/list/{classId}")
    public ResponseEntity<ApiResponse<List<StudentDto>>> getAllStudents(@PathVariable("classId") Long classId){
        return new ResponseEntity<>(studentService.getAllStudentsInClass(classId), HttpStatus.OK);
    }

    @GetMapping("/list/department/{departmentId}")
    public ResponseEntity<ApiResponse<List<StudentDto>>> getAllDepartmentStudents(@PathVariable("departmentId") Long departmentId){
        return new ResponseEntity<>(studentService.getAllDepartmentStudents(departmentId), HttpStatus.OK);
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<ApiResponse<StudentDto>> getStudent(@PathVariable("studentId") Long studentId){
        return new ResponseEntity<>(studentService.getStudent(studentId), HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<ApiResponse<StudentDto>> getStudent(@PathVariable("email") String email){
        return new ResponseEntity<>(studentService.getStudent(email), HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse<StudentDto>> updateStudent(@RequestBody ApiRequest<StudentDto> request){
        return new ResponseEntity<>(studentService.updateStudent(request.getBody()), HttpStatus.OK);
    }
}

