import { useEffect, useState } from 'react';
import { peticionGet } from '../services/get';

export const useVentas = () => {
  const baseUrl = 'http://localhost/pinturas-hyc2/Backend/ventas.php'
  const [ventas, setVentas ]=useState([])


  useEffect(() => {
    peticionGet(baseUrl, setVentas) 
  }, [])
  return{ventas}
 }