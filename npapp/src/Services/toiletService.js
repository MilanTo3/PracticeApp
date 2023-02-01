import axios from "axios";

const baseUrl = "http://localhost:5029/api/toilet/"
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const authAxios = axios.create({

    headers: {
        Authorization: `Bearer ${user ? user.token:''}`
    }
});

const getToilets = () => {
    return authAxios.get(baseUrl);
}

const getToilet = (id) => {
    return authAxios.get(baseUrl + id);
}

const addToilet = (formData) => {
    return axios.post(baseUrl + "addToilet", formData);
}

const getNames = () => {
    return axios.get(baseUrl + "getNames");
}

const updateToilet = (formData) => {
    return axios.put(baseUrl, formData);
}

export {getToilets, getToilet, addToilet, getNames, updateToilet};