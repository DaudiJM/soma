package tz.ac.dit.simsbe.result.module_result;

import lombok.Data;

@Data
public class StudentModuleResult {
    private Long id;
    private String name;
    private String registrationNumber;
    private Float ca;
    private Float fe;
    private String grade;
    private String status;
    private String moduleCode;
    private String moduleTitle;
}
