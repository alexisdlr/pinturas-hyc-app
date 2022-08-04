import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap';
import Title from '../../components/Title';

const Colores = () => {
  const baseUrl = 'http://localhost/pinturas-hyc2/Backend/colores.php'
  const [data, setData]=useState([])
  const fileRef = useRef()
  const [file, setFile ] = useState(null)
  const [modalInsertar, setModalInsertar]= useState(false)
  const [modalEditar, setModalEditar]= useState(false)
  const [modalEliminar, setModalEliminar]= useState(false)
  const [color, setColor]=useState({
    id: '',
    nombre: '',
    file: file,
    codigo: '',
    
  })
  const handleChange=e=>{
    const {name, value}=e.target;
    setColor((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }
  
  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }
  const peticionPost=async()=>{
    var f = new FormData();
    f.append("nombre", color.nombre);
    f.append("imagen", file.name);
    f.append("codigo", color.codigo);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f,
      {
          "headers" :
                          { 

                            "Content-Type":"multipart/form-data",
                          }
      })
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const peticionPut=async()=>{
    var f = new FormData();
    f.append("nombre", color.nombre);
    f.append("imagen", color.imagen);
    f.append("codigo", color.codigo);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: color.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(color=>{
        if(color.id=== color.id){
          color.nombre=color.nombre;
          color.imagen=color.imagen;
          color.codigo=color.codigo;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: color.id}})
    .then(response=>{
      setData(data.filter(color=>color.id!==color.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const seleccionarProducto=(producto, caso)=>{
    setColor(producto);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }
  useEffect(()=>{
    peticionGet() 
   },[data.length])
   

  return (
    <div>
      <div className='container fluid d-flex justify-content-center margin-top' id='productos'>
        <Title classList='title' text='Colores' />
      </div>
      <div className='d-flex justify-content-center mb-3'>     
         <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
      </div>
      <div className='d-flex justify-content-center'>
    <Table>
      <thead>
        <tr className='bg-blue text-light '>
          <th>ID</th>
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Codigo</th>
          <th>Acciones</th>
        </tr>
      </thead>
  <tbody>
        {data.map(producto=>(
          <tr key={producto.codigo}>
            <td>{producto.id}</td>
            <td>{producto.nombre}</td>
            <td><img className='rounded img' src={producto.imagen} alt='imagen'/></td>
            <td>{producto.codigo}</td>




          <td>
          <button className="btn btn-primary" onClick={()=>seleccionarProducto(producto, "Editar")}>Editar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarProducto(producto, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
        ))}


      </tbody> 
</Table>
</div>
        <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar Colores</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>Nombre: </label>
              <br />
              <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
              <br />
              <label>Imagen : </label>
              <input 
                type="file"
                // onChange={ e => setFiles(e.target.value)}
                onChange={() => {
                  setFile(fileRef.current.files[0])
                  console.log(fileRef.current.files[0])
                }
                }
                ref={fileRef}
            />
              <br/>
              <label>Codigo : </label>
              <br />
              <input type="text" className="form-control" name="codigo" onChange={handleChange}/>
              <br/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalEditar}>
      <ModalHeader>Editar Colores</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange} value={color && color.nombre}/>
          <br />
          <label>Imagen : </label>
          <br />
          <input type="text" className="form-control" name="imagen" onChange={handleChange} value={color && color.imagen}/>
          <br />
          <label>Codigo : </label>
          <br />
          <input type="text" className="form-control" name="codigo" onChange={handleChange} value={color && color.codigo}/>
          <br />
        
         
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el Color {color && color.nombre}?
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
    export default Colores