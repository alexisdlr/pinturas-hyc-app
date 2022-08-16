import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Title from './Title';

const Registrar = () => {

  const baseUrl = 'http://localhost/pinturas-hyc2/Backend/registrar.php'
  const [data, setData]=useState([]);

  const [values, setValues] = useState({
    nombre: '',
    usuario:'',
    apellidos: '',
    clave: '',
   
  })


  const handleChange = (e) => {
    setValues({  
      ...values, 
      [e.target.name]: e.target.value
    })
    console.log(values)
  
  }
  
  const peticionPost=async()=>{
    var f = new FormData();
    f.append("nombre", values.nombre);
    f.append("usuario", values.usuario);
    f.append("clave", values.clave);
    f.append("apellidos", values.apellidos);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
    }).catch(error=>{
      console.log(error);
    })
  }
  return(
    <>
    <div className='container-registrar'>
    <form className="form">
        <Title isHeading={false} text='Registrarse' />
        <input type="text" name="nombre" placeholder="Ingrese su nombre  " 
        value={values.nombre}
        onChange={handleChange}/>
          <input type="text" name="apellidos" placeholder="Ingrese sus apellidos  " 
        value={values.apellidos}
        onChange={handleChange}/>
        <input type='email' name='usuario' placeholder="Ingresa un correo"
        value={values.usuario}
        onChange={handleChange}  />
        <input type="password" name="clave" placeholder="Ingresa una contraseña"
        value={values.clave}
        onChange={handleChange}
        />
        <div className="registrar">
            <p>Ya tienes una cuenta? <Link to='/auth/Login'>Inicia Sesion.</Link></p>
            <button type="submit" onClick={() => peticionPost()}>Registrarse</button> 
        </div>
  </form>
    </div>
    </>
    
  )
}
export default Registrar