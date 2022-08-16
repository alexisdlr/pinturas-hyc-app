import { useEffect,useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import pintura from '../../images/revesto.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import Buttonref from "../../components/Buttonref";
export const Producto = () => {
  const params = useParams()
  const baseUrl = `https://pinturas-hyc.000webhostapp.com/Backend/productos.php?id=${params.productoId}`
  const [data, setData]=useState(null)
  let navigate = useNavigate()
  const [modalEditar, setModalEditar]= useState(false)
  const [modalEliminar, setModalEliminar]= useState(false)
  const [productoSeleccionado, setProductoSeleccionado]=useState({
    id: '',
    nombre: '',
    tipo: '',
    marca: '',
    tamano: '',
    stock: '',
    acabado: '',
    idColor: '',
    precioC: '',
    precioV:''
  })
 
  const peticionGet=async(url, state)=>{
    await axios.get(url)
    .then(response=>{
      console.log(response)
      state(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setProductoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar)
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar)
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("nombre", productoSeleccionado.nombre);
    f.append("tipo", productoSeleccionado.tipo);
    f.append("marca", productoSeleccionado.marca);
    f.append("tamano", productoSeleccionado.tamano);
    f.append("acabado", productoSeleccionado.acabado);
    f.append("precioC", productoSeleccionado.precioC);
    f.append("precioV", productoSeleccionado.precioV);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: productoSeleccionado.id}})
    .then(response=>{
      let dataNueva= data;
      
        if(dataNueva.id===productoSeleccionado.id){
          dataNueva.nombre=productoSeleccionado.nombre;
          dataNueva.tipo=productoSeleccionado.tipo;
          dataNueva.marca=productoSeleccionado.marca;
          dataNueva.tamaño=productoSeleccionado.tamano;
          dataNueva.acabado=productoSeleccionado.acabado;
        }
      ;
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: productoSeleccionado.id}})
    .then(response=>{
      setData(data.filter(producto=>producto.id!==productoSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const seleccionarProducto=(producto, caso)=>{
    setProductoSeleccionado(producto);
    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }
  
  useEffect(()=> {
      peticionGet(baseUrl, setData)
  },[])
  return(
    <div style={{height:'100vh'}}  >
    <Buttonref href='#productos' className='link link-home absolute-jj' >Ver producto</Buttonref>
    <div className='d-flex  py-5 ' id='productos'>
      
      {
        data ? 
        data.map(data => (
          <div style={{ width: '-webkit-fill-available'}}  className='d-flex gap-5 justify-content-center '>
          {data.stock < data.stockMin ? <div>
            <p className="alert alert-danger">Alerta: <br /> producto escaso</p>
          </div> : ''}
          <div >
            <img src={pintura} alt='producto' />
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
          <h1 className=" mb-4">{data.nombre}</h1>
          <div className="d-flex justify-content-between gap-5 ">
            <h2 className="fs-4"><span className="subtitle">Tipo:</span> {data.tipo}</h2>
            <h2 className="fs-4"><span className="subtitle">Marca:</span> {data.marca}</h2>
            <h2 className="fs-4"><span className="subtitle">Tamaño:</span> {data.tamano}</h2>
          </div>
          <div className="d-flex justify-content-between mt-5 gap-5">
            <h2 className="fs-4"><span className="subtitle">Existencia:</span> {data.stock}</h2>
            <h2 className="fs-4"><span className="subtitle">Acabado:</span> {data.acabado}</h2>
            <h2 className="fs-4"><span className="subtitle">Precio de Compra:</span> ${data.precioC}</h2>
          </div>
        <div className="d-flex justify-content-between mt-5 align-items-center gap-5">
        <h2 className="fs-4"><span className="subtitle">Precio de Venta:</span> ${data.precioV}</h2>

          <div className="d-flex align-items-center gap-2 text-start">
            <h2 className="fs-4"><span className="subtitle">Color:</span></h2>
            <img src={"data:image/+data.extension+;base64,"+data.imagen} className="img" 
                alt="imagen"/>

          </div>
        </div>
        
        <div className="d-flex justify-content-center gap-3 mt-3">
        <button className="btn btn-primary px-4" onClick={()=>seleccionarProducto(data, "Editar")}>Editar</button> {"  "}
        <button className="btn btn-danger px-4" onClick={()=>seleccionarProducto(data, "Eliminar")}>Eliminar</button>
        </div>
      
          </div>

      </div>
        )) : 'no hay datos'
      } 
          
       
      

    </div>

      <Modal isOpen={modalEditar}>
    <ModalHeader>Editar Producto</ModalHeader>
    <ModalBody>
      <div className="form-group">
        <label>Nombre: </label>
        <br />
        <input type="text" className="form-control" name="nombre" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.nombre}/>
        <br />
        <label>Tipo : </label>
        <br />
        <input type="text" className="form-control" name="tipo" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.tipo}/>
        <br />
        <label>Marca : </label>
        <br />
        <input type="text" className="form-control" name="marca" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.marca}/>
        <br />
        <label>Tamaño : </label>
        <br />
        <input type="text" className="form-control" name="tamano" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.tamano}/>
        <br />
        <label>Acabado : </label>
        <br />
        <input type="text" className="form-control" name="acabado" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.acabado}/>
        <br />
        <label>Precio de Compra : </label>
        <br />
        <input type="text" className="form-control" name="precioC" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.precioC}/>
        <br />
        <label>Precio de Venta : </label>
        <br />
        <input type="text" className="form-control" name="precioV" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.precioV}/>
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
      ¿Estás seguro que deseas eliminar el Producto {productoSeleccionado && productoSeleccionado.nombre}?
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={()=>{
          peticionDelete()
          navigate("/app/admin", {replace:true})
        }
          }>
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