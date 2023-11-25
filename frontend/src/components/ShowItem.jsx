import { MdDeleteOutline } from "react-icons/md";
import { IconContext } from "react-icons";
function ShowItem({show}) {  
  
  console.log(show)
  return (
    <div className="show">
        <div>
            {new Date(show.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{show.title}</h2>
        <img src={show.poster} alt="Poster from the show"/>
        <button className="deleteBtn"><IconContext.Provider value={{ style: { width: '65px', height: '65px', color: "white", marginTop: '10px', cursor: 'pointer'} }}><MdDeleteOutline /></IconContext.Provider></button>
    </div>
  )
}
export default ShowItem