import router from '@/router';

import axios from 'axios';



const instance = axios.create({
    baseURL: 'https://server.tavolo.ai/api/',
    // baseURL: 'http://localhost:8080/api/',
    // headers: {'X-Custom-Header': 'foobar'}
});

// Request Interceptor
instance.interceptors.request.use(
    (config) => {
        // Add the API key to the request headers
        config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(response => {
    return response
}, error => {
    // Handle error
    console.log(error)
    if (error.response.status == 401) {
        // ℹ️ Logout user and redirect to login page

        localStorage.removeItem('token')
        router.push('/login')
    }
    else {
        return Promise.reject(error)
    }
})

export default instance;

