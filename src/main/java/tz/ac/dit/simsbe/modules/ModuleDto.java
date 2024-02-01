package tz.ac.dit.simsbe.modules;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ModuleDto {
    private Long id;
    private String title;
    private String code;
    private String department;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String status;
    private Long departmentId;
    private Integer awardLevel;
    private Integer credits;
    private Integer semester;
}
