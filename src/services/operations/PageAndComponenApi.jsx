import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';

export const  getFullcatalogData= async(categoryId) => {
    
    let result=[];
    try {
        const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId,});

        if(!response?.data?.success){
            throw new Error("Could not fetch categories data")
        }
        result=response?.data;
        
    } catch (error) {
        console.log(" CATALOG PAGE  DATA API ERROR...",error)
        result=error.response?.data;        
    }
    
    return result
}

