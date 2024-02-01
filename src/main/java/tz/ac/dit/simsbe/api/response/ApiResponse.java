package tz.ac.dit.simsbe.api.response;

import lombok.Data;

@Data
public class ApiResponse <T>{
    private ApiResponseHeader header;
    private ApiResponseBody<T> body;

    public ApiResponse<T> success(T data, String responseMessage){
        ApiResponseHeader responseHeader = new ApiResponseHeader();
        responseHeader.setResponseCode("0");
        responseHeader.setResponseStatus("success");
        responseHeader.setResponseMessage(responseMessage);

        ApiResponseBody<T> responseBody = new ApiResponseBody<>();
        responseBody.setData(data);

        ApiResponse<T> response = new ApiResponse<>();
        response.setHeader(responseHeader);
        response.setBody(responseBody);
        return response;
    }

    public ApiResponse<T> failed(T data, String responseMessage){
        ApiResponseHeader responseHeader = new ApiResponseHeader();
        responseHeader.setResponseCode("1");
        responseHeader.setResponseStatus("error");
        responseHeader.setResponseMessage(responseMessage);

        ApiResponseBody<T> responseBody = new ApiResponseBody<>();
        responseBody.setData(data);

        ApiResponse<T> response = new ApiResponse<>();
        response.setHeader(responseHeader);
        response.setBody(responseBody);
        return response;
    }

    public ApiResponse<T> incomplete(T data, String responseMessage){
        ApiResponseHeader responseHeader = new ApiResponseHeader();
        responseHeader.setResponseCode("2");
        responseHeader.setResponseStatus("warning");
        responseHeader.setResponseMessage(responseMessage);

        ApiResponseBody<T> responseBody = new ApiResponseBody<>();
        responseBody.setData(data);

        ApiResponse<T> response = new ApiResponse<>();
        response.setHeader(responseHeader);
        response.setBody(responseBody);
        return response;
    }
}
