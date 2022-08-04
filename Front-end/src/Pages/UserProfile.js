import { Link } from 'react-router-dom'
import avatar from '../images/avatar.png'
export const UserProfile = ({User, isAdmin}) =>  {
  console.log(User)
 return(
  <div>
   
     <div style={{height: '100vh'}} className="user-info d-flex flex-column justify-content-center align-items-center">
    {isAdmin === 'cliente' ? <div className='mb-5'>
      <Link to='/home' className='link-log link-home'>
        Volver
      </Link>
     </div> : ''}
    
     <h1 className='mb-5'>
       Informacion del usuario: 
     </h1>
       <img src={avatar} alt='user-image' />
       <h2 className='mt-5'>Nombre: {User.nombre} {User.apellidos}</h2>
       <h3>
         Usuario: {User.usuario}
       </h3>
     </div>
  
   
   
  </div>
 )
}