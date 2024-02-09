import axios from "axios";

const BASE_URL = "http://localhost:30001/api/";
// const BASE_URL = "http://134.209.31.6:30001/api/";

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
    }
});