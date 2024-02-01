package tz.ac.dit.simsbe.result;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResultDao extends JpaRepository<Result, Long> {
    List<Result> findAllByStudentRegistrationNumber(String registrationNumber);
    List<Result> findAllByModuleCode(String moduleCode);
    Optional<Result> findByStudentRegistrationNumberAndModuleCode(String registrationNumber, String moduleCode);
}
