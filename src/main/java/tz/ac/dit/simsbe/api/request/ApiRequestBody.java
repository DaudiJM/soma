package tz.ac.dit.simsbe.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiRequestBody <T>{
    private T data;
    private Long userId;
}
