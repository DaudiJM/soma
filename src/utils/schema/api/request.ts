
export type RequestConfig <T, H> = {
    url: string;
    data?: T;
    params?: object;
    formData?: FormData;
}

export type AxiosConfig<T, H> = {
    method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
} & RequestConfig<T, H>;

export type RequestHeader = {
    userId: number;
}

type Request <T> = {
    header: RequestHeader;
    body: {
        data: T;
        userId: number;
    }
}

export default Request;