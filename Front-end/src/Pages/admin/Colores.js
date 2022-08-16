import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap';
import Title from '../../components/Title';
import Buttonref from '../../components/Buttonref';
import Loader from '../../components/Loader';
const Colores = () => {
  const baseUrl = 'https://pinturas-hyc.000webhostapp.com/Backend/colores.php'
  const [data, setData]=useState([])
  const [imagen, setImagen] = useState(null);
  const [modalInsertar, setModalInsertar]= useState(false)
  const [modalEditar, setModalEditar]= useState(false)
  const [modalEliminar, setModalEliminar]= useState(false)
  const [color, setColor]=useState({
    id: '',
    nombre: '',
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
    if(color.nombre === '' || color.codigo <= 0 || imagen === '') {
      alert('Error: Ningun campo puede estar vacío')
      return
    }
    var f = new FormData();
    f.append("nombre", color.nombre);
    f.append("imagen", imagen);
    f.append("codigo", color.codigo);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
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
    f.append("imagen", imagen);
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
      <Buttonref href='#colores' className='link link-home absolute-jj' >Ver colores</Buttonref>

        <Title classList='title' text='Colores' />
      </div>
      <div className='d-flex justify-content-center mb-3'>     
         <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
      </div>
      <div className='d-flex justify-content-center' id='colores'>
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
        {
        data ? 
        data.map(producto=>(
          <tr key={producto.id}>
            <td>{producto.id}</td>
            <td>{producto.nombre}</td>
            <td><img className='rounded img' src={"data:image/png;base64,"+producto.imagen} alt='imagen'/></td>
            <td>{producto.codigo}</td>




          <td>
          <button className="btn btn-primary" onClick={()=>seleccionarProducto(producto, "Editar")}>Editar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarProducto(producto, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
        )) : <Loader />
      
      }


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
              <label >Imagen : </label>
              <input type="file" className="form-control" accept="image/*"
               onChange={(e) => setImagen(e.target.files[0])} multiple/>
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
          <input type="file" className="form-control" accept="image/*"
               onChange={(e) => setImagen(e.target.files[0])} multiple/>
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
// function Colores() {
//   const baseUrl = 'http://localhost/pinturas-hyc2/Backend/colores.php'
//   const [lista, setLista] =  useState([]);
//   const [data, setData] = useState({
//     id: '',
//     nombre: '',
//     codigo:''
//   });  
//   const [imagen, setImagen] = useState(null);
  
// useEffect(() => {
// peticionGet();
// },[])

// const peticionGet=async()=>{
//     await axios.get(baseUrl)
//    .then(response=>{
//          setLista(response.data);
//     }).catch(error=>{
//          console.log(error);
//        })
//      }

// async function addImagen(e) {
//  e.preventDefault();
//  let fd = new FormData() 
//  fd.append("nombre", data.nombre)
//  fd.append("imagen", imagen)
//  fd.append("codigo", data.codigo)
//  const res = await axios.post(baseUrl, fd);
//  console.log(res.data)
//  peticionGet();

// }

// const handleChange= e =>{
//   const {name, value}=e.target;
//   setData((prevState)=>({
//     ...prevState,
//     [name]: value
//   }))
// }

// async function deleteImagen(id){ 

//  if(window.confirm('Quieres eliminar?')){
//     const res = await axios.delete('http://localhost/apirest/?id='+id);
//     peticionGet();
//     console.log(res.data)
// }
// } 


// return (

// <div className="container ">
// <div className="row p-3">

// <div className="col-md-5 p-2 ">
//        <form className="card p-2 mt-2 border-secondary" encType="multipart/form-data">
//          <h5>Colores</h5>
        
//          <textarea  cols="4" placeholder="nombre" name='nombre' className="form-control" 
//          onChange={handleChange} >

//          </textarea>
//          <textarea  cols="4" placeholder="codigo" name='codigo' className="form-control" 
//          onChange={handleChange} >

//          </textarea>

//          <div className="form-group">
//            <label htmlFor="img">imagen</label> 
//             <input type="file"   className="form-control-file" accept="image/*"
//                 onChange={(e) => setImagen(e.target.files[0])} multiple/></div> 
          
//             <button  className="btn btn-outline-success btn-sm" 
//               onClick={(e) => addImagen(e)} >Add </button> 
//        </form>
//      </div>

//      <div className="col-md-7 p-2">
//           { lista.map(item => (
//           <div className="card p-2 mt-2 border-secondary" key={item.id}>
//             <div className="card-body">
//             <img src={"data:image/png;base64,"+item.imagen} className="img-fluid" 
//               alt="imagen"/>
//           <h5 className="text-primary"> {item.nombre}</h5>  

//                   <div className="d-flex flex-row-reverse" >
//                      <button  className="btn btn-outline-danger btn-sm " 
//                          onClick={() => deleteImagen(item.id)} >
//                          </button> 
                    
//                    </div>  
                    
//                 </div> 
//             </div>         
//           ))}  
//    </div>

// </div>
    
     
// </div>

// );
// }
    export default Colores