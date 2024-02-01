package tz.ac.dit.simsbe.result.module_result;

import lombok.Data;

import java.util.List;

@Data
public class ProgrammeModuleResults {
    private Long id;
    private String moduleCode;
    private String moduleTitle;
    private String programme;
    private Long programmeId;
    private List<StudentModuleResult> results;
}
