import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import Spinner from '../components/Spinner'
import { getShows, reset } from "../features/shows/showSlice"
import ShowItem from "../components/ShowItem"
import SearchItem from "../components/SearchItem"
import axios from "axios"
import Modal from "react-modal"
import { GrFormClose } from "react-icons/gr";

let showArr = []

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const {shows, isLoading, isError, message} =  useSelector((state) => state.shows)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
 
  const setModalIsOpenToTrue =()=>{
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse =()=>{
    setModalIsOpen(false)
    showArr = []
  }


  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }

    dispatch(getShows())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading){
    return <Spinner />
  }

  const fetchShow = async (myTitle) => {
    const options = {
      method: 'GET',
      url: 'https://imdb8.p.rapidapi.com/title/find',
      params: {q:myTitle},
      headers: {
        'X-RapidAPI-Key': '67631460aemsh500c60fedb3fa1ep1bc9a8jsnf19f5a5688f8',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      const myArr = response.data.results
      myArr.map((show) => (
        show.titleType === 'tvSeries' || show.titleType === 'tvMiniSeries' || show.titleType === 'tvSeries' ? showArr.push(show) : console.log("not a tv show")
      ))} catch (error) {
      console.error(error);
    }
    setTitle('')
  }

  const searchShow = async () => {
    await fetchShow(title)
    setModalIsOpenToTrue()
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Your Collection</p>        
      </section>
      
      <div className="form-group">
          <label htmlFor="title">Show Title</label>
          <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <button className="btn btn-block" onClick={searchShow}>Search For a Show</button>
      </div>

      {/* Search Modal */}
        <Modal className="modal" isOpen={modalIsOpen} ariaHideApp={false}>         
        <button className="modalClose" onClick={setModalIsOpenToFalse}><h1><GrFormClose /></h1></button>         
          {showArr.length > 0 ? (<div className="shows">
          {showArr.map((show) => (            
            <SearchItem key={show.id} show={show} />
          ))}
        </div>) : (<h3>No Results to display.</h3>)}
        </Modal>
{/* Add a show input
      <ShowForm /> */}

      {shows.length > 0 ? (<div className="shows">
          {shows.map((show) => (
            <>
            <ShowItem key={show._id} show={show} />
            <div className="form-group">
              </div>
            </>
            
            
          ))}
        </div>) : (<h3>You have no shows saved.</h3>)}

    </>
  )
}
export default Dashboard