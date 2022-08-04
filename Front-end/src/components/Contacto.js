import Title from "./Title"
const Contact = () => {
  return(
    <div className="d-flex flex-row justify-content-center align-items-center container-contacto p-0" id="contacto">
     <div className="container-form">
     <div className="conect text-center">
                <Title isHeading={false} text='Entra en contacto!' />
                <p>Contáctanos para agendar pedidos</p>
            </div>
            <div className="form-container">
              <form action="https://formsubmit.co/alexgoku500@gmail.com" method="POST" className="form">
                <span>Envíanos un mensaje</span>
                <div className="name">
                  <label htmlFor="Name">Nombre:</label>
                  <input type="text" name="name" id="Name" required />
                </div>
                <div className="email">
                  <label htmlFor="Email">Email:</label>
                  <input type="email" name="email" id="email" required />
                </div>
                <div className="message">
                  <label htmlFor="message">Mensaje:</label>
                  <input type="text" name="message" id="message" required />
                </div>
                <button type="submit" className="btn btn-form">Enviar</button>
              </form>
            </div>
     </div>
    </div>
  )
}
export default Contact