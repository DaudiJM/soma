package tz.ac.dit.simsbe.user_role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.user.User;
import tz.ac.dit.simsbe.utilities.Roles;

@Service
public class UserRoleService {
    @Autowired
    private UserRoleDao userRoleDao;

    public void assignRole(User user, Roles role){
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        userRoleDao.save(userRole);
    }
}
