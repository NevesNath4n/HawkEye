import axios from 'axios';
import { useRouter } from 'next/navigation';

let instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
});


instance.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    if(error.response.status == 401){
        console.log(error);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("expires_at");
        window.location.href = "/login";
    }
    return Promise.reject(error);
})


export default instance;