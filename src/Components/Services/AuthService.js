import axios from 'axios';
import { API_BASE_URL } from "../../Constants";
import  { JWT }  from '../Shared';

export const Login = async (data) => {
    try{
        const response = await axios.post(`${API_BASE_URL}/login`, data, {headers:{"Content-Type":"application/json"}});
        if(response.status === 200) {
            JWT.setJwt(response.data.token);
            return response.data;
        } else {
            return Promise.reject(new Error("Internal server error"));   
        }
    } catch(err){
        return Promise.reject(err);
    }
};

export const Register = async (data) => { 
    try{
        const response = await axios.post(`${API_BASE_URL}/user`, data, {headers:{"Content-Type":"application/json"}});
        if(response.status === 200) {
            return response.data;  
        } else {
            return Promise.reject(new Error("Internal server error"));   
        }
    }
    catch(err){
        return Promise.reject(err)
    }
};
export const ForgotPassword = async (data) => { 
    try{
        const response = await axios.post(`${API_BASE_URL}/password/forget`, data, {headers:{"Content-Type":"application/json"}});
        if(response.status === 200) {
            return response.data;  
        } else {
            return Promise.reject(new Error("Internal server error"));   
        }
    } catch(err){
        return Promise.reject(err);
    }
};

export const changePassword = async (data) => { 
    try{
        const response = await axios.put(`${API_BASE_URL}/password/reset/${data.token}`,data,
        {
            headers:
             {
                  "Content-Type": "application/json", 
                  "Authorization": `Bearer ${data.accessToken}` } 
              });
        if(response.status === 200) {
            return response.data;  
        } else {
            return Promise.reject(new Error("Internal server error"));   
        }
    } catch(err){
        return Promise.reject(err);
    }
};