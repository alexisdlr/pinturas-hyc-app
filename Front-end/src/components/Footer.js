import { Icon } from "./Icon"
import Title from "./Title"
const Footer = () => {
  return(
    <footer className="footer d-flex p-4 gap-5">
      <div>
        <Title isHeading={false} text='Contáctanos' />
        <p>
        <Icon
          classIcon="fa-brands fa-whatsapp"
          classBtn='icon mx-2'
        />862 102 3195</p>
        <p>
        <Icon
          classIcon="fa-brands fa-whatsapp"
          classBtn='icon mx-2'
        />
        862 124 0594</p>

        <p>pinturashyc@gmail.com</p>


      </div>
      <div>
        <Title isHeading={false} text='Redes Sociales' />
        <p>
        <Icon
          classIcon="fa-brands fa-facebook"
          classBtn='icon mx-2'
        />
        <a href="https://www.facebook.com/pinturashyc/" target='_blank' className="link p-0">PINTURAS HYC</a></p>
        <p>
        <Icon
          classIcon="fa-brands fa-instagram"
          classBtn='icon mx-2'
        />
        <a href="" className="link p-0">PINTURAS HYC</a></p>
      </div>
      <div>
        <Title isHeading={false} text='Ubícanos' />
        <p> <Icon
          classIcon="fa-solid fa-location-dot"
          classBtn='icon mx-2'
        />Calle Allende #280 <br/> Colonia Centro Nava, Coahuila</p>
       
      </div>
      <div className="flex-grow-1 d-flex justify-content-end">
        <Title isHeading={false} text='Síguenos' /> 
      </div>
    </footer>
  )
}
export default Footer