import { useEffect, useState } from "react"
import { peticionGet } from "../services/get"
export const useVentasTotales = () => {
  const url = 'https://pinturas-hyc.000webhostapp.com/Backend/ventas_total.php'
  const [ventasT, setVentasT ]=useState([])
  useEffect(()=>{
    peticionGet(url, setVentasT) 
 },[])
 return {ventasT}
}