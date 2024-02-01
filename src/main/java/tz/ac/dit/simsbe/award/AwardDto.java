package tz.ac.dit.simsbe.award;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AwardDto {
    private Long id;
    private String title;
    private Integer level;
    private Integer semesters;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;
    private String status;
}
