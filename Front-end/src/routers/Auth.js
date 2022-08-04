import {Routes, Route} from 'react-router-dom'
import Login from '../components/Login'
import Registrar from '../components/Registrar'
export const Auth = ({Log, Admin, LoggedUser, idUser}) => {
  return(
    <div>
        <Routes>
          <Route path='/Login' element={<Login Log={Log} Admin={Admin} idUser={idUser} LoggedUser={LoggedUser} />}/>
          <Route path='/registrarse' element={<Registrar/>}/>

        </Routes>

    </div>
  )
}