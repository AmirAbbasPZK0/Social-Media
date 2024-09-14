import { useState } from "react";
import axios from 'axios'

const BASE_URL = "http://localhost:8000"

const useAsync = (innerUrl , method , hasAuthorization = null ) => {
    
    const [data , setData] = useState([])
    const [loading , setLoading] = useState(false)
    
    const run = (body = null) => {
        setLoading(true)
        switch(method){
            case "GET":
                if(hasAuthorization){
                    return axios.get(`${BASE_URL}/${innerUrl}` , {
                        headers: {
                            'Authorization': `token ${hasAuthorization}`
                        }
                    }).then(res => {
                        setData(res)
                        setLoading(false)
                    })
                }else{
                    return axios.get(`${BASE_URL}/${innerUrl}`).then(res => {
                        setData(res)
                        setLoading(false)
                    })
                }
            case "POST":
                return new Promise((resolve , reject) => {
                    axios({
                        method,
                        url : `${BASE_URL}/${innerUrl}`,
                        data : body
                    }).then(res => {
                        resolve(res)
                        setLoading(false)
                    }).catch(err => {
                        reject(err)
                        setLoading(false)
                    })
                })
            case "PUT":
                return new Promise((resolve , reject) => {
                    axios({
                        method,
                        url : `${BASE_URL}/${innerUrl}`,
                        data : body
                    }).then(res => {
                        resolve(res)
                        setLoading(false)
                    }).catch(err => {
                        reject(err)
                        setLoading(false)
                    })
                })
            default:
                return false
        }
    }

    return {data , loading , run}

}
 
export default useAsync;