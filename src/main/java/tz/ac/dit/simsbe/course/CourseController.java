package tz.ac.dit.simsbe.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tz.ac.dit.simsbe.api.request.ApiRequest;
import tz.ac.dit.simsbe.api.response.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/api/course")
@CrossOrigin(origins = {"*"})
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<CourseDto>>> getAllCourses(){
        return new ResponseEntity<>(courseService.getAllCourses(), HttpStatus.OK);
    }

    @GetMapping("/list/{departmentId}")
    public ResponseEntity<ApiResponse<List<CourseDto>>> getDepartmentCourses(@PathVariable("departmentId") Long departmentId){
        return new ResponseEntity<>(courseService.getDepartmentCourses(departmentId), HttpStatus.OK);
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<ApiResponse<CourseDto>> getCourse(@PathVariable("courseId") Long courseId){
        return new ResponseEntity<>(courseService.getCourse(courseId), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<CourseDto>> createCourse(@RequestBody ApiRequest<CourseDto> request){
        return new ResponseEntity<>(courseService.createCourse(request.getBody()), HttpStatus.OK);
    }
}
