package tz.ac.dit.simsbe.modules.staff_module;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tz.ac.dit.simsbe.curriculum.Curriculum;
import tz.ac.dit.simsbe.staff.Staff;
import tz.ac.dit.simsbe.utilities.Status;

import java.time.LocalDateTime;

@Data
@Entity
public class StaffModule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(
            name = "course_module_id",
            referencedColumnName = "id"
    )
    private Curriculum curriculum;
    @ManyToOne
    @JoinColumn(
            name = "lecturer_id",
            referencedColumnName = "id"
    )
    private Staff lecturer;
    private String year;
    private Status status;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
