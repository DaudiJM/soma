package tz.ac.dit.simsbe.staff_role;

import lombok.Data;

import java.util.List;

@Data
public class StaffRoleDto {
    private Long id;
    private List<String> roles;
}
