import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    movies: [],
}
const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload.movies
        },
    }
})
export const { setMovies } = movieSlice.actions
export const movieReducer = movieSlice.reducer

