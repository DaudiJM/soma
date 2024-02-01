package tz.ac.dit.simsbe.application;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import tz.ac.dit.simsbe.award.Award;
import tz.ac.dit.simsbe.course.Course;
import tz.ac.dit.simsbe.programme.Programme;
import tz.ac.dit.simsbe.utilities.Category;
import tz.ac.dit.simsbe.utilities.Status;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Application {
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
    private LocalDate createdAt;
    @CreationTimestamp
    private LocalDateTime updatedAt;
    @UpdateTimestamp
    private LocalDate dateOfBirth;
    private String formFourIndexNumber;
    private String formSixIndexNumber;
    private Status status;
    @ManyToOne
    @JoinColumn(
            name = "course_id",
            referencedColumnName = "id"
    )
    private Course course;
    private Category category;
    @ManyToOne
    @JoinColumn(
            name = "application_award_id",
            referencedColumnName = "id"
    )
    private Award award;
    private String year;
}
