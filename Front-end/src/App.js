import React from 'react'
// import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
// import Login from './components/Login'
import './normalize.css'
import './sass/style.scss'
// import Registrar from './components/Registrar'
// import { Producto } from './Pages/Producto'
import { PrincipalRouter } from './routers/PrincipalRouter'


// const Movs = React.lazy(() => import("./Pages/Movs"))
// const Colores = React.lazy(() => import("./Pages/Colores"))
// const ProductosAdmin = React.lazy(() => import("./Pages/ProductosAdmin"))
// const PublicHomePage = React.lazy(() => import("./Pages/PublicHomePage"))
// const AdminPage = React.lazy(()=> import("./Pages/AdminPage"))
// const ProductosPublicPage =  React.lazy(()=> import("./Pages/ProductosPublicPage"))
// const Reportes = React.lazy(() => import("./Pages/Reportes"))
function App() {
 
  return (
    <div className='App'>
        <PrincipalRouter />
      {/* <Routes>
        <Route exact path='registrarse' element={<Registrar/>}/>
        <Route exact path='home' element={
              <React.Suspense fallback={
              <>...</>}>
                <PublicHomePage />
              </React.Suspense>
            } /> 
        <Route path='productos' element={
        <React.Suspense fallback={<>...</>}>
                <ProductosPublicPage />
              </React.Suspense>}
          />   
        
        <Route path='admin' element={
        <React.Suspense fallback={<>...</>}>
                <AdminPage />
              </React.Suspense>}
        >
          <Route index element={
        <React.Suspense fallback={<>...</>}>
                <ProductosAdmin />
              </React.Suspense>}
        />
         <Route path='/admin/:productoId' element={
        <React.Suspense fallback={<>...</>}>
                <Producto />
              </React.Suspense>}
        />

        <Route path='coloresAdmin' element={
        <React.Suspense fallback={<>...</>}>
                <Colores />
              </React.Suspense>}
        />

        <Route path='movimientosAdmin' element={
        <React.Suspense fallback={<>...</>}>
                <Movs />
          </React.Suspense>}
        />
        <Route path='reportes' element={
        <React.Suspense fallback={<>... cargando</>}>
                <Reportes />
          </React.Suspense>}
        />

    </Route>

        <Route path='/' element={<Login/>} />
        <Route path='*' element={<Navigate replace to='admin' />} />

      </Routes> */}
      
    </div>

  );
}

export default App
