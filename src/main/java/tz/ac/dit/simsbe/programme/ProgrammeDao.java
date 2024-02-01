package tz.ac.dit.simsbe.programme;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProgrammeDao extends JpaRepository<Programme, Long> {
    Optional<Programme> findByName(String name);
    List<Programme> findByCourseId(Long courseId);
    List<Programme> findAllByCourseDepartmentId(Long departmentId, Sort sort);
}
