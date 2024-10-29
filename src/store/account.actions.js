import axiosServices from "../utils/axios";
import { ACCOUNT_INITIALIZE } from "./actions";

export const login = ({username,password})=>async(dispatch)=>{
    try {
        const response= await axiosServices.post("/auth/login",{username, password})
        localStorage.setItem('TOKEN', response.data.data.authToken)
        const payload= { isLoggedIn: true, user: response.data.user, token: response.data.data.authToken }
        dispatch({
        type:ACCOUNT_INITIALIZE,
        payload
        })
        
    } catch (error) {
        throw new Error(error)
    }
};