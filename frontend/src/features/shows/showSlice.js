import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import showService from './showService'

const initialState ={
    shows: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//create a new Show
export const createShow = createAsyncThunk('shows/create', async (showData, thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await showService.createShow(showData, token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get Shows
export const getShows = createAsyncThunk('shows/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await showService.getShows(token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete a Show
export const deleteShow = createAsyncThunk('shows/delete', async (id, thunkAPI) => {
    console.log(id)
    
    try{
        const token = thunkAPI.getState().auth.user.token
        console.log(token)
        return await showService.deleteShow(id, token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const showSlice = createSlice({
    name: 'show',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createShow.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createShow.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.shows.push(action.payload)
        })
        .addCase(createShow.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getShows.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getShows.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.shows = action.payload
        })
        .addCase(getShows.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteShow.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteShow.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.shows = state.shows.filter((show) => show._id !== action.payload.id)
        })
        .addCase(deleteShow.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = showSlice.actions
export default showSlice.reducer