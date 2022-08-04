import React from 'react'
import { Link } from 'react-router-dom';
import { Icon } from './Icon';


const NavBar = ({hrefToProducts, hrefToAbout, linkText, isAdminPage, isProductPage, isLogged, LogOut}) => {
return(
  <nav className='nav'>
    <div className='container-logo flex-grow-1'>
      <p>H&amp;C</p>
    </div>
    <ul className='nav-ul flex-grow-1'>
      <li className='nav-ul_li'>
        {
        isAdminPage ? <Link className='link'to={hrefToProducts} >
        Productos
        </Link> : isProductPage ? <Link to='/home' className='link'>Home</Link> : <Link to='/home/productos' className='link'>Productos</Link>}
      </li>
      <li className='nav-ul_li'>
      {isAdminPage ? <Link to={hrefToAbout} className='link'>
      {linkText}          
      </Link>: <a href='#about' className='link'> ¿Quienes somos?</a>}
      </li>
       <li className='nav-ul_li'>
       {
       isAdminPage ? <Link to='movimientosAdmin' className='link'> Movimientos </Link> 
       : <a href='#contacto' className='link'> Contacto</a>
       }
      </li>
      {
        isAdminPage ? <li className='nav-ul_li' >
          <Link to='reportes' className='link'> Reportes </Link>
        </li> : ''
      }
   
     
    
    </ul>
    {
        isProductPage ? '' : <div className=' flex-grow-1'  >
        <Link className='link-log' to='/' replace={true} onClick={LogOut} >{isLogged ? 'Cerrar Sesion' : 'Iniciar Sesion'}</Link>
      </div>
      }
    {isProductPage ? 
    <div className='container-icons'>
      <div className='container-buscar'>
        <input type='text' placeholder='Buscar' className='input'/>
        <Icon
        classIcon='fa-solid fa-magnifying-glass'
        classBtn='icon'
        ></Icon>
      </div>  
     
    </div> : <div></div>}
    
  </nav>
);

}
export default NavBar

