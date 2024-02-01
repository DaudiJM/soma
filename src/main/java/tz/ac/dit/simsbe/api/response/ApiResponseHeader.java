package tz.ac.dit.simsbe.api.response;

import lombok.Data;

@Data
public class ApiResponseHeader {
    private String responseCode;
    private String responseStatus;
    private String responseMessage;
}
