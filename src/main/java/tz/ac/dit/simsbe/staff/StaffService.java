package tz.ac.dit.simsbe.staff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.api.request.ApiRequestBody;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.department.Department;
import tz.ac.dit.simsbe.department.DepartmentDao;
import tz.ac.dit.simsbe.staff_role.StaffRoleDto;
import tz.ac.dit.simsbe.staff_role.StaffRoleService;
import tz.ac.dit.simsbe.user.UserDto;
import tz.ac.dit.simsbe.user.UserService;
import tz.ac.dit.simsbe.utilities.Roles;
import tz.ac.dit.simsbe.utilities.Status;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class StaffService {
    @Autowired
    private StaffDao staffDao;
    @Autowired
    private DepartmentDao departmentDao;
    @Autowired
    private UserService userService;
    @Autowired
    private StaffRoleService staffRoleService;

    public ApiResponse<StaffDto> createStaff(ApiRequestBody<StaffDto> requestBody) throws NoSuchAlgorithmException {
        ApiResponse<StaffDto> response = new ApiResponse<>();
        String responseMessage;
        StaffDto staffData = requestBody.getData();
        if(staffDao.existsById(staffData.getId())){
            return updateStaff(requestBody);
        }

        if(staffDao.findByEmail(staffData.getEmail()).isEmpty()){
            if(staffDao.findByPhoneNumber(staffData.getPhoneNumber()).isEmpty()){
                if(departmentDao.existsById(staffData.getDepartmentId())){
                    Optional<Department> department = departmentDao.findById(staffData.getDepartmentId());
                    assert department.isPresent();

                    Staff staff = new Staff();
                    staff.setFirstName(staffData.getFirstName());
                    staff.setMiddleName(staffData.getMiddleName());
                    staff.setLastName(staffData.getLastName());
                    staff.setEmail(staffData.getEmail());
                    staff.setPhoneNumber(staffData.getPhoneNumber());
                    staff.setGender(staffData.getGender());
                    staff.setAddress(staffData.getAddress());
                    staff.setStatus(Status.ACTIVE);
                    staff.setDepartment(department.get());

                    UserDto userDto = new UserDto();
                    userDto.setEmail(staffData.getEmail());
                    userDto.setUsername(staff.getEmail());
                    userDto.setPassword(staffData.getEmail());
                    List<Roles> roles = new ArrayList<>();
                    roles.add(Roles.STAFF);
                    userDto.setUserRoles(roles);
                    ApiResponse<UserDto> saveUserResponse = userService.createUser(userDto);
                    if(Objects.equals(saveUserResponse.getHeader().getResponseCode(), "0")){
                        responseMessage = "Staff saved successfully.";
                        return response.success(getStaffDto(staffDao.save(staff)), responseMessage);
                    }
                    responseMessage = "Failed to add staff. Account creation failed.";
                    return response.failed(staffData, responseMessage);
                }
                responseMessage = "Failed to add staff. Selected department was not found in records";
                return response.failed(staffData, responseMessage);
            }
            responseMessage = "Failed to add staff. Staff with the same phone Number already exist.";
            return response.failed(staffData, responseMessage);
        }
        responseMessage = "Failed to add staff. Staff with the same email exist in records.";
        return response.failed(staffData, responseMessage);
    }

    public ApiResponse<StaffDto> updateStaff(ApiRequestBody<StaffDto> requestBody){
        ApiResponse<StaffDto> response = new ApiResponse<>();
        String responseMessage;
        StaffDto staffData = requestBody.getData();
        if(staffDao.existsById(staffData.getId())){
            if(departmentDao.existsById(staffData.getDepartmentId())){
                Optional<Department> department = departmentDao.findById(staffData.getDepartmentId());
                assert department.isPresent();

                Optional<Staff> staff = staffDao.findById(staffData.getId());
                assert staff.isPresent();

                if(staffDao.findByEmail(staffData.getEmail()).isPresent() && !Objects.equals(staffDao.findByEmail(staffData.getEmail()).get().getId(), staff.get().getId())){
                    responseMessage = "Failed to update staff. staff with the same email already exist in records.";
                    return response.failed(staffData, responseMessage);
                }

                if(staffDao.findByPhoneNumber(staffData.getPhoneNumber()).isPresent() && !Objects.equals(staffDao.findByPhoneNumber(staffData.getPhoneNumber()).get().getId(), staff.get().getId())){
                    responseMessage = "Failed to Update staff. Staff with the same phone Number already exist in records";
                    return response.failed(staffData, responseMessage);
                }

                staff.get().setFirstName(staffData.getFirstName());
                staff.get().setMiddleName(staffData.getMiddleName());
                staff.get().setLastName(staffData.getLastName());
                staff.get().setGender(staffData.getGender());
                staff.get().setEmail(staffData.getEmail());
                staff.get().setPhoneNumber(staffData.getPhoneNumber());
                staff.get().setAddress(staffData.getAddress());
                staff.get().setDepartment(department.get());
                responseMessage = "Staff Updated successfully.";
                return response.success(getStaffDto(staffDao.save(staff.get())), responseMessage);
            }
            responseMessage = "Failed to update staff. No department with Id " + staffData.getDepartmentId();
            return response.failed(staffData, responseMessage);
        }
        responseMessage = "Failed to update staff. No Staff with Id " + staffData.getId();
        return response.failed(staffData, responseMessage);
    }

    public ApiResponse<StaffDto> getStaff(Long staffId){
        ApiResponse<StaffDto> response = new ApiResponse<>();
        String responseMessage;
        if(staffDao.existsById(staffId)){
            Optional<Staff> staff = staffDao.findById(staffId);
            assert staff.isPresent();
            responseMessage = "Staff Data found in records";
            return response.success(getStaffDto(staff.get()), responseMessage);
        }
        responseMessage = "Failed to get staff. No staff with Id " + staffId;
        return response.failed(new StaffDto(), responseMessage);
    }

    public ApiResponse<StaffDto> getStaff(String email){
        ApiResponse<StaffDto> response = new ApiResponse<>();
        String responseMessage;
        if(staffDao.findByEmail(email).isPresent()){
            Optional<Staff> staff = staffDao.findByEmail(email);
            assert staff.isPresent();
            return getStaff(staff.get().getId());
        }
        responseMessage = "Failed to get staff. No staff with email " + email;
        return response.failed(new StaffDto(), responseMessage);
    }

    public ApiResponse<List<StaffDto>> getAllStaff(){
        ApiResponse<List<StaffDto>> response = new ApiResponse<>();
        String responseMessage;
        List<StaffDto> staffList = new ArrayList<>();
        Sort sort = Sort.by("gender").ascending().and(Sort.by("firstName").ascending().and(Sort.by("middleName").ascending().and(Sort.by("lastName"))));
        for(Staff staff: staffDao.findAll(sort)){
            staffList.add(getStaffDto(staff));
        }
        responseMessage = staffList.size() + " Staff found in records";
        return response.success(staffList, responseMessage);
    }

    public ApiResponse<List<StaffDto>> getAllDepartmentStaff(Long departmentId){
        ApiResponse<List<StaffDto>> response = new ApiResponse<>();
        String responseMessage;
        List<StaffDto> staffList = new ArrayList<>();
        Sort sort = Sort.by("gender").ascending().and(Sort.by("firstName").ascending().and(Sort.by("middleName").ascending().and(Sort.by("lastName"))));
        for(Staff staff: staffDao.findAllByDepartmentId(departmentId, sort)){
            staffList.add(getStaffDto(staff));
        }
        responseMessage = staffList.size() + " Staff found in records";
        return response.success(staffList, responseMessage);
    }

    public ApiResponse<StaffDto> assignStaffRole(ApiRequestBody<StaffRoleDto> requestBody){
        ApiResponse<StaffDto> response = new ApiResponse<>();
        String responseMessage;
        StaffRoleDto staffRoleData = requestBody.getData();
        if(!Objects.equals(null, staffRoleData.getId()) && staffDao.existsById(staffRoleData.getId())){
            Optional<Staff> staff = staffDao.findById(staffRoleData.getId());
            assert staff.isPresent();

            for (String staffRole: staffRoleData.getRoles()){
                Roles role = switch (staffRole){
                    case "LECTURER" -> Roles.LECTURER;
                    case "HOD" -> Roles.HEAD_OF_DEPARTMENT;
                    case "EXAM COORDINATOR" -> Roles.EXAMINATION_COORDINATOR;
                    case "DEPARTMENT COORDINATOR" -> Roles.DEPARTMENT_COORDINATOR;
                    default -> Roles.STAFF;
                };
                staffRoleService.assignRole(staff.get(), role);
            }
            responseMessage = "Roles assigned Successfully";
            return response.success(getStaffDto(staff.get()), responseMessage);
        }
        responseMessage = "Failed to Assign Role to Staff. No Staff with Id " + staffRoleData.getId();
        return response.failed(new StaffDto(), responseMessage);
    }

    public StaffDto getStaffDto(Staff staff){
        StaffDto staffData = new StaffDto();
        staffData.setId(staff.getId());
        staffData.setFirstName(staff.getFirstName());
        staffData.setMiddleName(staff.getMiddleName());
        staffData.setLastName(staff.getLastName());
        staffData.setGender(staff.getGender());
        staffData.setEmail(staff.getEmail());
        staffData.setPhoneNumber(staff.getPhoneNumber());
        staffData.setStatus(staff.getStatus().name());
        staffData.setDepartment(staff.getDepartment().getName());
        staffData.setDepartmentId(staff.getDepartment().getId());
        staffData.setCreatedAt(staff.getCreatedAt());
        staffData.setUpdatedAt(staff.getUpdatedAt());
        return staffData;
    }
}
