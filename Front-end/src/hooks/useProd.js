import { useEffect, useState } from "react"
import { peticionGet } from "../services/get"
export const useProd = () => {
  const baseUrl2 = 'http://localhost/pinturas-hyc2/Backend/productos.php'
  const [prod, setProd ]=useState([])

  useEffect (() => {
    peticionGet(baseUrl2, setProd) 
  },[])
  return {prod}
}