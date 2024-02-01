package tz.ac.dit.simsbe.course;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tz.ac.dit.simsbe.department.Department;
import tz.ac.dit.simsbe.programme.Programme;
import tz.ac.dit.simsbe.user.User;
import tz.ac.dit.simsbe.utilities.Status;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String code;
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
    @ManyToOne
    @JoinColumn(
            name = "department_id",
            referencedColumnName = "id"
    )
    private Department department;
    private Status status;
    private Integer courseWorkScore;
    private Integer finalExaminationScore;
    @OneToMany(mappedBy = "course")
    private List<Programme> programmes;
}
