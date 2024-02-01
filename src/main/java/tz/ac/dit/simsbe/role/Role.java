package tz.ac.dit.simsbe.role;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tz.ac.dit.simsbe.user.User;

import java.time.LocalDateTime;

@Data
@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String role;
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
}
