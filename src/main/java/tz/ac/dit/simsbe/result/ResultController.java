package tz.ac.dit.simsbe.result;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tz.ac.dit.simsbe.api.request.ApiRequest;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.result.module_result.ProgrammeModuleResults;
import tz.ac.dit.simsbe.result.module_result.StudentModuleResult;
import tz.ac.dit.simsbe.result.programme_result.ProgrammeList;
import tz.ac.dit.simsbe.result.programme_result.ProgrammeResultService;
import tz.ac.dit.simsbe.result.student_result.StudentSemesterResult;

import java.util.List;

@RestController
@RequestMapping("/api/result")
@CrossOrigin(origins = {"*"})
public class ResultController {
    @Autowired
    private ResultService resultService;
    @Autowired
    private ProgrammeResultService programmeResultService;

    @PostMapping("/upload/ca")
    public ResponseEntity<ApiResponse<ProgrammeModuleResults>> uploadCaResults(@RequestBody ApiRequest<ProgrammeModuleResults> request){
        return new ResponseEntity<>(resultService.uploadCAResult(request.getBody()), HttpStatus.OK);
    }

    @PostMapping("/upload/fe")
    public ResponseEntity<ApiResponse<ProgrammeModuleResults>> uploadOrUpdateResult(@RequestBody ApiRequest<ProgrammeModuleResults> request){
        return new ResponseEntity<>(resultService.uploadResults(request.getBody()), HttpStatus.OK);
    }

    @GetMapping("/student/{registrationNumber}/year/{year}/{semester}")
    public ResponseEntity<ApiResponse<StudentSemesterResult>> getStudentSemesterResult(@PathVariable("registrationNumber") String registrationNumber, @PathVariable("year") Integer year, @PathVariable("semester") Integer semester){
        ApiResponse<StudentSemesterResult> response = new ApiResponse<>();
        return new ResponseEntity<>(response.success(resultService.getStudentSemesterResult(registrationNumber, semester, year), "Student results."), HttpStatus.OK);
    }

    @GetMapping("/student/{registrationNumber}/year/{year}")
    public ResponseEntity<ApiResponse<List<StudentSemesterResult>>> getStudentYearResult(@PathVariable("registrationNumber") String registrationNumber, @PathVariable("year") Integer year){
        return new ResponseEntity<>(resultService.getStudentYearResult(registrationNumber, year), HttpStatus.OK);
    }

    @GetMapping("/student/current/year/{registrationNumber}")
    public ResponseEntity<ApiResponse<List<StudentSemesterResult>>> getStudentCurrentYearResult(@PathVariable("registrationNumber") String registrationNumber){
        return new ResponseEntity<>(resultService.getStudentCurrentYearResult(registrationNumber), HttpStatus.OK);
    }

    @GetMapping("/student/current/semester/{registrationNumber}")
    public ResponseEntity<ApiResponse<StudentSemesterResult>> getStudentCurrentSemesterResult(@PathVariable("registrationNumber") String registrationNumber){
        return new ResponseEntity<>(resultService.getStudentCurrentSemesterResult(registrationNumber), HttpStatus.OK);
    }

    @GetMapping("/programme/{programmeId}/module/{moduleId}")
    public ResponseEntity<ApiResponse<ProgrammeModuleResults>> getProgrammeModuleResults(@PathVariable("programmeId") Long programmeId, @PathVariable("moduleId") Long moduleId){
        return new ResponseEntity<>(resultService.getProgrammeModuleResult(programmeId, moduleId), HttpStatus.OK);
    }

    @GetMapping("/programme/{programmeId}")
    public ResponseEntity<ApiResponse<List<StudentSemesterResult>>> getProgrammeCurrentSemesterResult(@PathVariable("programmeId") Long programmeId){
        return new ResponseEntity<>(resultService.getProgrammeCurrentSemesterResult(programmeId), HttpStatus.OK);
    }

    @GetMapping("/student/programme/{programmeId}/module/{moduleId}")
    public ResponseEntity<ApiResponse<List<StudentModuleResult>>> getStudents(@PathVariable("programmeId") Long programmeId, @PathVariable("moduleId") Long moduleId){
        return new ResponseEntity<>(resultService.getModuleStudents(programmeId, moduleId), HttpStatus.OK);
    }

    @GetMapping("/programme/list/{lecturerId}")
    public ResponseEntity<ApiResponse<ProgrammeList>> getLecturerProgrammes(@PathVariable("lecturerId") Long lecturerId){
        return new ResponseEntity<>(programmeResultService.getProgrammeList(lecturerId), HttpStatus.OK);
    }
}
