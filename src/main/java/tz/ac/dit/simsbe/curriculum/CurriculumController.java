package tz.ac.dit.simsbe.curriculum;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tz.ac.dit.simsbe.api.request.ApiRequest;
import tz.ac.dit.simsbe.api.response.ApiResponse;

@RestController
@RequestMapping("/api/curriculum")
@CrossOrigin(origins = {"*"})
public class CurriculumController {
    private final Logger _log = LoggerFactory.getLogger(CurriculumController.class);

    @Autowired
    private CurriculumService curriculumService;

    @GetMapping("/{courseId}")
    public ResponseEntity<ApiResponse<CourseCurriculum>> getCourseCurriculum(@PathVariable("courseId") Long courseId){
        return new ResponseEntity<>(curriculumService.getCourseCurriculum(courseId), HttpStatus.OK);
    }

    @PostMapping("/add-module")
    public ResponseEntity<ApiResponse<CurriculumDto>> addModuleToCurriculum(@RequestBody ApiRequest<CurriculumDto> request){
        return new ResponseEntity<>(curriculumService.addModuleToCourseCurriculum(request.getBody()), HttpStatus.OK);
    }

    @PostMapping("/set")
    public ResponseEntity<ApiResponse<CourseCurriculum>> setCurriculum(@RequestBody ApiRequest<CourseCurriculum> request){
        _log.info(String.valueOf(request));
        return new ResponseEntity<>(curriculumService.setCourseCurriculum(request.getBody().getData()), HttpStatus.OK);
    }

    @GetMapping("/programme/{programmeId}")
    public ResponseEntity<ApiResponse<CourseCurriculum>> getProgrammeCurrentSemesterModules(@PathVariable("programmeId") Long programmeId){
        return new ResponseEntity<>(curriculumService.getClassSemesterModules(programmeId), HttpStatus.OK);
    }
}
