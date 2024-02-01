package tz.ac.dit.simsbe.curriculum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseCurriculum {
    private Long id;
    private String course;
    private List<CurriculumDto> modules;
}
