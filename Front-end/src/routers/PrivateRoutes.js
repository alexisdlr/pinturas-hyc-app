import { Navigate } from "react-router-dom"

export const PrivateRoutes = ({isLogged, children, isAdmin}) => {
  return(
    <>
     
      {
        (isLogged === true && isAdmin === 'Administrador') ? children : <Navigate to='/auth/Login' />
      }
    </>
  )

}