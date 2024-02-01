package tz.ac.dit.simsbe.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tz.ac.dit.simsbe.api.request.ApiRequest;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.user.UserDto;

import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/api/authentication")
@CrossOrigin(origins = {"*"})
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping
    public ResponseEntity<ApiResponse<UserDto>> authenticateUser(@RequestBody ApiRequest<AuthDto> request) throws NoSuchAlgorithmException {
        return new ResponseEntity<>(authService.authenticateUser(request.getBody()), HttpStatus.OK);
    }
}
