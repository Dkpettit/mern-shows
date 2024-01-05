import { GrAddCircle } from "react-icons/gr";
import { useDispatch } from "react-redux"
import React, { useCallback } from 'react'
import {createShow} from '../features/shows/showSlice'


function SearchItem({show, onAddShow}) {
  const dispatch = useDispatch()

    const handleCloseModal = useCallback(() => {
      onAddShow();
    },[onAddShow])

    const onSubmit = e => {
        e.preventDefault()
        dispatch(createShow({title:show.title, poster:show.image.url}))
        handleCloseModal()        
    }

    if(!show.image){
      return <div className="show">
      <h2>{show.title}</h2>
        <h4>Sorry no Poster available</h4>
      </div>
    }else {
      return (
        <div className="show">
            <h2>{show.title}</h2>
            {show.image.url && <img src={show.image.url} alt="Poster from the show"/>}
            <form  onSubmit={onSubmit}>         
            <div className="form-group">
                  <button className="btn btn-block" type="submit">
                      Add Show to Collection <GrAddCircle />
                  </button>
              </div>
            </form>
        </div>
        
      )
    }
    
  }
  export default SearchItem