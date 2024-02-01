package tz.ac.dit.simsbe.student;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentDao extends JpaRepository<Student, Long> {
    Optional<Student> findByEmail(String email);
    Optional<Student> findByPhoneNumber(String phoneNumber);
    Optional<Student> findByRegistrationNumber(String registrationNumber);
    Optional<Student> findByFormFourIndexNumber(String formFourIndexNumber);
    Optional<Student> findByFormSixIndexNumber(String formSixIndexNumber);
    List<Student> findByProgrammeId(Long programmeId, Sort sort);
    List<Student> findAllByProgrammeCourseDepartmentId(Long departmentId, Sort sort);
}
