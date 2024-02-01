package tz.ac.dit.simsbe.programme;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tz.ac.dit.simsbe.api.request.ApiRequest;
import tz.ac.dit.simsbe.api.response.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/api/programme")
@CrossOrigin(origins = {"*"})
public class ProgrammeController {
    @Autowired
    private ProgrammeService programmeService;

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<ProgrammeDto>>> getAllProgrammes(){
        return new ResponseEntity<>(programmeService.getAllProgrammes(), HttpStatus.OK);
    }

    @GetMapping("/list/{departmentId}")
    public ResponseEntity<ApiResponse<List<ProgrammeDto>>> getAllDepartmentProgrammes(@PathVariable("departmentId") Long departmentId){
        return new ResponseEntity<>(programmeService.getAllDepartmentProgrammes(departmentId), HttpStatus.OK);
    }

    @GetMapping("/{classId}")
    public ResponseEntity<ApiResponse<ProgrammeDto>> getProgramme(@PathVariable("classId") Long classId){
        return new ResponseEntity<>(programmeService.getProgramme(classId), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<ProgrammeDto>> createOrUpdateProgramme(@RequestBody ApiRequest<ProgrammeDto> request){
        return new ResponseEntity<>(programmeService.createProgramme(request.getBody()), HttpStatus.OK);
    }
}
