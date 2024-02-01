package tz.ac.dit.simsbe.programme;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tz.ac.dit.simsbe.award.Award;
import tz.ac.dit.simsbe.course.Course;
import tz.ac.dit.simsbe.student.Student;
import tz.ac.dit.simsbe.user.User;
import tz.ac.dit.simsbe.utilities.Status;

import java.time.LocalDateTime;
import java.time.Year;
import java.util.List;

@Getter
@Setter
@Data
@Entity
@Table(name = "Programme", indexes = {
        @Index(name = "idx_programme_name", columnList = "name")
}, uniqueConstraints = {
        @UniqueConstraint(name = "uc_programme_name", columnNames = {"name"})
})
public class Programme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String startingYear;
    @ManyToOne
    @JoinColumn(
            name = "award_id",
            referencedColumnName = "id"
    )
    private Award award;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    @ManyToOne
    @JoinColumn(
            name = "created_by",
            referencedColumnName = "id"
    )
    private User createdBy;
    @ManyToOne
    @JoinColumn(
            name = "updated_by",
            referencedColumnName = "id"
    )
    private User updatedBy;
    private Status status;
    @ManyToOne
    @JoinColumn(
            name = "course_id",
            referencedColumnName = "id"
    )
    private Course course;
    private Integer year;
    private String academicYear;
    private Integer semester;
    @OneToMany(mappedBy = "programme")
    private List<Student> students;
}
