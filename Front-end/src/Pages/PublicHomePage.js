import Banner from "../components/Banner";
import { Icon } from '../components/Icon';
import Card from "../components/Card";
import Footer from "../components/Footer";
import Contact from "../components/Contacto";
import NavBar from "../components/NavBar";
import Title from "../components/Title";
import { NavItem } from "../components/Dropdown";
import { DropDownCompany } from "../components/Dropdown";
import { useState } from "react";
// import { Link } from "react-router-dom";

const PublicHomePage = ({isLogged, LogOut, User}) => {
  const [open, setOPen] = useState(false);
  let isAdmin = false;
  if(!User.etiquetaTipoUsuario === 'Administrador') {
    isAdmin=false
  }
  return(
    <>
    <header>
    <NavBar
      isAdminPage={false}
      isLogged={isLogged}
      LogOut={LogOut}
      />
       <div className="user-item">
      <NavItem
      text='Perfil'
      open={open}
      setOPen={setOPen}
        >
        <DropDownCompany open={open} isAdmin={isAdmin}>
           
        </DropDownCompany>
      </NavItem>
      </div>
    </header>   
    <div className="tag">
        <p className="text">Somos tu mejor opcion, compra pintura de calidad con nosotros !</p>
    </div>
      <main>
        <Banner
        title='PINTURAS H&amp;C'
        className='banner'
        isSection={false} ></Banner>

    <div className="tag-2">
      <div className="container-icon">
        <Icon 
        classBtn='icon-tag2'
        classIcon='fa-solid fa-cube'
        ></Icon>
        <p>Servicio de envios</p>
      </div>
      <div className="container-icon">
        <Icon
        classBtn='icon-tag2 mt-3'
        classIcon='fa-solid fa-truck-fast'
        ></Icon>
        <p>Entrega a domicilio</p>
      </div>
      <div className="container-icon">
        <Icon 
        classBtn='icon-tag2'
        classIcon='fa-solid fa-ticket'
        ></Icon>
        <p>Ofertas exclusivas</p>
      </div>
    </div>
    <section className="d-flex justify-content-center about" id="about">
    <Banner
        title='¿Quienes Somos?'
        className='banner about'
        isSection={true} />
    </section>
    <section className="container-all-section-cards">
      <div className="backdrop">
      <div className="d-flex justify-content-center align-items-center pt-5 pb-5 flex-column">
        <Title isHeading={false} classList='subtitle mb-5' text='¿Qué espacio vas a cambiar?' />
        <Card />
      </div>
      </div>
    </section>
    <div className="tag m-0">
        <p className="m-0">Pinturas a los mejores precios, agenda tu pedido !</p>
    </div>
    <section>
      <Contact/>
    </section>
      </main>
      <Footer/>
      </>
  )
}
export default PublicHomePage