package tz.ac.dit.simsbe.department;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tz.ac.dit.simsbe.api.request.ApiRequest;
import tz.ac.dit.simsbe.api.response.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/api/department")
@CrossOrigin(origins = {"*"})
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<DepartmentDto>>> getAll(){
        return new ResponseEntity<>(departmentService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DepartmentDto>> getDepartment(@PathVariable("id") Long departmentId){
        return new ResponseEntity<>(departmentService.getDepartment(departmentId), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<DepartmentDto>> createOrUpdateDepartment(@RequestBody ApiRequest<DepartmentDto> request){
        return new ResponseEntity<>(departmentService.createDepartment(request.getBody()), HttpStatus.OK);
    }
}
