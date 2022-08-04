const Title = ({text, classList, isHeading}) => {
  return(
    <>
    {
      isHeading ? <h1 className={classList}>{text}</h1> : <h2 className={classList}>{text}</h2> 
    }
    </>
  )
}
export default Title