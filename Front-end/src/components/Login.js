import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Title from './Title';

const URL = 'https://pinturas-hyc.000webhostapp.com/Backend/Backend/Login.php'

const fetchApi = async (url, data) => {
  const req = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const res = await req.json()
  return res
}

const Login = ({Log, Admin, LoggedUser, idUser}) => {
  const [error, setError] = useState(false)
  const refUsuario = useRef(null)
  const refClave = useRef(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    const user = {
      usuario : refUsuario.current.value,
      clave : refClave.current.value
    }
    const res = await fetchApi(URL, user)
    Log(res.conectado)
    Admin(res.etiquetaTipoUsuario)
    setError(res.error)
    LoggedUser(res)
    idUser(res.id)
  }

  return(
    <>
     <div className='container-logo container-logo-login '>
        <Link to='/' style={{textDecoration: 'none'}}> H&amp;C </Link>
      </div>
      <div className='container-registrar'>
     
     <form  className="form">
         <Title isHeading={false} text='Iniciar Sesion' />
 
         <input 
         type="email" 
         name="usuario" 
         placeholder="Ingresa un email" 
        
         ref={refUsuario}
         />
         <input 
         type="password" 
         name="clave" 
         placeholder="Ingresa una contraseña"
         ref={refClave}
 
         />
        {error ? <div className='alert alert-danger'>{error}</div>: ''} 
         <div className="registrar">
             <button onClick={handleLogin}>Inicia Sesion</button> 
             <p>Aun no tienes una cuenta? <Link to='/auth/registrarse'>Registrate.</Link></p>
         </div>
   </form>
     </div>
    </>
   
  )
}
export default Login