import { Outlet } from "react-router-dom"
import { NavItem } from "../../components/Dropdown"
import { DropDownCompany } from "../../components/Dropdown"
import NavBar from "../../components/NavBar"
import Title from "../../components/Title"
import { useState } from "react"


const AdminPage = ({isLogged, LogOut, user}) => {
  const [open, setOPen] = useState(false);
  let isAdmin = false;
  if(user.etiquetaTipoUsuario === 'Administrador') {
    isAdmin=true
  }
  return(
    <div>
      <NavBar
      hrefToProducts='/app/admin' 
      hrefToAbout='coloresAdmin'
      linkText='Colores' 
      isLogged={isLogged}
      isAdminPage={true} 
      LogOut={LogOut}
      
      />
      <div className="user-item">
      <NavItem
      text='Perfil'
      open={open}
      setOPen={setOPen}
        >
        <DropDownCompany open={open} isAdmin={isAdmin} setOPen={setOPen} >
           
        </DropDownCompany>
      </NavItem>
      </div>
      <div className="banner-admin">
        <Title isHeading={true} text='BIENVENIDO ADMINISTRADOR' classList='fs-1'/>
        <div>
          <h3>
            Pintura Vinilica Acrilica Lavable
          </h3>
        </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099fd" fillOpacity="1" d="M0,256L1440,96L1440,320L0,320Z"></path></svg>
      </div>
        <Outlet/>
    </div>
  )
}

export default AdminPage