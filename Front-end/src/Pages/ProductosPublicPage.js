import pintura from '../images/pintura.jpg'
import estrellas from '../images/estrellas.png'
import NavBar from "../components/NavBar"
import { useProd } from '../hooks/useProd'


const ProductosPublicPage = () => {
 const {prod} = useProd()
  return(
    <div>
      <NavBar 
      isAdminPage={false}
      isProductPage={true}
      />
     
      <div className="tag">
        <p className="text">Somos tu mejor opcion, compra pintura de calidad con nosotros !</p>
      </div>
      <section className="d-flex gap-5 justify-content-center flex-wrap pt-5">
        {
          prod ? prod.map(producto => (
            <div key={producto.id} className="card-producto mr-3 position-relative">
              <img src={pintura} alt='img pintura' className="img-pintura"/>
            <div className="card-text">
              <p>{producto.nombre}</p>
              
             <p> {producto.tipo} {producto.marca}</p>
             
             <div className="d-flex justify-content-between align-items-center">
              <img src={estrellas} alt='estrellas png' style={{height:'18px'}} />
              <button className="btn btn-primary">Ver mas</button>
             </div>
              <img src={producto.imagen} alt={producto.nombre} className='img-public'/>
            </div>
            </div>
          )) : 'no hay datos'
        }
      </section>

    </div>
  )
}
export default ProductosPublicPage