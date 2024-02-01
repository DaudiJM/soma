package tz.ac.dit.simsbe.grade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tz.ac.dit.simsbe.api.request.ApiRequest;
import tz.ac.dit.simsbe.api.response.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/api/grade")
@CrossOrigin(origins = {"*"})
public class GradeController {
    @Autowired
    private GradeService gradeService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GradeDto>> getGrade(@PathVariable("id") Long gradeId){
        return new ResponseEntity<>(gradeService.getGrade(gradeId), HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<GradeDto>>> getAll(){
        return new ResponseEntity<>(gradeService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<GradeDto>> createGrade(@RequestBody ApiRequest<GradeDto> request){
        return new ResponseEntity<>(gradeService.createGrade(request.getBody()), HttpStatus.OK);
    }
}
