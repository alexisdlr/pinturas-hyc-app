import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Auth } from "./Auth"
import { AdminRouter } from "./AdminRouter"
import { PrivateRoutes } from "./PrivateRoutes"
import { PublicRoutes } from "./PublicRoutes"
import PublicHomePage from "../Pages/PublicHomePage"
import { useState } from "react"
import ProductosPublicPage from "../Pages/ProductosPublicPage"
import { Home } from "../Pages/Home"
import { HomeRouter } from "./HomeRouter"
import { UserProfile } from "../Pages/UserProfile"
export const PrincipalRouter = () => {
  const [isLogged, setIsLogged] = useState(false) 
  const [isAdmin, setIsAdmin] = useState('') 
  const [user, setUser] = useState({
    apellidos: '',
    conectado: '',
    etiquetaTipoUsuario: '',
    id: '',
    idTipoUsuario: '',
    nombre: '',
    usuario: ''
  })
  const [idUser, setIdUser] = useState(null);

  const LoggedUser = (estado) => {
    setUser(estado)
  }
  const UseIdUser = (estado) => {
    setIdUser(estado)
  }
  const Log = (estado) => {
    setIsLogged(estado)
  }
  const LogOut = () => {
    setIsLogged(false)
  }
  const Admin = (estado) => {
    setIsAdmin(estado)
  }

  return(
      <BrowserRouter>
        <Routes>
        <Route index path="/" element={
          <Home />
          }
          />
          <Route path="/home" element={
            <HomeRouter isLogged={isLogged} isAdmin={isAdmin}>
                    <PublicHomePage isLogged={isLogged} LogOut={LogOut} User={user}/>
            </HomeRouter>
          }
          />
           <Route path="/home/productos" element={
            <ProductosPublicPage isLogged={isLogged} LogOut={LogOut} />
          }
          />
           <Route path="/home/perfil-usuario" element={
              <UserProfile User={user} isAdmin={isAdmin} />
          }
          />
          <Route path="/auth/*" element={
            <PublicRoutes isLogged={isLogged} isAdmin={isAdmin}>
              <Auth Log={Log} Admin={Admin} LoggedUser={LoggedUser} idUser={UseIdUser} />
            </PublicRoutes>
          } />

          <Route path="/app/*" element={
            <PrivateRoutes isLogged={isLogged} isAdmin={isAdmin}>
              <AdminRouter isLogged={isLogged} LogOut={LogOut} User={user} idUser={idUser} />
            </PrivateRoutes>
          }/>
          
        </Routes>
      </BrowserRouter>
  )
}