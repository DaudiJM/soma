package tz.ac.dit.simsbe.staff_role;


import org.springframework.data.jpa.repository.JpaRepository;
import tz.ac.dit.simsbe.utilities.Roles;

import java.util.List;

public interface StaffRoleDao extends JpaRepository<StaffRole, Long> {
    List<StaffRole> findByStaffId(Long staffId);
    List<StaffRole> findByRole(Roles role);
}
