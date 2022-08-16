import { useState } from "react"
import axios from "axios"
export const CreateUser = () => {
  const baseUrl = 'https://pinturas-hyc.000webhostapp.com/Backend/registrar.php'

  const [values, setValues] = useState({
    nombre: '',
    usuario:'',
    apellidos: '',
    clave: '',
    idTipoUsuario: '1'

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
    f.append("idTipoUsuario", values.idTipoUsuario);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      console.log(response)   
 }).catch(error=>{
      console.log(error);
    })
  }
  return(
    <div className="user-info d-flex flex-column justify-content-center align-items-center">
      <h1>
        Crear usuario
      </h1>
      <p className="mb-5">
        El usuario creado tendrá privilegios de Administrador
      </p>
      <div className="form-group create-user-form">
      <div className="d-flex gap-5 justify-content-center mb-5">
        <input type="text" name="nombre" placeholder="Ingrese su nombre  " 
        value={values.nombre}
        onChange={handleChange}/>
          <input type="text" name="apellidos" placeholder="Ingrese sus apellidos  " 
        value={values.apellidos}
        onChange={handleChange}/>
        </div>
        <div className="d-flex gap-5 justify-content-center mb-3">
        <input type='email' name='usuario' placeholder="Ingresa un correo"
        value={values.usuario}
        onChange={handleChange}  />
        <input type="password" name="clave" placeholder="Ingresa una contraseña"
        value={values.clave}
        onChange={handleChange}
        />
      </div>

         <div className="registrar mt-5">
            <button type="submit" onClick={() => peticionPost()}>Crear usuario</button> 
        </div>
      </div>
    </div>
  )
}