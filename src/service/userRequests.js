import axios from "axios";
import MAIN_URL from "./apiConfig";

export const loginUserAPI = async (data) => {
  try {
    const res = await axios.post(`${MAIN_URL}/Login/CheckUserWebLogin`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//on submit post mehtod for save user details
export const saveUser = async (data) => {
  try {
    const res = await axios.post(`${MAIN_URL}/User/SaveUser`, data);
    return res.data;
  } 
  catch (error) {
    console.log(error);
    throw error;
  }
};


export const getUserList = async (data)=>{
    try {
        const res = await axios.get(`${MAIN_URL}/User/GetUserlist`);
        return res.data
    }catch(error){
        console.log(error)
        throw error;
    }
}

export const getAmenites =async (data)=>{
  try{
      const res = await axios .get(`${MAIN_URL}/Amenites/GetAmeniteslist`);
      return res.data
  }
  catch(error){
      console.log(error);
  }
}

export const SaveUser = async (data) => {
     
    try {
        const res = await axios.post(`${MAIN_URL}/User/SaveUser`, data );
        return res.data
    } catch (error) {
        console.log(error);
        throw error;
    }
};
