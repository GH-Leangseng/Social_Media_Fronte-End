import axios from 'axios'
import { base_url } from './base.url';
const getToken = ()=>{
        return localStorage.getItem('token');
}
const AxiosInstance = axios.create({
        baseURL: base_url,
        timeout: 1000,
        headers: {
                Authorization:"Brearer "+ getToken()
        }
});
export { AxiosInstance };
      