package tz.ac.dit.simsbe.student;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class StudentDto {
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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDate dateOfBirth;
    private String programme;
    private Long programmedId;
    private Integer awardLevel;
    private String formFourIndexNumber;
    private String formSixIndexNumber;
    private String status;
}
