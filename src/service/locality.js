import axios from "axios";
import MAIN_URL from "./apiConfig";
 
// for localites
export const getLocalitiesList = async (params) =>
 {
    try {
        const res = await axios.get(`${MAIN_URL}/Localities/GetLocalitiesByCity`, {params: params});
        return res?.data;
    } 
    catch (error)
    {
        console.log(error);
    }
};
