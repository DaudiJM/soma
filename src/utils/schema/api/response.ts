
export type ResponseHeader = {
    responseCode: "0" | "1" | "2";
    responseStatus: "success" | "failed" | "info";
    responseMessage: string;
    token: string;
}

type Response <T> = {
    header: ResponseHeader;
    body: {
        data: T;
    }
}

export default Response;