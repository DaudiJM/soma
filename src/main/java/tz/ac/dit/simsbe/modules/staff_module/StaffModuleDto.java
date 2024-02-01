package tz.ac.dit.simsbe.modules.staff_module;

import lombok.Data;

import java.util.List;

@Data
public class StaffModuleDto {
    private Long staffId;
    private List<Long> modulesIds;
    private List<CourseModule> courseModules;
}
