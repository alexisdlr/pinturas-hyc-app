import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Icon } from '../../components/Icon';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap';
import Title from '../../components/Title';
import { useSearchParams } from 'react-router-dom';
import { peticionGet } from '../../services/get';
import { useProd } from '../../hooks/useProd';
import Buttonref from '../../components/Buttonref';

const Movs = ({idUser}) => {

  const baseUrl = 'https://pinturas-hyc.000webhostapp.com/Backend/movimientos.php'
  const {prod} = useProd()
  const [id, setId] = useState(null)
  const [data, setData]=useState([])
  const [disabled, setDisabled]=useState(false)
  const [prodMov, setProvMov] = useState({
    id: '',
    nombre: '',
    tipo: '',
    marca: '',
    stock: ''
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const [modalInsertar, setModalInsertar]= useState(false)
  const [mov, setMov]=useState({
    id: '',
    tipo: '',
    idUsuario: idUser,
    cantidad: '',
    idProd: ''
    
  })
  const handleChange= e =>{
    const {name, value}=e.target;

    if (value < 0 ) {
      alert('Error: Ningun campo puede ser menor o igual a 0');
      setDisabled(true)
      return
    }
    //nX%N!^gTviz?z9ar
    console.log(parseInt(value) > prodMov.map(({stock}) => stock )[0])
    console.log(parseInt(value))
    console.log(prodMov.map(({stock}) => stock )[0])
    if(mov.tipo === 'salida') {
      if(parseInt(value) > prodMov.map(({stock}) => stock )[0]) {
        alert('Error: La cantidad no puede ser mayor a la existencia');
        setDisabled(true)
        return  
      }
    }
    setDisabled(false)
    setMov((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }

  const handleFilter = (e) => {
    setSearchParams({ filter: e.target.value })
  }

  const filter = searchParams.get("filter") ?? ""


  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }


  const peticionPost=async()=>{
    if(mov.cantidad === '' || mov.cantidad <= 0 || mov.tipo === '') {
      alert('Error: La cantidad no puede estar vacia')
      return
    }
    var f = new FormData();
    f.append("tipo", mov.tipo);
    f.append("cantidad", mov.cantidad);
    f.append("idUsuario", mov.idUsuario);
    f.append("idProd", id);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
      
  }


 
   useEffect(()=>{
     peticionGet(baseUrl, setData) 
  },[])
   

  return (
    <div style={{height: '100vh'}}>
      <Buttonref href='#movs' className='link link-home absolute-jj' >
      Ver movimientos
      </Buttonref>
      <div className='container fluid d-flex justify-content-center margin-top' id='productos'>
        <Title classList='title' text='Movimientos' />
      </div>
      <div className='d-flex justify-content-center mb-4'>
        <Title classList='text-sm-center text-wrap fs-4 w-50' isHeading={false} 
        text='Seleccione un producto para agregar inventario o indicar una venta.'  />
      </div>
      <div className='d-flex justify-content-center'>
          <div className='container-buscar'>
              <input
                type="text"
                placeholder="Buscar"
                value={filter}
                onChange={handleFilter}
                className='input'
                />
              <Icon
                classIcon='fa-solid fa-magnifying-glass'
                classBtn='icon'
              />
           </div>
      </div>
         
      <div className='d-flex justify-content-center mt-5'id='movs'>
    <Table  >
      <thead>
        <tr className='bg-blue text-light'>
          <th>ID</th>
          <th>Nombre </th>
          <th>Tipo</th>
          <th>Existencia</th>
          <th>Precio</th>
          <th>Color</th>
          <th>Acciones</th>
        </tr>
      </thead>
  <tbody>
        {
        prod ?
        prod
          .filter(producto => {
            if (!filter) return true;

              return producto.nombre.toLowerCase().includes(filter.toLowerCase());
          })
        .map(producto=>(
          <tr key={producto.id}>
            <td>{producto.id}</td>
            <td>{producto.nombre}</td>
            <td>{producto.tipo}</td>
            <td>{producto.stock}</td>
            <td>{producto.precioV}</td>
            <td>
            <img src={"data:image/+item.extension+;base64,"+producto.imagen} className="img" 
                alt="imagen"/>
              </td>

          <td>
          <button className="btn btn-success" onClick={
            ()=>{
            abrirCerrarModalInsertar()
            setId(producto.id)
            peticionGet(`https://pinturas-hyc.000webhostapp.com/Backend/productos.php?id=${id}`, setProvMov) 
            console.log(prodMov)
            
          }}>Insertar Movimiento</button>
          </td>
          </tr>
        )): 'no hay datos'}


      </tbody> 
</Table>
</div>
        <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Tipo: </label>
              <br />
              <select className='form-select' name='tipo' onChange={handleChange}>
                  <option selected disabled>
                    - Seleccione un tipo -
                  </option>
                  <option value='entrada' name='entrada'>
                    entrada
                  </option>
                  <option value='salida' name='salida'>
                  salida (venta)
                  </option>
                
               
              </select>               <br />
              <label>Cantidad : </label>
              <br />
              <input type="text" className="form-control" name="cantidad" onChange={handleChange}/>
            
              
                 
            </div>
          </ModalBody>
          <ModalFooter>
            <button disabled={disabled} className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>
        
    </div>
      )
    }
    export default Movs