//
import axios from "axios"


export const http_handler=async (url,method="GET",body=null,headers)=>{
    let data=null
    switch(method){
        case "GET":
            data=await axios.get(url)
            break;
        case "POST":
            data=await axios.post(url,body)
            break;
    }
    return data;
    
}