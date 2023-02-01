import axios from 'axios';

const baseUrl = "http://localhost:5029/api/users/";
const authBase = "http://localhost:5029/api/auth/";
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const authAxios = axios.create({

    headers: {
        Authorization: `Bearer ${user ? user.token:''}`
    }
});

const getUsers = () => {
    return authAxios.get(baseUrl);
}

const getUser = (id) => {
    return authAxios.get(baseUrl + id);
}

const registerUser = (formData) => {
    return axios.post(authBase + "registerUser", formData);
}

const loginUser = (formData) => {

    return axios.post(authBase + "loginUser", formData);
}

export { getUsers, registerUser, loginUser, getUser }