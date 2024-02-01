package tz.ac.dit.simsbe.curriculum;

import lombok.Data;

@Data
public class CurriculumDto {
    private Long id;
    private Long courseId;
    private String moduleCode;
    private String moduleTitle;
    private String moduleCategory;
    private String status;
    private String createdAt;
    private String updatedAt;
    private String course;
    private Integer awardLevel;
    private Integer semester;
    private Long moduleId;
}
