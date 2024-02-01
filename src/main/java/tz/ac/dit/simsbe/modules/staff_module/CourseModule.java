package tz.ac.dit.simsbe.modules.staff_module;

import lombok.Data;

@Data
public class CourseModule {
    private Long id;
    private String course;
    private String moduleCode;
    private String moduleTitle;
    private Long courseId;
}
