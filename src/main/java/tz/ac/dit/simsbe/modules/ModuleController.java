package tz.ac.dit.simsbe.modules;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tz.ac.dit.simsbe.api.request.ApiRequest;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.modules.staff_module.StaffModuleDto;
import tz.ac.dit.simsbe.modules.staff_module.StaffModuleService;

import java.util.List;

@RestController
@RequestMapping("/api/module")
@CrossOrigin(origins = {"*"})
public class ModuleController {

    @Autowired
    private ModuleService moduleService;
    @Autowired
    private StaffModuleService staffModuleService;

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<ModuleDto>>> getAllModules(){
        return new ResponseEntity<>(moduleService.getAllModules(), HttpStatus.OK);
    }

    @GetMapping("/list/{departmentId}")
    public ResponseEntity<ApiResponse<List<ModuleDto>>> getAllDepartmentModules(@PathVariable("departmentId") Long departmentId){
        return new ResponseEntity<>(moduleService.getAllDepartmentModules(departmentId), HttpStatus.OK);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<ApiResponse<List<ModuleDto>>> getUnsignedModules(@PathVariable("courseId") Long courseId){
        return new ResponseEntity<>(moduleService.getUnsignedModules(courseId), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ModuleDto>> getModule(@PathVariable("id") Long moduleId){
        return new ResponseEntity<>(moduleService.getModule(moduleId), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<ModuleDto>> createModule(@RequestBody ApiRequest<ModuleDto> request){
        return new ResponseEntity<>(moduleService.createModule(request.getBody()), HttpStatus.OK);
    }

    @PostMapping("/assign-lecturer")
    public ResponseEntity<ApiResponse<StaffModuleDto>> assignLecturerModules(@RequestBody ApiRequest<StaffModuleDto> request){
        return new ResponseEntity<>(staffModuleService.assignModule(request.getBody()), HttpStatus.OK);
    }

    @GetMapping("/lecturer/{lecturerId}/class/{classId}")
    public ResponseEntity<ApiResponse<ModuleDto>> getLecturerClassModule(@PathVariable Long lecturerId, @PathVariable Long classId){
        return new ResponseEntity<>(staffModuleService.getLecturerClassModule(classId, lecturerId), HttpStatus.OK);
    }
}
