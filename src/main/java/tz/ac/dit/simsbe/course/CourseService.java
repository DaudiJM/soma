package tz.ac.dit.simsbe.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.api.request.ApiRequestBody;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.department.Department;
import tz.ac.dit.simsbe.department.DepartmentDao;
import tz.ac.dit.simsbe.utilities.Status;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseDao courseDao;
    @Autowired
    private DepartmentDao departmentDao;

    public ApiResponse<CourseDto> createCourse(ApiRequestBody<CourseDto> requestBody){
        ApiResponse<CourseDto> response = new ApiResponse<>();
        String responseMessage;
        CourseDto courseData = requestBody.getData();
        if(courseDao.existsById(courseData.getId())){
            return updateCourse(requestBody);
        }
        if(courseDao.findByTitle(courseData.getTitle()).isEmpty()){
            if(courseDao.findByCode(courseData.getCode()).isEmpty()){
                if(departmentDao.existsById(courseData.getDepartmentId())){
                    Course course = new Course();
                    course.setTitle(courseData.getTitle());
                    course.setCode(courseData.getCode());
                    course.setStatus(Status.ACTIVE);
                    course.setCourseWorkScore(courseData.getCourseWorkScore());
                    course.setFinalExaminationScore(courseData.getFinalExaminationScore());
                    Optional<Department> department = departmentDao.findById(courseData.getDepartmentId());
                    assert department.isPresent();
                    course.setDepartment(department.get());
                    responseMessage = "Course saved successfully";
                    return response.success(getCourseDto(courseDao.save(course)), responseMessage);
                }
                responseMessage = "Failed to Add course. Selected department do not exist.";
                return response.failed(courseData, responseMessage);
            }
            responseMessage = "failed to Add course. Course with the same code already exist in records";
            return response.failed(courseData, responseMessage);
        }
        responseMessage = "Failed to Add course. Course with the same title";
        return response.failed(courseData, responseMessage);
    }

    private ApiResponse<CourseDto> updateCourse(ApiRequestBody<CourseDto> requestBody){
        ApiResponse<CourseDto> response = new ApiResponse<>();
        String responseMessage;
        CourseDto courseData = requestBody.getData();
        if(courseDao.existsById(courseData.getId())){
            if(departmentDao.existsById(courseData.getDepartmentId())){
                Optional<Course> course = courseDao.findById(courseData.getId());
                assert course.isPresent();

                if(courseDao.findByCode(courseData.getCode()).isPresent() && !Objects.equals(courseDao.findByCode(courseData.getCode()).get().getId(), course.get().getId())){
                    responseMessage = "Failed to update course. Course with the same code already exist.";
                    return response.failed(courseData, responseMessage);
                }

                if(courseDao.findByTitle(courseData.getTitle()).isPresent() && !Objects.equals(courseDao.findByTitle(courseData.getTitle()).get().getId(), course.get().getId())){
                    responseMessage = "Failed to Update course. Course with the same Title already exist in records";
                    return response.failed(courseData, responseMessage);
                }

                Optional<Department> department = departmentDao.findById(courseData.getDepartmentId());
                assert department.isPresent();
                course.get().setTitle(courseData.getTitle());
                course.get().setCode(courseData.getCode());
                course.get().setDepartment(department.get());
                course.get().setCourseWorkScore(courseData.getCourseWorkScore());
                course.get().setFinalExaminationScore(courseData.getFinalExaminationScore());
                responseMessage = "Course updated successfully.";
                return response.success(getCourseDto(courseDao.save(course.get())), responseMessage);
            }
            responseMessage = "Failed to update course. no department with Id " + courseData.getDepartmentId();
            return response.failed(courseData, responseMessage);
        }
        responseMessage = "Failed to update course. No course with Id " + courseData.getId();
        return response.failed(courseData, responseMessage);
    }
    public ApiResponse<CourseDto> getCourse(Long courseId){
        ApiResponse<CourseDto> response = new ApiResponse<>();
        String responseMessage;
        if(courseDao.existsById(courseId)){
            Optional<Course> course = courseDao.findById(courseId);
            assert course.isPresent();
            responseMessage = "Course data found in records.";
            return response.success(getCourseDto(course.get()), responseMessage);
        }
        responseMessage = "Failed to get course. No course with Id " + courseId;
        return response.failed(new CourseDto(), responseMessage);
    }

    public ApiResponse<List<CourseDto>> getAllCourses(){
        ApiResponse<List<CourseDto>> response = new ApiResponse<>();
        String responseMessage;
        List<CourseDto> courses = new ArrayList<>();
        for(Course course: courseDao.findAll(Sort.by("title").ascending())){
            courses.add(getCourseDto(course));
        }
        responseMessage = courses.size() + " Courses found in records.";
        return response.success(courses, responseMessage);
    }

    public ApiResponse<List<CourseDto>> getDepartmentCourses(Long departmentId){
        ApiResponse<List<CourseDto>> response = new ApiResponse<>();
        String responseMessage;
        List<CourseDto> courses = new ArrayList<>();
        if(departmentDao.existsById(departmentId)){
            for(Course course: courseDao.findAllByDepartmentId(departmentId, Sort.by("title").ascending())){
                courses.add(getCourseDto(course));
            }
            responseMessage = courses.size() + " Courses found in records.";
            return response.success(courses, responseMessage);
        }
        responseMessage = "Failed to get Courses. No department with id " + departmentId;
        return response.failed(courses, responseMessage);
    }

    public CourseDto getCourseDto(Course course){
        CourseDto courseData = new CourseDto();
        courseData.setId(course.getId());
        courseData.setCode(course.getCode());
        courseData.setStatus(course.getStatus().name());
        courseData.setTitle(course.getTitle());
        courseData.setUpdatedAt(course.getUpdatedAt());
        courseData.setCreatedAt(course.getCreatedAt());
        courseData.setDepartment(course.getDepartment().getName());
        courseData.setDepartmentId(course.getDepartment().getId());
        courseData.setCourseWorkScore(course.getCourseWorkScore());
        courseData.setFinalExaminationScore(course.getFinalExaminationScore());
        return courseData;
    }
}
