package tz.ac.dit.simsbe.staff;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tz.ac.dit.simsbe.department.Department;
import tz.ac.dit.simsbe.user.User;
import tz.ac.dit.simsbe.utilities.Status;

import java.time.LocalDateTime;

@Data
@Entity
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String gender;
    private String phoneNumber;
    private String email;
    private String address;
    @ManyToOne
    @JoinColumn(
            name = "department_id",
            referencedColumnName = "id"
    )
    private Department department;
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
}
