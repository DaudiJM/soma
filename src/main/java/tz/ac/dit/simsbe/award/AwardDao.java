package tz.ac.dit.simsbe.award;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AwardDao extends JpaRepository<Award, Long> {
    Optional<Award> findByTitle(String title);
    Optional<Award> findByLevel(Integer level);
}
