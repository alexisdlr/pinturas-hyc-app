

export const BuscarFechas = ({inputRef, handleValidation}) => {
 
  return(

    <input type="date"
     ref={inputRef} 
     className="input-fechas" 
     onChange={handleValidation}/>

  )
}