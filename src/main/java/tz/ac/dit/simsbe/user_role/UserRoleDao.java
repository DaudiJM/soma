package tz.ac.dit.simsbe.user_role;

import org.springframework.data.jpa.repository.JpaRepository;
import tz.ac.dit.simsbe.utilities.Roles;

import java.util.List;

public interface UserRoleDao extends JpaRepository<UserRole, Long> {
    List<UserRole> findByUserId(Long userId);
    List<UserRole> findByRole(Roles roles);
}
