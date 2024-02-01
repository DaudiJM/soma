package tz.ac.dit.simsbe.grade;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tz.ac.dit.simsbe.award.Award;
import tz.ac.dit.simsbe.user.User;
import tz.ac.dit.simsbe.utilities.Status;

import java.time.LocalDateTime;

@Data
@Entity
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String grade;
    private Float points;
    private Integer minimum;
    private Integer maximum;
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
    private String remarks;
    private Status status;
    @ManyToOne
    @JoinColumn(
            name = "award_id",
            referencedColumnName = "id"
    )
    private Award award;
}
