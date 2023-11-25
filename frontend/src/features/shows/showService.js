import axios from 'axios'

const API_URL = 'http://localhost:5000/api/shows'

const createShow = async (showData, token) => {
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    console.log(showData)
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


const showService = {
    createShow,
    getShows,
}

export default showService



