import { useState } from "react"
import { useDispatch } from "react-redux"
import {createShow} from '../features/shows/showSlice'



function ShowForm() {

    const [title, setTitle] = useState('')
    const [poster, setPoster] = useState('')
    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()
        dispatch(createShow({title, poster}))
        setTitle('')
        setPoster('')
    }

  return (
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Show Title</label>
                <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="text">Poster URL</label>
                <input type="text" name="poster" id="poster" value={poster} onChange={(e) => setPoster(e.target.value)} />
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">
                    Add a Show
                </button>
            </div>
        </form>
    </section>
  )
}
export default ShowForm