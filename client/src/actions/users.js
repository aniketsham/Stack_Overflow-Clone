import * as api from '../api'
import { setCurrentUser } from './currentUser.js';

export const fetchAllUsers = () => async (dispatch) => {
    try {
      const { data } = await api.fetchAllUsers();
      dispatch({ type: "FETCH_USERS", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const updateProfile=(id,updateData)=>async(dispatch)=>{
  try{
    const {data}=await api.updateProfile(id,updateData)
    dispatch({type:"UPDATE_CURRENT_USER",payload:data});
  }
  catch(error){
    console.log(error);
  }
}

export const setSubsDetails=(id,subsValue,navigate)=>async(dispatch)=>{
  try {
    const {data}=await api.setSubsDetails(id,subsValue)
    dispatch({type:'AUTH',data})
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))))
    alert(data.message.message)
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}