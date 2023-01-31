import axios from "axios";

const baseUrl = "https://localhost:7093/api/feedback/"
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const authAxios = axios.create({

    headers: {
        Authorization: `Bearer ${user ? user.token:''}`
    }
});

const getFeedbacks = () => {
    return authAxios.get(baseUrl);
}

const getFeedback = (id) => {
    return authAxios.get(baseUrl + id);
}

const sendFeedback = (formData) => {
    return axios.post(baseUrl + "addFeedback", formData);
}

const getReports = (id) => {
    return axios.post(baseUrl + "getReports/" + id);
}

const getSummary = (id) => {
    return axios.post(baseUrl + "getSummary/" + id);
}

export {getFeedbacks, getFeedback, sendFeedback, getReports, getSummary};