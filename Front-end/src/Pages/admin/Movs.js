import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Icon } from '../../components/Icon';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap';
import Title from '../../components/Title';
import { useSearchParams } from 'react-router-dom';
import { peticionGet } from '../../services/get';
import { useProd } from '../../hooks/useProd';

const Movs = ({idUser}) => {

  const baseUrl = 'http://localhost/pinturas-hyc2/Backend/movimientos.php'
  const {prod} = useProd()
  const [id, setId] = useState(null)
  const [data, setData]=useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [modalInsertar, setModalInsertar]= useState(false)
  const [modalEliminar, setModalEliminar]= useState(false)
  const [mov, setMov]=useState({
    id: '',
    tipo: '',
    idUsuario: idUser,
    cantidad: '',
    idProd: ''
    
  })
  const handleChange=e=>{
    const {name, value}=e.target;
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

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }
  

  const peticionPost=async()=>{
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

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: mov.id}})
    .then(response=>{
      setData(data.filter(producto=>producto.id!==mov.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }
 
   useEffect(()=>{
     peticionGet(baseUrl, setData) 

  },[])
   

  return (
    <div style={{height: '100vh'}}>
      
     
      <div className='container fluid d-flex justify-content-center margin-top' id='productos'>
        <Title classList='title' text='Movimientos' />
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
         
      <div className='d-flex justify-content-center mt-5'>
    <Table >
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
        {prod
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
            <td>{producto.precioC}</td>
            <td>
                <img className='img' src={producto.imagen} alt='imagen de color'/>
              </td>

          <td>
          <button className="btn btn-success" onClick={
            ()=>{
            abrirCerrarModalInsertar()
            setId(producto.id)
          }}>Insertar Movimiento</button>
          </td>
          </tr>
        ))}


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
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>
        

    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el Movimiento {mov && mov.id}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
      )
    }
    export default Movs