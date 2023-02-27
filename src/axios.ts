import axios from 'axios'
import { base_url } from './base.url';
const getToken = ()=>{
        return localStorage.getItem('token');
}
// axios Syntax and use it work
// const AxiosInstance = axios.create({
//         baseURL: base_url,
//         timeout: 1000,
//         headers: {
//                 Authorization:"Brearer "+ getToken()
//         }
// });


// axios Syntax and use 
const AxiosInstance = axios.create({
        baseURL: base_url,
        timeout: 1000,
});
AxiosInstance.interceptors.request.use(function(config:any){
        config.headers.Authorization = 'Bearer ' + getToken();
        return config;
})
export { AxiosInstance };
      