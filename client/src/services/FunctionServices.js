import axios from 'axios';

const baseURL = "http://localhost:8800/api/func/";

export const countSoldBook = (data) => {
    return axios.post("http://localhost:8800/api/func/countSoldBook", data);
}