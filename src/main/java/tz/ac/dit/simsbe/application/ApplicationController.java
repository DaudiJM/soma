package tz.ac.dit.simsbe.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tz.ac.dit.simsbe.api.request.ApiRequest;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.student.StudentDto;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping("/api/application")
@CrossOrigin(origins = {"*"})
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<ApplicationDto>>> getAllApplications(){
        return new ResponseEntity<>(applicationService.getAllApplications(), HttpStatus.OK);
    }

    @GetMapping("/list/{year}")
    public ResponseEntity<ApiResponse<List<ApplicationDto>>> getAllApplications(@PathVariable("year") String year){
        return new ResponseEntity<>(applicationService.getAllApplications(year), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ApplicationDto>> getApplication(@PathVariable("id") Long id){
        return new ResponseEntity<>(applicationService.getApplication(id), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<ApplicationDto>> createApplication(@RequestBody ApiRequest<ApplicationDto> request) throws NoSuchAlgorithmException {
        return new ResponseEntity<>(applicationService.createApplication(request.getBody()), HttpStatus.OK);
    }

    @PostMapping("/enroll")
    public ResponseEntity<ApiResponse<List<StudentDto>>> enrollStudents(@RequestBody ApiRequest<List<Long>> request) throws NoSuchAlgorithmException {
        return new ResponseEntity<>(applicationService.enrollStudent(request.getBody()), HttpStatus.OK);
    }
}
