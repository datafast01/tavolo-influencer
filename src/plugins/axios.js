// import axios from 'axios'


// const axiosIns = axios.create({
  
// // You can add your headers here
// // ================================
// baseURL: 'http://server.tavolo.ai/api/',
// // timeout: 1000,
// // headers: {'X-Custom-Header': 'foobar'}
// })


// // ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
// axiosIns.interceptors.request.use(config => {
//   // Retrieve token from localStorage
  
// const userData = localStorage.getItem('userData')
// const token = JSON.parse(userData)
// console.log(token.token)
 
//     console.log(userData, '=============')
//         // Add the API key to the request headers
      
//         config.headers['Authorization'] = `Bearer ${token.token}`;

//         return config;

 
// })

// // ℹ️ Add response interceptor to handle 401 response
// // axiosIns.interceptors.response.use(response => {
// //   return response
// // }, error => {
// //   // Handle error
// //   console.log(error)
// //   if (error.response.status === 401) {
// //     // ℹ️ Logout user and redirect to login page
   
// //     localStorage.removeItem('userData')

// //     // Remove "accessToken" from localStorage
    

// //     // If 401 response returned from api
// //     router.push('/login')
// //   }
// //   else {
// //     return Promise.reject(error)
// //   }
// // })
// export default axiosIns

// src/axios.js

import axios from 'axios';



const instance = axios.create({
    baseURL: 'https://server.tavolo.ai/api/',  
    // baseURL: 'http://localhost:8080/api/',
// headers: {'X-Custom-Header': 'foobar'}
});

// Request Interceptor
// instance.interceptors.request.use(
//     (config) => {
//         // Add the API key to the request headers
//         config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`;

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// instance.interceptors.response.use(response => {
//   return response
// }, error => {
//   // Handle error
//   console.log(error)
//   if (error.response.status == 401) {
//     // ℹ️ Logout user and redirect to login page
   
//     localStorage.removeItem('token')
//     router.push('/login')
//   }
//   else {
//     return Promise.reject(error)
//   }
// })

export default instance;

