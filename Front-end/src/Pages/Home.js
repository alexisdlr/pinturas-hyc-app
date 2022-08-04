import { Link } from "react-router-dom"
export const Home = () => {
  return(
    <div className="home">
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
      <nav className=" d-flex justify-content-between align-items-center nav-home">
        <div className='container-logo flex-grow-0'>
          <p>H&amp;C </p>
        </div>
        <div>
        <Link to='auth/Login' className="link-log link-home">Iniciar Sesion</Link>
        </div>
      </nav>
      <div className="d-flex gap-3 flex-column justify-content-center align-items-center text-home">
        <h1 className="home-t">PINTURAS HYC</h1>
        <h2 className="home-t">Tu vida de un mejor color!</h2>
      </div>
     

    </div>
  )
}