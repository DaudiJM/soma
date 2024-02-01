package tz.ac.dit.simsbe.staff_role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.staff.Staff;
import tz.ac.dit.simsbe.staff.StaffDao;
import tz.ac.dit.simsbe.utilities.Roles;
import tz.ac.dit.simsbe.utilities.Status;

@Service
public class StaffRoleService {
    @Autowired
    private StaffRoleDao staffRoleDao;
    @Autowired
    private StaffDao staffDao;

    public StaffRole assignRole(Staff staff, Roles role){
        StaffRole staffRole = new StaffRole();
        if(staffDao.existsById(staff.getId())){
            staffRole.setStaff(staff);
            staffRole.setRole(role);
            staffRole.setStatus(Status.ACTIVE);
            return staffRoleDao.save(staffRole);
        }
        return staffRole;
    }
}
