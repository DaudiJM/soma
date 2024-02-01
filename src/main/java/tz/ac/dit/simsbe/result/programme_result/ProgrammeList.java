package tz.ac.dit.simsbe.result.programme_result;

import lombok.Data;
import tz.ac.dit.simsbe.programme.ProgrammeDto;

import java.util.List;

@Data
public class ProgrammeList {
    private Long lecturerId;
    private List<ProgrammeDto> programmes;
}
