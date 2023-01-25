import axios from 'axios';

const baseUrl = "https://localhost:7093/api/users/";
const authBase = "https://localhost:7093/api/auth/";
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