package tz.ac.dit.simsbe.application;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationDao extends JpaRepository<Application, Long> {
    Optional<Application> findByEmail(String email);
    Optional<Application> findByPhoneNumber(String phoneNumber);
    Optional<Application> findByFormFourIndexNumber(String formFourIndexNumber);
    Optional<Application> findByFormSixIndexNumber(String formSixIndexNumber);
    List<Application> findByYear(String year, Sort sort);
}
