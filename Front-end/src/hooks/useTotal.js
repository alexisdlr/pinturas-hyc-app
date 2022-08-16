import { useEffect, useState } from "react"
import { peticionGet } from "../services/get"
export const useTotal = () => {
  const url = 'https://pinturas-hyc.000webhostapp.com/Backend/total.php'
  const [total, setTotal ]=useState([])
  useEffect(()=>{
    peticionGet(url, setTotal) 
 },[])
 return {total}

}