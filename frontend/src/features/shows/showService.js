import axios from 'axios'

const API_URL = (process.env.NODE_ENV === 'production') ? 'https://mernappdave-7eca150cce5f.herokuapp.com/api/shows/' : 'http://localhost:5000/api/shows/'

const createShow = async (showData, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, showData, config)

    return response.data

}

//get user Shows
const getShows = async (token) => {

    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data

}

// Delete a show
const deleteShow = async (showId, token) => {

    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + showId, config)

    return response.data

}


const showService = {
    createShow,
    getShows,
    deleteShow,
}

export default showService



