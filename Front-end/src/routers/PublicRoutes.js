import React from "react";
import { Navigate } from "react-router-dom";


export const PublicRoutes = ({children, isLogged, isAdmin}) => {
  return (isLogged  === true && isAdmin === 'Administrador') ? <Navigate to='/app/admin' /> :
   (isLogged === true && isAdmin === 'cliente') ?  <Navigate to='/home' /> : (isLogged === false ) ?  children : <Navigate to='/home' />
}