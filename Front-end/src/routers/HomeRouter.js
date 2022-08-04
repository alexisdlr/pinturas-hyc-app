import React from "react";
import { Navigate } from "react-router-dom";


export const HomeRouter = ({children, isLogged, isAdmin}) => {
  return (isLogged === true && isAdmin === 'cliente') ?  children : (isLogged === false ) ? <Navigate to='/auth/Login' />  : children 
}