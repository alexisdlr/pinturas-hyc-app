import { Link } from "react-router-dom"

export function DropDownCompany({open, isAdmin}) {
  function DropDownItems({children, isAdmin}) {
      return (
          <span>
            <Link  to={isAdmin ? 'crear-usuario': 'perfil-usuario'} className='dropDownItem'>
                {children}           
            </Link>
          </span>
      )

  }
  return(
      <div
      className={ open ? 'dropDown open' : 'dropDonw'}
    
      >
        
          {
            isAdmin ? <DropDownItems isAdmin={isAdmin}
          >Crear usuario.
          </DropDownItems> : ''
          }
           <DropDownItems
          >Ver Perfil
          </DropDownItems>
      
       
          
      </div>
  )
}

export function NavItem ({open, setOPen, text, children}) {
  return(
      <li className='navigation__ul-li'>
      <span 
          style={{cursor: 'pointer'}} className='link'
          onClick={() => setOPen(!open)}
          >
          <i className="fa-solid fa-user"></i>
          {text}
          
     
      </span>

      {open && children}
  </li>
  
  )
}