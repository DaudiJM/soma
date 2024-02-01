package tz.ac.dit.simsbe.curriculum;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tz.ac.dit.simsbe.course.Course;
import tz.ac.dit.simsbe.modules.Module;
import tz.ac.dit.simsbe.utilities.Category;
import tz.ac.dit.simsbe.utilities.Status;

import java.time.LocalDateTime;

@Data
@Entity
public class Curriculum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(
            name = "course_id",
            referencedColumnName = "id"
    )
    private Course course;
    @ManyToOne
    @JoinColumn(
            name = "module_code",
            referencedColumnName = "code"
    )
    private Module module;
    private Category moduleCategory;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    private Status status;
}
