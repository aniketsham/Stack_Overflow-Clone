import * as api from '../api/index.js'
import { setCurrentUser } from './currentUser.js';
import Axios from 'axios';
export const signup=(authData,navigate)=>async (dispatch)=>{
    try {
        var { data }=await api.signUp(authData)
            dispatch({type:'AUTH',data});
            dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
            navigate('/payment');
    } catch (error) {
        console.log(error)
    }
}
export const login=(authData,navigate)=>async (dispatch)=>{
    try {
        var { data }=await api.logIn(authData)
            dispatch({type:'AUTH',data})
            dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
            navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const forgotpassword=(authData,navigate)=>async (dispatch)=>{
    try {
        const { data }=await api.forgotPassword(authData)
        alert("Please check your email address for the link for reseting your password")
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const verifytoken=(authData,navigate)=>async(dispatch)=>{
    try {
        const {data}=await api.verifyToken(authData)
        alert(data)
        navigate('/Auth')
    } catch (error) {
        console.log(error)
    }
}