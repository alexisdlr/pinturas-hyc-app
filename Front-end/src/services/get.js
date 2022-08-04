import axios from 'axios';

export const peticionGet=async(url, state)=>{
  try {
    const response = await axios.get(url)
    state(response.data)
  }
  catch (error) {
    console.log(error)
  }
  
}