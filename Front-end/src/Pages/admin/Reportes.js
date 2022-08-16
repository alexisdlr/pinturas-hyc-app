import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'reactstrap';
import Title from '../../components/Title';
import { useMovs } from '../../hooks/useMovs';
import { useProd } from '../../hooks/useProd';
import { useVentas } from '../../hooks/useVentas';
import { useVentasTotales } from '../../hooks/useVentasTotales';
import { useTotal } from '../../hooks/useTotal';
import {  useRef, useState } from "react"


const Reportes = () => {
  const {movs} = useMovs()
  const {ventas} = useVentas()
  const {prod} = useProd()
  const {ventasT} = useVentasTotales()
  const {total} = useTotal()
  const [fecha, setFecha] = useState(null)

  let date = new Date()

  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()


  const inputRef = useRef(null)

  const handleValidation = () => {
    const fechaAct = inputRef.current.value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    setFecha(fechaAct)
  }

  const handleChange = (e) => {
    console.log(fecha)
    let fechaAct
    const {value } = e.target
   if(value === 'Hoy') {
     fechaAct = `${day}/0${month + 1}/${year}`
    setFecha(fechaAct)
    console.log('hoy',fechaAct)
   } else if (value === 'Ayer') {
      if(day < 10) {
         fechaAct = `0${day -1}/${month + 1}/${year}`
         
      } else {
         fechaAct = `${day-1}/${month + 1}/${year}`
         console.log(fechaAct, 'Esta es la de ayer')
      }
    setFecha(fechaAct)
    console.log('Ayer', fecha)
   } else if (value === '2dias') {
    const fechaAct = `${day-2}/0${month + 1}/${year}`
    setFecha(fechaAct)
    console.log('Antier',fechaAct)
   }

    console.log(fecha, e.target.value)
    
  }
  console.log(prod.map(item =>item.stock))

 
  return (
    <div style={{height: '100vh'}}>
     
      <div className='container fluid d-flex justify-content-center mb-4 margin-top' >
        <Title classList='title' text='Reportes' isHeading={true}/>
      </div>
    
      <div className='d-flex justify-content-center mb-4'>
        <Title classList='text-sm-center text-wrap fs-4 w-50' isHeading={false} 
        text='En esta sección se muestran los reportes de las entradas/salidas de su producto.'  />
      </div>
      <div className='d-flex gap-2 align-items-center justify-content-center'>
          <div>
            <p className='m-0'>Filtro por fecha: </p>
          </div>
        <div>
        <select className="form-control" onBlur={handleChange} >
            <option disabled selected>
              Seleccione una fecha
            </option>
            <option value='Hoy'  >
              Hoy
            </option>
            <option value='Ayer'>
              Ayer
            </option>
            <option value='2dias'>
              Hace 2 dias
            </option>
          </select>
        </div>
        <div>
        <p className='m-0'>O seleccione una fecha: </p> 
        </div>
        
        <input type="date"
        
        ref={inputRef} 
        className="input-fechas" 
        onChange={handleValidation}/>        </div>
       
      
      
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
        {
        movs.filter(item => item.fecha === fecha).length === 0 ? <tr>
          <td>No hay resultados</td>
          </tr>
        : movs
        .filter(item => item.fecha === fecha)
        .map(mov=>(
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
      <div className='d-flex justify-content-center mb-4'>
        <Title classList='text-sm-center text-wrap fs-4 w-50' isHeading={false} 
        text='Proyecciones'  />
      </div>
      <div className='d-flex flex-column align-items-center justify-content-center'>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Cantidad</th>

                <th>Total Estimado</th>
              </tr>
              
            </thead>
          <tbody>

              {
              ventas ? 
              ventas.map(mov=>(
                <tr key={mov.id}>
                  <td>{mov.id}</td>
                  <td>{mov.nombre}</td>
                  <td>{mov.cantidad}</td>
                  <td style={{color: 'green'}}>${mov.total_estimado}</td>
                 
            
                </tr>
              )): <td>No hay resultados</td>}
            </tbody> 
      
          </Table>
       <div>
        <Title isHeading={false} text='Total vendidos' classList='mt-5 mb-5' />
       </div>
    
       <Table>
        <thead>
        <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Cantidad (Por producto)</th>
              <th>Total Vendido (Por producto)</th>
        </tr>
            
        </thead>
        <tbody>
        {
        ventasT
          .map(mov=>(
            <tr key={mov}>
              <td >{mov.id}</td>
              <td >{mov.producto}</td>
              <td >{mov.cantidad}</td>
              <td style={{color: 'green'}}>${mov.venta}</td>
            </tr>
       ))}
        </tbody>
       </Table>
        <div>
        <Title isHeading={true} text='Total ganancias' classList='mt-5'/>
        <p style={{color: 'green'}} className='fs-3'>${total ? total.map(item => item.TOTAL): 'Aun no hay ganancias'}</p>
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
                <th>Stock Min</th>
                <th>Color</th>

                


              </tr>
            </thead>
          <tbody>
              {
              prod
              .filter(({stock, stockMin}) => stock <= stockMin)
              .map(item=>(
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>{item.tipo}</td>
                  <td>{item.marca}</td>
                  <td className='text-danger'>{item.stock === null ? '0': item.stock}</td>
                  <td >{item.stockMin}</td>
                  <td>
                  <img src={"data:image/+item.extension+;base64,"+item.imagen} className="img" 
                alt="imagen"/>
                   </td>
          
                </tr>
              ))}


            </tbody> 
          </Table>
       </div>
       
    </div>
    
      )
    }
    export default Reportes