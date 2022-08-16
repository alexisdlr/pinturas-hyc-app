import { useEffect, useState } from 'react';
import { peticionGet } from '../services/get';

export const useVentas = () => {
  const baseUrl = 'https://pinturas-hyc.000webhostapp.com/Backend/ventas.php'
  const [ventas, setVentas ]=useState([])


  useEffect(() => {
    peticionGet(baseUrl, setVentas) 
  }, [])
  return{ventas}
 }