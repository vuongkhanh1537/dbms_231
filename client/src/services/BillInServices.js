import axios from 'axios';

const baseURL = "http://localhost:8800/api/func/";

export const billInPrices = (data) => {
    console.log(data);
    return axios.post("http://localhost:8800/api/func/billInPrices", data);
}