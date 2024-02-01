package tz.ac.dit.simsbe.department;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.api.request.ApiRequestBody;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.utilities.Status;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class DepartmentService {
    @Autowired
    private DepartmentDao departmentDao;

    public ApiResponse<DepartmentDto> createDepartment(ApiRequestBody<DepartmentDto> requestBody){
        ApiResponse<DepartmentDto> response = new ApiResponse<>();
        String responseMessage;
        DepartmentDto departmentData = requestBody.getData();
        if(departmentDao.existsById(departmentData.getId())){
            return updatedDepartment(requestBody);
        }
        if(departmentDao.findByName(departmentData.getName()).isEmpty()){
            if(departmentDao.findByCode(departmentData.getCode()).isEmpty()){
                Department department = new Department();
                department.setName(departmentData.getName());
                department.setCode(departmentData.getCode());
                department.setStatus(Status.ACTIVE);
                responseMessage = "Department created successfully";
                return response.success(getDepartmentDto(departmentDao.save(department)), responseMessage);
            }
            responseMessage = "failed to Create department. Department with the same code already exist.";
            return response.failed(departmentData, responseMessage);
        }
        responseMessage = "Failed to create department. Department with the same name already exist.";
        return response.failed(departmentData, responseMessage);
    }

    public ApiResponse<DepartmentDto> updatedDepartment(ApiRequestBody<DepartmentDto> requestBody){
        ApiResponse<DepartmentDto> response = new ApiResponse<>();
        String responseMessage;
        DepartmentDto departmentData = requestBody.getData();
        Optional<Department> department = departmentDao.findById(departmentData.getId());
        assert department.isPresent();
        if(departmentDao.findByName(departmentData.getName()).isPresent() && !Objects.equals(departmentDao.findByName(departmentData.getName()).get().getId(), department.get().getId())){
            responseMessage = "Failed to Update department. Department with the same Name already exist.";
            return response.failed(departmentData, responseMessage);
        }

        if(departmentDao.findByCode(departmentData.getCode()).isPresent() && !Objects.equals(departmentDao.findByCode(departmentData.getCode()).get().getId(), department.get().getId())){
            responseMessage = "Failed to Update department. Department with the same code already exist in records";
            return response.failed(departmentData, responseMessage);
        }

        department.get().setName(departmentData.getName());
        department.get().setCode(departmentData.getCode());
        responseMessage = "Department update successfully.";
        return response.success(getDepartmentDto(departmentDao.save(department.get())), responseMessage);
    }

    public ApiResponse<DepartmentDto> getDepartment(Long departmentId){
        ApiResponse<DepartmentDto> response = new ApiResponse<>();
        String responseMessage;
        if(departmentDao.existsById(departmentId)){
            Optional<Department> department = departmentDao.findById(departmentId);
            assert department.isPresent();
            responseMessage = "Department data found in records.";
            return response.success(getDepartmentDto(department.get()), responseMessage);
        }
        responseMessage = "Failed to get department. No department with Id " + departmentId;
        return response.failed(new DepartmentDto(), responseMessage);
    }

    public ApiResponse<List<DepartmentDto>> getAll(){
        ApiResponse<List<DepartmentDto>> response = new ApiResponse<>();
        String responseMessage;
        List<DepartmentDto> departments = new ArrayList<>();
        for(Department department: departmentDao.findAll(Sort.by("name").ascending())){
            departments.add(getDepartmentDto(department));
        }
        responseMessage = departments.size() + " departments found in records";
        return response.success(departments, responseMessage);
    }

    public DepartmentDto getDepartmentDto(Department department){
        DepartmentDto departmentData = new DepartmentDto();
        departmentData.setId(department.getId());
        departmentData.setCode(department.getCode());
        departmentData.setName(department.getName());
        departmentData.setStatus(department.getStatus().name());
        departmentData.setCreatedAt(department.getCreatedAt());
        departmentData.setUpdatedAt(department.getUpdatedAt());
        departmentData.setHod(Objects.equals(null, department.getHod()) ? null : department.getHod().getFirstName() + " " + department.getHod().getMiddleName() + " " + department.getHod().getLastName());
        return departmentData;
    }
}
