import axios from "axios";

const baseUrl = "http://localhost:5029/api/feedback/"

const getFeedbacks = () => {
    return axios.get(baseUrl);
}

const getFeedback = (id) => {
    return axios.get(baseUrl + id);
}

const sendFeedback = (formData) => {
    return axios.post(baseUrl + "addFeedback", formData);
}

const getReports = (id) => {

    return axios.get(baseUrl + "getReports/" + id);
}

const getSummary = (id) => {
    return axios.get(baseUrl + "getSummary/" + id);
}

const getPaginatedFeedback = (data) => {
    return axios.get(baseUrl + "getPaginated/", {params: data});
}

export {getFeedbacks, getFeedback, sendFeedback, getReports, getSummary, getPaginatedFeedback};