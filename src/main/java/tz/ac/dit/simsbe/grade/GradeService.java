package tz.ac.dit.simsbe.grade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tz.ac.dit.simsbe.api.request.ApiRequestBody;
import tz.ac.dit.simsbe.api.response.ApiResponse;
import tz.ac.dit.simsbe.award.Award;
import tz.ac.dit.simsbe.award.AwardDao;
import tz.ac.dit.simsbe.utilities.Status;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class GradeService {
    @Autowired
    private AwardDao awardDao;

    @Autowired
    private GradeDao gradeDao;

    public ApiResponse<GradeDto> createGrade(ApiRequestBody<GradeDto> requestBody){
        ApiResponse<GradeDto> response = new ApiResponse<>();
        String responseMessage;
        GradeDto gradeData = requestBody.getData();
        if(gradeData.getMaximum() <= 100 && gradeData.getMinimum() >= 0){
            if(awardDao.findByLevel(gradeData.getAwardLevel()).isPresent()){
                Optional<Award> award = awardDao.findByLevel(gradeData.getAwardLevel());
                assert award.isPresent();
                if(!gradeDao.findByAwardId(award.get().getId()).isEmpty()){
                    for(Grade grade: gradeDao.findByAwardId(award.get().getId())){
                        if(Objects.equals(grade.getMaximum(), gradeData.getMaximum())){
                            responseMessage = "Failed to create grade. Grade with the same Upper Boundary already exist.";
                            return response.failed(gradeData, responseMessage);
                        } else if(Objects.equals(grade.getMinimum(), gradeData.getMinimum())){
                            responseMessage = "Failed to create grade. Grade with the same Lower Boundary already exist.";
                            return response.failed(gradeData, responseMessage);
                        } else if(gradeData.getMinimum() >= grade.getMinimum() && gradeData.getMaximum() <= grade.getMaximum()){
                            responseMessage = "Failed to Create Grade. Minimum bound is with in another grade bound.";
                            return response.failed(gradeData, responseMessage);
                        } else if(gradeData.getMaximum() >= grade.getMaximum() && gradeData.getMaximum() <= grade.getMaximum()){
                            responseMessage = "Failed to Create grade. Maximum bound is with in another grade range";
                            return response.failed(gradeData, responseMessage);
                        } else if(Objects.equals(gradeData.getPoints(), grade.getPoints())){
                            responseMessage = "Failed to create grade. grade with same points already exist";
                            return response.failed(gradeData, responseMessage);
                        }
                    }
                }

                Grade grade = new Grade();
                grade.setGrade(gradeData.getGrade());
                grade.setRemarks(gradeData.getRemarks());
                grade.setAward(award.get());
                grade.setMinimum(gradeData.getMinimum());
                grade.setMaximum(gradeData.getMaximum());
                grade.setStatus(Status.ACTIVE);
                grade.setPoints(gradeData.getPoints());
                responseMessage = "Grade saved successfully.";
                return response.success(getGradeDto(gradeDao.save(grade)), responseMessage);
            }
            responseMessage = "failed to add award. Nta level specified was not found";
            return response.failed(gradeData, responseMessage);
        }
        responseMessage = "Failed to Add Award. Boundary should be between 0 and 100";
        return response.failed(gradeData, responseMessage);
    }

    public ApiResponse<GradeDto> getGrade(Long gradeId){
        ApiResponse<GradeDto> response = new ApiResponse<>();
        String responseMessage;
        if(gradeDao.existsById(gradeId)){
            Optional<Grade> grade = gradeDao.findById(gradeId);
            assert grade.isPresent();
            responseMessage = "Grade data found in records.";
            return response.success(getGradeDto(grade.get()), responseMessage);
        }
        responseMessage = "failed to get grade. No grade with id " + gradeId;
        return response.failed(new GradeDto(), responseMessage);
    }

    public ApiResponse<List<GradeDto>> getAll(){
        ApiResponse<List<GradeDto>> response = new ApiResponse<>();
        String responseMessage;
        List<GradeDto> grades = new ArrayList<>();
        for(Grade grade: gradeDao.findAll(Sort.by("award").ascending().and(Sort.by("maximum").descending()))){
            grades.add(getGradeDto(grade));
        }
        responseMessage = grades.size() + " grades found in records";
        return response.success(grades, responseMessage);
    }

    public GradeDto getGradeDto(Grade grade){
        GradeDto gradeData = new GradeDto();
        gradeData.setId(grade.getId());
        gradeData.setGrade(grade.getGrade());
        gradeData.setMinimum(grade.getMinimum());
        gradeData.setMaximum(grade.getMaximum());
        gradeData.setAwardLevel(Objects.equals(null, grade.getAward()) ? null : grade.getAward().getLevel());
        gradeData.setCreatedAt(grade.getCreatedAt());
        gradeData.setUpdatedAt(grade.getUpdatedAt());
        gradeData.setPoints(grade.getPoints());
        gradeData.setRemarks(grade.getRemarks());
        gradeData.setStatus(grade.getStatus().name());
        return gradeData;
    }
}
