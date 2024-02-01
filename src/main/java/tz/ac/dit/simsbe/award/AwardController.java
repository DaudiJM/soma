package tz.ac.dit.simsbe.award;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tz.ac.dit.simsbe.api.request.ApiRequest;
import tz.ac.dit.simsbe.api.response.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/api/award")
@CrossOrigin(origins = {"*"})
public class AwardController {
    @Autowired
    private AwardService awardService;

    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<AwardDto>>> getAll(){
        return new ResponseEntity<>(awardService.getAllAwards(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AwardDto>> getAward(@PathVariable("id") Long awardId){
        return new ResponseEntity<>(awardService.getAward(awardId), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<AwardDto>> createdOrUpdatedAward(@RequestBody ApiRequest<AwardDto> request){
        return new ResponseEntity<>(awardService.createAward(request.getBody()), HttpStatus.OK);
    }
}
