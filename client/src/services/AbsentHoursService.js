import axios from 'axios';

const baseURL = "http://localhost:8800/api/func/";

export const calculateAbsentHours = (data) => {
    console.log(data);
    return axios.post("http://localhost:8800/api/func/calculateAbsentHours", data);
}