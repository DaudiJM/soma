package tz.ac.dit.simsbe.course;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseDao extends JpaRepository<Course, Long> {
    Optional<Course> findByTitle(String title);
    Optional<Course> findByCode(String code);
    List<Course> findAllByDepartmentId(Long departmentId, Sort sort);
}
