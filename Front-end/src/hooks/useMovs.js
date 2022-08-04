import { useEffect, useState } from "react"
import { peticionGet } from "../services/get"
export const useMovs = () => {
  const baseUrl = 'http://localhost/pinturas-hyc2/Backend/movimientos.php'

  const [movs, setMovs]=useState([])

  useEffect(() => {
    peticionGet(baseUrl, setMovs)
  },[])
  return{movs}
}