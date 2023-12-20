import axios from "axios";
import MAIN_URL from "./apiConfig";
 
//this get request for city list
export const getCityList = async (params) => {
    try {
        const res = await axios.get(`${MAIN_URL}/Cities/GetCitiesList`, {
            params: params,

        });
        return res?.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAppartmentsList = async (params) =>{
    try{
      const res = await axios .get(`${MAIN_URL}/Apartment/GetApartmentlist_CityWise`, {
        params: params,

    });
      return res.data
    }
    catch(error){
      console.log(error);
    }
  }