package tz.ac.dit.simsbe.programme;

import lombok.Data;
import tz.ac.dit.simsbe.student.StudentDto;
import tz.ac.dit.simsbe.utilities.Status;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProgrammeDto {
    private Long id;
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer awardLevel;
    private String startingYear;
    private Integer semester;
    private String course;
    private Long courseId;
    private String status;
//    private List<StudentDto> students;
    private Integer year;
    private String academicYear;
}
