import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken, notifyError, notifySuccess } from '../helpers';
import jsCookie from 'js-cookie';
const baseUrl = `http://127.0.0.1:4000/api`

export const addPlace = createAsyncThunk('place/add', async (data, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    const token = getToken();
    try {

        const response = await axios.post(
            `${baseUrl}/place`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        const result = await response.data;
        notifySuccess(result.message)
        return result;

    } catch (error) {
        notifyError(error.response.data.errors)
        return rejectWithValue(error.response.data)
    }

})
export const updatePlace = createAsyncThunk('place/update', async ({ data, id }, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    const token = getToken();
    // console.log(id, data)
    try {

        const response = await axios.put(
            `${baseUrl}/place/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        const result = await response.data;
        notifySuccess(result.message)
        return result;

    } catch (error) {
        notifyError(error.response.data.errors)
        return rejectWithValue(error.response.data)
    }

})

export const getUserPlaces = createAsyncThunk('place/getUserPlaces', async (id, ThunkAPI) => {
    const token = getToken();
    if (!token) {

    }
    const { rejectWithValue } = ThunkAPI;

    try {

        const response = await axios.get(
            `${baseUrl}/place/user/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        const result = await response.data;
        return result;

    } catch (error) {
        notifyError(error.response.data.errors)
        return rejectWithValue(error.response.data)
    }

})
export const getPlace = createAsyncThunk('place/getPlace', async (id, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;

    try {

        const response = await axios.get(
            `${baseUrl}/place/${id}`,
        );
        const result = await response.data;
        return result;

    } catch (error) {
        notifyError(error.response.data.errors)
        return rejectWithValue(error.response.data)
    }

})
export const getPlaces = createAsyncThunk('place/getPlaces', async ({ page = 1, limit = 8, minPrice, maxPrice, search }, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {

        const response = await axios.get(
            `${baseUrl}/places/?page=${page}&limit=${limit}&search=${search ?? ''}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
        );
        const result = await response.data;
        return result;

    } catch (error) {
        notifyError(error.response.data.errors)
        return rejectWithValue(error.response.data)
    }

})
export const uploadImages = createAsyncThunk('place/uploadImages', async (formData, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    const token = getToken();
    try {

        const response = await axios.post(
            `${baseUrl}/place/images/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',

                    Authorization: `Bearer ${token}`

                }
            }
        );
        const result = await response.data;
        return result;

    } catch (error) {
        notifyError(error.response.data.errors)
        return rejectWithValue(error.response.data)
    }

})
export const deleteImage = createAsyncThunk('place/deleteImages', async ({ path, id }, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    const token = getToken();
    try {
        const response = await axios.post(
            `${baseUrl}/place/images/delete`, {

            path: path,
            id: id,
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        const result = await response.data;
        return result;

    } catch (error) {
        notifyError(error.response.data.errors)
        return rejectWithValue(error.response.data)
    }

})

const placeSlice = createSlice({
    initialState: {
        isLoading: false,
        userPlaces: [],
        message: '',
        places: [],
        search: '',

    },
    name: "placeSlice",
    reducers: {
        addSearchQuery: (state, action) => {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addPlace.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(addPlace.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(getUserPlaces.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getUserPlaces.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userPlaces = action.payload.places;
        })
        builder.addCase(getPlace.pending, (state, action) => {
            state.isLoading = true;
        }).
            addCase(getPlace.fulfilled, (state, action) => {
                state.isLoading = false;
            }).
            addCase(deleteImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload
            });
        builder.addCase(getPlaces.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getPlaces.fulfilled, (state, action) => {
            state.places = action.payload.places;
            state.isLoading = false;
        })


    }
})
export const { addSearchQuery } = placeSlice.actions;
export default placeSlice.reducer;