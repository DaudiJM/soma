package tz.ac.dit.simsbe.student;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tz.ac.dit.simsbe.programme.Programme;
import tz.ac.dit.simsbe.utilities.Status;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Data
@Entity
@Table(name = "Student", indexes = {
        @Index(name = "idx_student", columnList = "registrationNumber")
}, uniqueConstraints = {
        @UniqueConstraint(name = "uc_student_email_phonenumber", columnNames = {"email", "phoneNumber", "registrationNumber"})
})

public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String gender;
    private String email;
    private String phoneNumber;
    private String address;
    private String guardianName;
    private String guardianPhoneNumber;
    private String guardianEmail;
    private String registrationNumber;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    private LocalDate dateOfBirth;
    private String formFourIndexNumber;
    private String formSixIndexNumber;
    private Status status;
    @ManyToOne
    @JoinColumn(
            name = "programme_id",
            referencedColumnName = "id"
    )
    private Programme programme;
}
