import axios from "axios";
import MAIN_URL from "./apiConfig";
import { red } from "@mui/material/colors";
// import { log } from "console";
// import { log } from "console";

export const getPropertyList = async (params) => {
  try {
    const res = await axios.get(`${MAIN_URL}/Re_Properties/GetRe_PropertiesList`, {
      params: params,
    });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPropertyListByID = async ({ id }) => {
  try {
    const res = await axios.post(`${MAIN_URL}/Re_Properties/GetRe_PropertiesDetails`, { id: id });
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
export const saveProperty = async (data) => {
  try {
    const res = await axios.post(`${MAIN_URL}/Re_Properties/SaveRe_Properties`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const saveImageApi = async (data) => {
  if (!data) {
    return;
  }
  try {
    const res = await axios.post(`${MAIN_URL}/Propertyimg/SavePropertyimg`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getImg = async (params) => {
  try {
    const res = await axios.get(`${MAIN_URL}/Propertyimg/GetImageListByPropertyID`,{
      params: params,
    });
    return res.data
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//admin Actions
export const getAdminActions = async (params)=>{
  try{
    const res = await axios.get(`${MAIN_URL}GetPropertyAdminActivityByPropertyID`,{
      params: params,
    });
    return res?.data;
  }
  catch(error){
    console.log(error);
    throw error;
  }
}