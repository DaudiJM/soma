package tz.ac.dit.simsbe.result;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tz.ac.dit.simsbe.modules.Module;
import tz.ac.dit.simsbe.student.Student;

import java.time.LocalDateTime;

@Data
@Entity
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(
            name = "student_registration_number",
            referencedColumnName = "registrationNumber"
    )
    private Student student;
    @ManyToOne
    @JoinColumn(
            name = "module_code",
            referencedColumnName = "code"
    )
    private Module module;
    private Float ca;
    private Float fe;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    private String academicYear;
    private Integer year;
    private Integer semester;
}
