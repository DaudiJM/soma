package tz.ac.dit.simsbe.modules.staff_module;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffModuleDao extends JpaRepository<StaffModule, Long> {
    List<StaffModule> findByLecturerId(Long lecturerId);
    List<StaffModule> findByCurriculumId(Long curriculumId);
    List<StaffModule> findAllByLecturerIdAndYear(Long lecturerId, String year);
}
