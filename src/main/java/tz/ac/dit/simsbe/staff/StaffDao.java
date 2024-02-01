package tz.ac.dit.simsbe.staff;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StaffDao extends JpaRepository<Staff, Long> {
    Optional<Staff> findByPhoneNumber(String phoneNumber);
    Optional<Staff> findByEmail(String email);
    List<Staff> findAllByDepartmentId(Long departmentId, Sort sort);
}
