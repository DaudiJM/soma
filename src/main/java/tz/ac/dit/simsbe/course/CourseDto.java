package tz.ac.dit.simsbe.course;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CourseDto {
    private Long id;
    private String title;
    private String code;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String status;
    private String createdBy;
    private String updatedBy;
    private String department;
    private Long departmentId;
    private Integer courseWorkScore;
    private Integer finalExaminationScore;
}
