import React, {useState, useEffect} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap';
import Title from '../../components/Title';
import { Link, useSearchParams } from 'react-router-dom';
import { Icon } from '../../components/Icon';


const ProductosAdmin = () => {
  const baseUrl = 'http://localhost/pinturas-hyc2/Backend/productos.php'
  const baseUrl1 = 'http://localhost/pinturas-hyc2/Backend/colores.php'
  const [data, setData]=useState([])
  const [color, setColor]=useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [modalInsertar, setModalInsertar]= useState(false)
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
    precioV: '',
    stockMin: ''
  })
  const handleFilter = (e) => {
    setSearchParams({ filter: e.target.value })
  }

  const filter = searchParams.get("filter") ?? ""

  const handleChange=e=>{
    const {name, value}=e.target;
    setProductoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar)
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar)
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar)
  }

  const peticionGet=async(url, state)=>{
    await axios.get(url)
    .then(response=>{
      state(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }
  const peticionPost=async()=>{
    let f = new FormData();
    f.append("nombre", productoSeleccionado.nombre)
    f.append("tipo", productoSeleccionado.tipo)
    f.append("marca", productoSeleccionado.marca)
    f.append("tamano", productoSeleccionado.tamano)
    f.append("acabado", productoSeleccionado.acabado)
    f.append("idColor", productoSeleccionado.idColor)
    f.append("precioC", productoSeleccionado.precioC)
    f.append("precioV", productoSeleccionado.precioV)
    f.append("stockMin", productoSeleccionado.stockMin)
    f.append("METHOD", "POST")
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
      peticionGet()
    }).catch(error=>{
      console.log(error);
    })
  }
  const peticionPut=async()=>{
    let f = new FormData();
    f.append("nombre", productoSeleccionado.nombre);
    f.append("tipo", productoSeleccionado.tipo);
    f.append("marca", productoSeleccionado.marca);
    f.append("tamano", productoSeleccionado.tamano);
    f.append("acabado", productoSeleccionado.acabado);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: productoSeleccionado.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(producto=>{
        if(producto.id===productoSeleccionado.id){
          producto.nombre=productoSeleccionado.nombre;
          producto.tipo=productoSeleccionado.tipo;
          producto.marca=productoSeleccionado.marca;
          producto.tamaño=productoSeleccionado.tamano;
          producto.acabado=productoSeleccionado.acabado;
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
    await axios.post(baseUrl, f, {params: {id: productoSeleccionado.id}})
    .then(response=>{
      setData(data.filter(producto=>producto.id!==productoSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }


  useEffect(()=>{
    peticionGet(baseUrl, setData) 
    peticionGet(baseUrl1, setColor) 

    
  },[data.length])

  return (
    <div style={{height:'100vh'}} >
    
      
      <div className='container fluid d-flex flex-column justify-content-center align-items-center margin-top' id='productos'>
        <Title classList='title mb-2' text='Productos' />

        <div className='d-flex gap-5 mb-3'>
          <div className='d-flex justify-content-center mb-3'>     
            <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
          </div>
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
      </div>
      
      <div className='d-flex justify-content-center'>
    <Table className=''>
      <thead>
        <tr className='bg-blue text-light '>
          <th>ID</th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Marca</th>
          <th>tamaño</th> 
          <th>Existencia</th> 
          <th>acabado</th>                   
          <th>Color</th>
        </tr>
      </thead>
  <tbody>
        {
        data
          .filter(producto => {
            if (!filter) return true;

              return producto.nombre.toLowerCase().includes(filter.toLowerCase());
          })
          .map(producto=>(
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>
              <Link to={"/app/admin/" + producto.id} className='link link-prod' >
              {producto.nombre}
              </Link>
              </td>
              <td>{producto.tipo}</td>
              <td>{producto.marca}</td>
              <td>{producto.tamano} lts</td>
              <td>{producto.stock}</td>
              <td>{producto.acabado}</td>
              <td>
                <img className='img' src={producto.imagen} alt='imagen de color'/>
              </td>

            </tr>
        ))}

{/* select `hycpinturas`.`productos`.`id` AS `id`, `hycpinturas`.`productos`.`stock`*`hycpinturas`.`productos`.`precioV` AS `prodvendido`, SUM(`hycpinturas`.`productos`.`preciov`) AS `Total`, `hycpinturas`.`productos`.`nombre` AS `producto` from (`hycpinturas`.`productos`); */}

      </tbody> 
</Table>
</div>


        <Modal isOpen={modalInsertar}>
          <ModalHeader>Insertar Producto</ModalHeader>
          <ModalBody>
            <div className="form-group ">
            <div className='d-flex gap-3 justify-content-between mb-5'>
                <div>
                <label>Nombre: </label>
                <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
                </div>
                <div>
                  <label>Tipo: </label>
                  <select className="form-control" name="tipo" onChange={handleChange} > 
                <option disabled selected>
                  Seleccione un tipo
                </option>
                  <option value='Exterior' name='Exterior'>
                  Exterior
                    </option>
                    <option value='Interior' name='Interior'>
                  Interior
                    </option>
                  </select>
                </div>
                <div>
                <label>Marca: </label>
              <input type="text" className="form-control" name="marca" onChange={handleChange}/>
                </div>   
            </div>
            <div className='d-flex gap-3 justify-content-between mb-5'> 
              <div>
                <label>Tamaño: </label>
                <input type="text" className="form-control" name="tamano" onChange={handleChange}/>
              </div>
              <div>
                <label>Stock Min: </label>
                <input type="text" className="form-control" name="stockMin" onChange={handleChange}/>
              </div>
              <div>
                <label>Acabado : </label>
                <input type="text" className="form-control" name="acabado" onChange={handleChange}/>
              </div>
            </div>
            <div className='d-flex gap-3 justify-content-between mb-5'>
              <div>

              <label>Color: </label>

              <select className="form-control" name="idColor" onChange={handleChange} > 
              <option disabled selected>
                Seleccione un color
              </option>
                {
                  color.map(color => (
                    <option key={color.id} value={color.id} name={color.id} >
                    {color.nombre}  
                    </option>
                  ))
                }
              </select>              

              </div>
              <div>
                <label>Precio compra: </label>
                <input type="text" className="form-control" name="precioC" onChange={handleChange}/>
              </div>
              <div>
                <label>Precio Venta: </label>
                <input type="text" className="form-control" name="precioV" onChange={handleChange}/>
              </div>
            </div>
             
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost(baseUrl, setData)}>Insertar</button>{"   "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

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
          <input type="text" className="form-control" name="tamano" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.tamaño}/>
          <br />
          <label>Acabado : </label>
          <br />
          <input type="text" className="form-control" name="acabado" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.acabado}/>
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

export default ProductosAdmin