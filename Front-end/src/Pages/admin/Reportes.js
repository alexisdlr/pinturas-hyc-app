import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'reactstrap';
import Title from '../../components/Title';
import { useMovs } from '../../hooks/useMovs';
import { useProd } from '../../hooks/useProd';
import { useVentas } from '../../hooks/useVentas';
import { useVentasTotales } from '../../hooks/useVentasTotales';
import { useTotal } from '../../hooks/useTotal';
const Reportes = () => {
  const {movs} = useMovs()
  const {ventas} = useVentas()
  const {prod} = useProd()
  const {ventasT} = useVentasTotales()
  const {total} = useTotal()


   
  return (
    <div style={{height: '100vh'}}>
     
      <div className='container fluid d-flex justify-content-center mb-4 margin-top' >
        <Title classList='title' text='Reportes' isHeading={true}/>
      
      </div>
    
      <div className='d-flex justify-content-center mb-4'>
        <Title classList='text-sm-center text-wrap fs-4 w-50' isHeading={false} 
        text='En esta seccion se muestran los reportes de las entradas/salidas de su producto.'  />
      </div>
      <div className='d-flex justify-content-center'>

    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tipo (entrada/salida)</th>
          <th>Fecha</th>
          <th>Cantidad</th>
          <th>Usuario</th>
          <th>Producto</th>


        </tr>
      </thead>
  <tbody>
        {movs.map(mov=>(
          <tr key={mov.id}>
            <td>{mov.id}</td>
            <td>{mov.tipo}</td>
            <td>{mov.fecha}</td>
            <td>{mov.cantidad}</td>
            <td>{mov.usuario}</td>
            <td>{mov.producto}</td>
       
          </tr>
        ))}


          </tbody> 
        </Table>
      </div>

       <div className='container fluid d-flex justify-content-center mb-4 margin-top'>
        <Title classList='title' text='Ventas' isHeading={true}/>
      </div>
    
      <div className='d-flex justify-content-center mb-4'>
        <Title classList='text-sm-center text-wrap fs-4 w-50' isHeading={false} 
        text='En esta seccion se muestra el total de ventas.'  />
      </div>
      <div className='d-flex flex-column align-items-center justify-content-center'>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Total Estimado</th>
              </tr>
              
            </thead>
          <tbody>
              {ventas.map(mov=>(
                <tr key={mov.id}>
                  <td>{mov.id}</td>
                  <td>{mov.producto}</td>
                  <td style={{color: 'green'}}>${mov.prodvendido}</td>
                 
            
                </tr>
              ))}
            </tbody> 
      
          </Table>
       <div>
        <Title isHeading={false} text='Total vendidos' classList='mt-5' />
       </div>
       <Table>
        <thead>
        <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Total Vendido (Por producto)</th>
        </tr>
            
        </thead>
        <tbody>
        {ventasT.map(mov=>(
            <tr key={mov}>
              <td >{mov.id}</td>
              <td >{mov.producto}</td>
              <td style={{color: 'green'}}>${mov.venta}</td>
            </tr>
       ))}
        </tbody>
       </Table>
        <div>
        <Title isHeading={true} text='Total ganancias' classList='mt-5'/>
        <p style={{color: 'green'}} className='fs-3'>${total.map(item => item.Total)}</p>
       </div>
      
       </div>
       <div className='container fluid d-flex justify-content-center mb-4 margin-top' >
        <Title classList='title' text='Productos escasos' isHeading={true}/>
      </div>
    
      <div className='d-flex justify-content-center mb-4'>
        <Title classList='text-sm-center text-wrap fs-4 w-50' isHeading={false} 
        text='En esta seccion se muestran todos los productos que tienen menos del stock minimo.'  />
      </div>
      <div className='d-flex justify-content-center'>
          <Table>
            <thead>
              <tr className=''>
                <th>ID</th>
                <th>nombre</th>
                <th>tipo</th>
                <th>marca</th>
                <th>Stock</th>
                <th>Color</th>

                


              </tr>
            </thead>
          <tbody>
              {prod
              .filter(({stock, stockMin}) => stock <= stockMin)
              .map(item=>(
                <tr key={item.nombre}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>{item.tipo}</td>
                  <td>{item.marca}</td>
                  <td className='text-danger'>{item.stock}</td>
                  <td><img className="img" src={item.imagen} alt='img color'/> </td>
          
                </tr>
              ))}


            </tbody> 
          </Table>
       </div>
       
    </div>
    
      )
    }
    export default Reportes