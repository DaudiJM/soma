package tz.ac.dit.simsbe.api.request;

import lombok.Data;

@Data
public class ApiRequest <T>{
    private ApiRequestHeader header;
    private ApiRequestBody<T> body;
}
