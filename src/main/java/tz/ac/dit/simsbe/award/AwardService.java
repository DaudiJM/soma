package tz.ac.dit.simsbe.award;

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
public class AwardService {
    @Autowired
    private AwardDao awardDao;

    public ApiResponse<AwardDto> createAward(ApiRequestBody<AwardDto> requestBody){
        ApiResponse<AwardDto> response = new ApiResponse<>();
        String responseMessage;
        AwardDto awardData = requestBody.getData();
        if(awardDao.existsById(awardData.getId())){
            return updatedAward(requestBody);
        }
        if(awardDao.findByTitle(awardData.getTitle()).isEmpty()){
            if(awardDao.findByLevel(awardData.getLevel()).isEmpty()){
                Award award = new Award();
                award.setTitle(awardData.getTitle());
                award.setLevel(awardData.getLevel());
                award.setSemesters(awardData.getSemesters());
                award.setStatus(Status.ACTIVE);
                responseMessage = "National award saved successfully.";
                return response.success(getAwardDto(awardDao.save(award)), responseMessage);
            }
            responseMessage = "Failed to create National Award. award with the same Level already exist.";
            return response.failed(awardData, responseMessage);
        }
        responseMessage = "Failed to create National Award. Award with the same Title already exist.";
        return response.failed(awardData, responseMessage);
    }

    public ApiResponse<AwardDto> updatedAward(ApiRequestBody<AwardDto> requestBody){
        ApiResponse<AwardDto> response = new ApiResponse<>();
        String responseMessage;
        AwardDto awardData = requestBody.getData();
        Optional<Award> award = awardDao.findById(awardData.getId());
        assert award.isPresent();
        if(awardDao.findByLevel(awardData.getLevel()).isPresent() && !Objects.equals(awardDao.findByLevel(awardData.getLevel()).get().getId(), award.get().getId())){
            responseMessage = "Failed to Updated Award. Award with the same level already exist.";
            return response.failed(awardData, responseMessage);
        }
        if(awardDao.findByTitle(awardData.getTitle()).isPresent() && !Objects.equals(awardDao.findByTitle(awardData.getTitle()).get().getId(), award.get().getId())){
            responseMessage = "Failed to Update Award. Award with the same title already exist.";
            return response.failed(awardData, responseMessage);
        }
        award.get().setTitle(awardData.getTitle());
        award.get().setLevel(awardData.getLevel());
        award.get().setSemesters(awardData.getSemesters());
        responseMessage = "National Award updated successfully.";
        return response.success(getAwardDto(awardDao.save(award.get())), responseMessage);
    }

    public ApiResponse<AwardDto> getAward(Long awardId){
        ApiResponse<AwardDto> response = new ApiResponse<>();
        String responseMessage;
        if(awardDao.existsById(awardId)){
            Optional<Award> award = awardDao.findById(awardId);
            assert award.isPresent();
            responseMessage = "National award data found in records.";
            return response.success(getAwardDto(award.get()), responseMessage);
        }
        responseMessage = "failed to get award. no award with Id " + awardId;
        return response.failed(new AwardDto(), responseMessage);
    }

    public ApiResponse<List<AwardDto>> getAllAwards(){
        ApiResponse<List<AwardDto>> response = new ApiResponse<>();
        String responseMessage;
        List<AwardDto> awards = new ArrayList<>();
        for(Award award: awardDao.findAll(Sort.by("level").ascending())){
            awards.add(getAwardDto(award));
        }
        responseMessage = awards.size() + " Awards found in records.";
        return response.success(awards, responseMessage);
    }

    public AwardDto getAwardDto(Award award){
        AwardDto awardData = new AwardDto();
        awardData.setId(award.getId());
        awardData.setLevel(award.getLevel());
        awardData.setTitle(award.getTitle());
        awardData.setCreatedAt(award.getCreatedAt());
        awardData.setUpdatedAt(award.getUpdatedAt());
        awardData.setStatus(award.getStatus().name());
        awardData.setSemesters(award.getSemesters());
        return awardData;
    }
}
