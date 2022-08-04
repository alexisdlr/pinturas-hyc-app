import {Routes, Route} from 'react-router-dom'
import Movs from '../Pages/admin/Movs'
import Colores from '../Pages/admin/Colores'
import Reportes from '../Pages/admin/Reportes'
import { Producto } from '../Pages/admin/Producto'
import AdminPage from '../Pages/admin/AdminPage'
import ProductosAdmin from '../Pages/admin/ProductosAdmin'
import { UserProfile } from '../Pages/UserProfile'
import { CreateUser } from '../Pages/admin/CreateUser'

export const AdminRouter = ({isLogged, LogOut, User, idUser}) => {

  return(
    <Routes>
      <Route path='admin' element={<AdminPage isLogged={isLogged} LogOut={LogOut} user={User} />}
        >
          <Route index element={<ProductosAdmin />}
        />
         <Route path='/admin/:productoId' element={<Producto />}
        />

        <Route exact path='/admin/coloresAdmin' element={<Colores />}
        />

        <Route path='/admin/movimientosAdmin' element={<Movs idUser={idUser} />}
        />
        
        <Route path='/admin/reportes' element={
                <Reportes />}
        />
          <Route path="/admin/perfil-usuario" element={
            <UserProfile User={User} />
          } />
             <Route path="/admin/crear-usuario" element={
              <CreateUser />} />

    </Route>
    </Routes>

  )
}