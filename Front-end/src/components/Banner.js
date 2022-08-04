import About from "./About"
import Title from "./Title"


const Banner = ({title, className, isSection}) => {
  return (
    <div className={className}>
      <div className="backdrop p-3 d-flex justify-content-center flex-column align-items-center container-banner">
    <Title classList="title" text={title} isHeading={true} />
    {isSection ? <About/> : <div>Pintura Vinilica Acrilica Lavable</div>}
    </div>
    </div>

  )
}
export default Banner