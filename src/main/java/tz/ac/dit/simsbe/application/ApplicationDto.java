package tz.ac.dit.simsbe.application;

import lombok.Data;
import tz.ac.dit.simsbe.utilities.Category;
import tz.ac.dit.simsbe.utilities.Status;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ApplicationDto {
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
    private LocalDateTime updatedAt;
    private LocalDate dateOfBirth;
    private String formFourIndexNumber;
    private String formSixIndexNumber;
    private String status;
    private String course;
    private String category;
    private Integer awardLevel;
    private String year;
    private Long courseId;
}
