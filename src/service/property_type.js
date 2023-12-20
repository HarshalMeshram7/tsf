import axios from "axios";
import MAIN_URL from "./apiConfig";

export const getBuildingType = async (params)=>{
try{
    const res = await axios.get(`${MAIN_URL}/BuildingType/GetBuildingTypeList`,{params:params});
    return res?.data;
}
catch(error){
    console.log(error);
}
}

export const getProperty_Types = async (params)=>{
    try {
        const res = await axios.get(`${MAIN_URL}/PropertyTypes/GetPropertyTypesList`,{params:params})
        return res?.data;
    }
    catch(error){
        console.log(error)
    }
}
