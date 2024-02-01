package tz.ac.dit.simsbe.user;

import lombok.Data;
import tz.ac.dit.simsbe.utilities.Roles;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserDto {
    private Long id;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String status;
    private String createdBy;
    private String updatedBy;
    private String password;
    private List<Roles> userRoles;
    private List<String> roles;
    private String username;
}
