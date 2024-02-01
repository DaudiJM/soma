package tz.ac.dit.simsbe.grade;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GradeDao extends JpaRepository<Grade, Long> {
    List<Grade> findByAwardId(Long awardId);
    List<Grade> findByGrade(String grade);
    List<Grade> findByMinimum(Integer minimum);
    List<Grade> findByMaximum(Integer maximum);
}
