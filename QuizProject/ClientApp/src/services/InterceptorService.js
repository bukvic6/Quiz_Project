import axios from 'axios';

const api = axios.create();

api.interceptors.request.use(
    (config) => {
        const userDataJSON = localStorage.getItem('token');
        const userData = JSON.parse(userDataJSON);

        if (userDataJSON) {
            config.headers['Authorization'] = `Bearer ${userData.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;