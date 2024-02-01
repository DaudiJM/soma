package tz.ac.dit.simsbe.modules;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import tz.ac.dit.simsbe.award.Award;
import tz.ac.dit.simsbe.department.Department;
import tz.ac.dit.simsbe.user.User;
import tz.ac.dit.simsbe.utilities.Status;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
@Entity
@Table(name = "Module", indexes = {
        @Index(name = "idx_module_code", columnList = "code")
}, uniqueConstraints = {
        @UniqueConstraint(name = "uc_module_code", columnNames = {"code"})
})
public class Module {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String code;
    @ManyToOne
    @JoinColumn(
            name = "department_id",
            referencedColumnName = "id"
    )
    private Department department;
    private LocalDateTime createdAt;
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
            name = "award_id",
            referencedColumnName = "id"
    )
    private Award award;
    private Integer credits;
    private Integer semester;
}
