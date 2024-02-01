package tz.ac.dit.simsbe.grade;

import lombok.Data;
import tz.ac.dit.simsbe.award.Award;
import tz.ac.dit.simsbe.utilities.Status;

import java.time.LocalDateTime;

@Data
public class GradeDto {
    private Long id;
    private String grade;
    private Float points;
    private Integer minimum;
    private Integer maximum;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String remarks;
    private String status;
    private Integer awardLevel;
}
