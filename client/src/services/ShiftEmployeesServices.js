import axios from 'axios';

const baseURL = "http://localhost:8800/api/func/";

export const shiftEmployees = (data) => {
    console.log(data);
    return axios.post("http://localhost:8800/api/func/shiftEmployees", data);
}