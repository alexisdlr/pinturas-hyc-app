import { useEffect, useState } from "react"
import { peticionGet } from "../services/get"
export const useTotal = () => {
  const url = 'http://localhost/pinturas-hyc2/Backend/total.php'
  const [total, setTotal ]=useState([])
  useEffect(()=>{
    peticionGet(url, setTotal) 
 },[])
 return {total}

}