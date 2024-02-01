package tz.ac.dit.simsbe.staff;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class StaffDto {
    private Long id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String gender;
    private String email;
    private String phoneNumber;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
    private String status;
    private Long departmentId;
    private String department;
    private String address;
}
