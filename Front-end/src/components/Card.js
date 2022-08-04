import Images from "../images/Images"
import Title from "./Title"

const Card = () => {
  return(
    <article className='container-all-cards'>
      {[
  {
    id: 1,
    text: 'Pintar Interiores',
    src: Images.room
  },
  {
    id: 2,
    text: 'Restaurar',
    src: Images.restaurar
  }
].map(item=> {
        return(
    <div key={item.id} className="container-card">
      <div>
        <img 
        src={item.src}
        alt='card img hyc'
        />
        <Title isHeading={false} text={item.text} />
      </div>
    
    </div>
        )
      })}
    </article>

  )
}
export default Card