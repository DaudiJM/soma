package tz.ac.dit.simsbe.department;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DepartmentDao extends JpaRepository<Department, Long> {
    Optional<Department> findByName(String name);
    Optional<Department> findByCode(String code);
}
