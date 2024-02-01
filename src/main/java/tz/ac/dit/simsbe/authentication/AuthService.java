package tz.ac.dit.simsbe.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.api.request.ApiRequestBody;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.user.User;
import tz.ac.dit.simsbe.user.UserDao;
import tz.ac.dit.simsbe.user.UserDto;
import tz.ac.dit.simsbe.user.UserService;
import tz.ac.dit.simsbe.utilities.Roles;
import tz.ac.dit.simsbe.utilities.Status;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserService userService;
    @Autowired
    private UserDao userDao;

    public ApiResponse<UserDto> authenticateUser(ApiRequestBody<AuthDto> requestBody) throws NoSuchAlgorithmException {
        ApiResponse<UserDto> response = new ApiResponse<>();
        String responseMessage;
        AuthDto authData = requestBody.getData();
        if(userDao.findByUsername(authData.getUsername()).isPresent()){
            Optional<User> user = userDao.findByUsername(authData.getUsername());
            assert user.isPresent();
            if(Objects.equals(user.get().getPassword(), userService.hashPassword(authData.getPassword()))){
                updateLastLoginDate(user.get());
                UserDto userData = userService.getUserDto(user.get());
                responseMessage = "Authentication Successful. Welcome " + userData.getRoles().get(0);
                return response.success(userData, responseMessage);
            }
        } else if(Objects.equals(authData.getUsername(), "administrator@dit.system.ac.tz") && Objects.equals(authData.getPassword(), "administrator@dit.system.ac.tz")){
            return createSuperUser(requestBody);
        }
        responseMessage = "Authentication failed. Username or Password was not Correct";
        return response.failed(new UserDto(), responseMessage);
    }

    public ApiResponse<UserDto> createSuperUser(ApiRequestBody<AuthDto> requestBody) throws NoSuchAlgorithmException {
        ApiResponse<UserDto> response = new ApiResponse<>();
        UserDto userData = new UserDto();
        AuthDto authData = requestBody.getData();
        userData.setUsername(authData.getUsername());
        userData.setPassword(authData.getPassword());
        userData.setEmail("administrator@dit.system.ac.tz");
        userData.setStatus(Status.ACTIVE.name());
        List<Roles> roles = new ArrayList<>();

        roles.add(Roles.ADMINISTRATOR);
        userData.setUserRoles(roles);
        ApiResponse<UserDto> userCreationResponse = userService.createUser(userData);
        System.out.println(userCreationResponse);
        if(Objects.equals("0", userCreationResponse.getHeader().getResponseCode())){
            return authenticateUser(requestBody);
        }
        return response.failed(new UserDto(), "Authentication failed. Username or Password in not correct");
    }

    public void updateLastLoginDate(User user){
        user.setLastLoginDate(LocalDateTime.now());
        userDao.save(user);
    }
}
