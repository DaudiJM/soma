package tz.ac.dit.simsbe.staff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tz.ac.dit.simsbe.api.request.ApiRequest;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.staff_role.StaffRoleDto;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = {"*"})
public class StaffController {
    @Autowired
    private StaffService staffService;

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<StaffDto>>> getAllStaff(){
        return new ResponseEntity<>(staffService.getAllStaff(), HttpStatus.OK);
    }

    @GetMapping("/list/{departmentId}")
    public ResponseEntity<ApiResponse<List<StaffDto>>> getAllStaff(@PathVariable("departmentId") Long departmentId){
        return new ResponseEntity<>(staffService.getAllDepartmentStaff(departmentId), HttpStatus.OK);
    }

    @GetMapping("/{staffId}")
    public ResponseEntity<ApiResponse<StaffDto>> getStaff(@PathVariable("staffId") Long staffId){
        return new ResponseEntity<>(staffService.getStaff(staffId), HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<ApiResponse<StaffDto>> getStaff(@PathVariable("email") String email){
        return new ResponseEntity<>(staffService.getStaff(email), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<StaffDto>> createOrUpdateStaff(@RequestBody ApiRequest<StaffDto> request) throws NoSuchAlgorithmException {
        return new ResponseEntity<>(staffService.createStaff(request.getBody()), HttpStatus.OK);
    }

    @PostMapping("/assign-roles")
    public ResponseEntity<ApiResponse<StaffDto>> assignRole(@RequestBody ApiRequest<StaffRoleDto> request){
        return new ResponseEntity<>(staffService.assignStaffRole(request.getBody()), HttpStatus.OK);
    }
}
