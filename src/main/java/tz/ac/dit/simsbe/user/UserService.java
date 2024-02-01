package tz.ac.dit.simsbe.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.api.request.ApiRequestBody;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.user_role.UserRole;
import tz.ac.dit.simsbe.user_role.UserRoleDao;
import tz.ac.dit.simsbe.user_role.UserRoleService;
import tz.ac.dit.simsbe.utilities.Roles;
import tz.ac.dit.simsbe.utilities.Status;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private UserRoleService userRoleService;
    @Autowired
    private UserRoleDao userRoleDao;

    public ApiResponse<UserDto> createUser(UserDto userData) throws NoSuchAlgorithmException {
        ApiResponse<UserDto> response = new ApiResponse<>();
        String responseMessage;
        if(!Objects.equals(null, userData.getId()) && userDao.existsById(userData.getId())){
            ApiRequestBody<UserDto> requestBody = new ApiRequestBody<>();
            requestBody.setData(userData);
            return updateUser(requestBody);
        }

        if(userDao.findByEmail(userData.getEmail()).isEmpty()){
            User user = new User();
            user.setEmail(userData.getEmail());
            user.setStatus(Status.ACTIVE);
            user.setUsername(userData.getUsername());
            user.setPassword(hashPassword(userData.getPassword()));
            user = userDao.save(user);
            for(Roles role: userData.getUserRoles()){
                userRoleService.assignRole(user, role);
            }
            responseMessage = "User saved Successfully.";
            return response.success(getUserDto(user), responseMessage);
        }
        responseMessage = "Failed to Create User. User email already exist.";
        return response.failed(userData, responseMessage);
    }


    public ApiResponse<UserDto> updateUser(ApiRequestBody<UserDto> requestBody){
        ApiResponse<UserDto> response = new ApiResponse<>();
        String responseMessage;
        UserDto userData = requestBody.getData();
        if(userDao.existsById(userData.getId())){
            Optional<User> user = userDao.findById(userData.getId());
            assert user.isPresent();

            if (userDao.findByEmail(userData.getEmail()).isPresent() && Objects.equals(userDao.findByEmail(userData.getEmail()).get().getId(), user.get().getId())){
                responseMessage = "Failed to update user. user with the same email already exist.";
                return response.failed(userData, responseMessage);
            }

            user.get().setEmail(userData.getEmail());
            responseMessage = "User Updated Successfully";
            return response.success(getUserDto(userDao.save(user.get())), responseMessage);
        }
        responseMessage = "Failed to Update user. No User with Id " + userData.getId();
        return response.failed(userData, responseMessage);
    }

    public ApiResponse<List<UserDto>> getAllUsers(){
        ApiResponse<List<UserDto>> response = new ApiResponse<>();
        String responseMessage;
        List<UserDto> users = new ArrayList<>();

        for(User user: userDao.findAll(Sort.by("email"))){
            users.add(getUserDto(user));
        }

        responseMessage = users.size() + " users found in records";
        return response.success(users, responseMessage);
    }

    public ApiResponse<UserDto> getUser(Long userId){
        ApiResponse<UserDto> response = new ApiResponse<>();
        String responseMessage;

        if(userDao.existsById(userId)){
            Optional<User> user = userDao.findById(userId);
            assert user.isPresent();
            responseMessage = "User data found in records.";
            return response.success(getUserDto(user.get()), responseMessage);
        }
        responseMessage = "Failed to get User. No User with Id " + userId;
        return response.failed(new UserDto(), responseMessage);
    }

    public String hashPassword(String plainPassword) throws NoSuchAlgorithmException {
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        messageDigest.update(plainPassword.getBytes(StandardCharsets.UTF_8));
        byte[] byteArray = messageDigest.digest();
        StringBuilder password = new StringBuilder();
        for (byte b : byteArray) {
            password.append(Integer.toHexString(0xFF & b));
        }
        return String.valueOf(password);
    }

    public UserDto getUserDto(User user){
        UserDto userData = new UserDto();
        userData.setId(user.getId());
        userData.setEmail(user.getEmail());
        userData.setStatus(user.getStatus().name());
        userData.setCreatedAt(user.getCreatedAt());
        userData.setUpdatedAt(user.getUpdatedAt());
        userData.setUsername(user.getUsername());
        if(!userRoleDao.findByUserId(user.getId()).isEmpty()){
            for (UserRole userRole: userRoleDao.findByUserId(user.getId())){
                List<Roles> roles = new ArrayList<>();
                List<String> userRoles = new ArrayList<>();
                roles.add(userRole.getRole());
                String role = switch (userRole.getRole()){
                    case ADMINISTRATOR -> "ADMINISTRATOR";
                    case STAFF -> "STAFF";
                    case STUDENT -> "STUDENT";
                    case LECTURER -> "LECTURER";
                    case DEPARTMENT_COORDINATOR -> "DEPARTMENT COORDINATOR";
                    case EXAMINATION_COORDINATOR -> "EXAMINATION COORDINATOR";
                    case HEAD_OF_DEPARTMENT -> "HEAD OF DEPARTMENT";
                    case APPLICANT -> "APPLICANT";
                };
                userRoles.add(role);
                userData.setUserRoles(roles);
                userData.setRoles(userRoles);
            }
        }
        return userData;
    }
}
