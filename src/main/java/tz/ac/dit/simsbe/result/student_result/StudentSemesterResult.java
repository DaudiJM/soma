package tz.ac.dit.simsbe.result.student_result;

import lombok.Data;
import tz.ac.dit.simsbe.result.module_result.StudentModuleResult;
import tz.ac.dit.simsbe.student.StudentDto;

import java.util.List;

@Data
public class StudentSemesterResult {
    private Long id;
    private StudentDto student;
    private String year;
    private Integer awardLevel;
    private Integer semester;
    private String awardTitle;
    private Float semesterGpa;
    private String status;
    private List<StudentModuleResult> results;
}
