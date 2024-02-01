package tz.ac.dit.simsbe.modules;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ModuleDao extends JpaRepository<Module, Long> {
    Optional<Module> findByCode(String moduleCode);
    List<Module> findAllByAwardLevel(Integer awardLevel);
    List<Module> findAllByDepartmentId(Long departmentId, Sort sort);
}
