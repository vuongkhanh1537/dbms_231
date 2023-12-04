import axios from "axios";

export const fetchAllBook = () => {
    return axios.get("http://localhost:8800/books");
}

export const getABook = (id) => {
    return axios.get(`http://localhost:8800/books/${id}`);
}

export const fetchPublishers = () => {
    return axios.get("http://localhost:8800/publishers");
}

export const addBook = (data) => {
    return axios.post("http://localhost:8800/books", data);
}

export const delBook = (id) => {
    return axios.delete(`http://localhost:8800/books/${id}`);
}

export const updateBook = (id, data) => {
    return axios.put(`http://localhost:8800/books/${id}`, data);
}