import { MdDeleteOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import { useDispatch } from 'react-redux'
import {deleteShow} from '../features/shows/showSlice'

function ShowItem({show}) {  
  const dispatch = useDispatch()
  return (
    <div className="show">
        <div>
            {new Date(show.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{show.title}</h2>
        <img src={show.poster} alt="Poster from the show"/>
        <button onClick={() => dispatch(deleteShow(show._id))} className="deleteBtn"><IconContext.Provider value={{ style: { width: '65px', height: '65px', color: "white", marginTop: '10px', cursor: 'pointer'} }}><MdDeleteOutline /></IconContext.Provider></button>
        
    </div>
  )
}
export default ShowItem