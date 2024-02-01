package tz.ac.dit.simsbe.api.response;

import lombok.Data;

@Data
public class ApiResponseBody <T>{
    private T data;
}
