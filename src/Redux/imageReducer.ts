import { DataQueryParams } from './../Types/imageType';
import { intitialImageState, requestImage } from "../Types/imageType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: intitialImageState = {
    image: [],
    isLoad: true,
    currentPage: 1,
    totalCount: 0,
    perPage: 56
}
const ImageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setImage(state: intitialImageState, action: PayloadAction<requestImage>) {
            state.isLoad = false
            state.image = action.payload.data
            state.totalCount = action.payload.totalCount
        },
        setCurrentPage(state: intitialImageState, action: PayloadAction<number>) {
            state.isLoad = true
            state.currentPage = action.payload
        },
        deleteImage(state:intitialImageState,action:PayloadAction<number>){
            state.image = state.image.filter((item) => item.id !== action.payload)
        }
    }
})

//thunks
export const fetchImage = createAsyncThunk(
    '/image',
    async (params: DataQueryParams, thunkAPI) => {
        const url = `http://jsonplaceholder.typicode.com/photos?_page=${params._page}&_limit=${params.limit}`
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
        if (!response.ok) {
            console.log('Error fetching data from API')
        }
        const fetchingData = {
            data: await response.json(),
            totalCount: +(response.headers.get("X-Total-Count") ?? 0)
        }
        thunkAPI.dispatch(setImage(fetchingData))
    }
)

// Imitation removal
export const DeleteImage = createAsyncThunk(
    '/image',
    async (id:number,thunkAPI) =>{
        const url = `http://jsonplaceholder.typicode.com/photos/${id}`
        const response = await fetch(url, {
            method:'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
        if (!response.ok) {
            console.log('Error fetching data from API')
        }
        thunkAPI.dispatch(deleteImage(id))
    }
)
export const AlbomSortImage = createAsyncThunk(
    '/image',
    async(albumID:number,thunkAPI) =>{
        const url = `http://jsonplaceholder.typicode.com/photos?albumId=${albumID}`
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
        if (!response.ok) {
            console.log('Error fetching data from API')
        }
        const fetchingData = {
            data: await response.json(),
            totalCount: +(response.headers.get("X-Total-Count") ?? 0)
        }
        thunkAPI.dispatch(setImage(fetchingData))
    }
)

export const { setImage,setCurrentPage,deleteImage } = ImageSlice.actions
export default ImageSlice.reducer
