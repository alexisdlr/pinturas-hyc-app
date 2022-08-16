import { useEffect, useState } from "react"
import { peticionGet } from "../services/get"
export const useMovs = () => {
  const baseUrl = 'https://pinturas-hyc.000webhostapp.com/Backend/movimientos.php'

  const [movs, setMovs]=useState([])

  useEffect(() => {
    peticionGet(baseUrl, setMovs)
  },[])
  return{movs}
}