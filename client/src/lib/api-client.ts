import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.HOST,
})