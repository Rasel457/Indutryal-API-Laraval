import { useEffect } from "react";
import axios from "axios";

export default function useGet (url, callback){

    const getDashboard = async () => {
        await axios.get(url, { headers: { 'Access-Control-Allow-Origin': '*', 'Accept' : 'application/json', 'user_type':localStorage.getItem('type') } })
        .then((response)=>{callback(response.data)})
        .catch((error)=>{console.log('ERROR: '+error)});
        //callback(res.data)
    }

    useEffect(()=>{
        getDashboard();
    }, [])
}