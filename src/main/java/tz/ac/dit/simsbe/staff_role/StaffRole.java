package tz.ac.dit.simsbe.staff_role;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tz.ac.dit.simsbe.staff.Staff;
import tz.ac.dit.simsbe.utilities.Roles;
import tz.ac.dit.simsbe.utilities.Status;

import java.time.LocalDateTime;

@Data
@Entity
public class StaffRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(
            name = "staff_id",
            referencedColumnName = "id"
    )
    private Staff staff;
    private Roles role;
    private Status status;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
