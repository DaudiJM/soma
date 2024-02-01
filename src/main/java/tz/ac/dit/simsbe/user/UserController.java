package tz.ac.dit.simsbe.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tz.ac.dit.simsbe.api.request.ApiRequest;
import tz.ac.dit.simsbe.api.response.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"*"})
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUsers(){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto>> getUser(@PathVariable("userId") Long userId){
        return new ResponseEntity<>(userService.getUser(userId), HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<ApiResponse<UserDto>> updateUser(@RequestBody ApiRequest<UserDto> request){
        return new ResponseEntity<>(userService.updateUser(request.getBody()), HttpStatus.OK);
    }
}
