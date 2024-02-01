package tz.ac.dit.simsbe.curriculum;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CurriculumDao extends JpaRepository<Curriculum, Long> {
    List<Curriculum> findByCourseId(Long courseId);
    List<Curriculum> findByModuleAwardLevel(Integer awardLevel);
    List<Curriculum> findByModuleId(Long moduleId);
}
