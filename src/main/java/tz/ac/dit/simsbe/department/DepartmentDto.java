package tz.ac.dit.simsbe.department;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DepartmentDto {
    private Long id;
    private String name;
    private String code;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
    private String hod;
    private String status;
}
