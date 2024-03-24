import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken, notifyError, notifySuccess } from '../helpers';
const baseUrl = `http://127.0.0.1:4000/api`
export const addBooking = createAsyncThunk('addBooking', async ({ data }, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    const token = getToken();

    try {

        const response = await axios.post(
            `${baseUrl}/booking`,
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
        console.log(error)
        notifyError(error.response.data.errors)
        return rejectWithValue(error.response.data)
    }
});
export const getUserBookings = createAsyncThunk('place/getUserBookings', async (id, ThunkAPI) => {
    const token = getToken();
    const { rejectWithValue } = ThunkAPI;

    try {

        const response = await axios.get(
            `${baseUrl}/booking/user/`,
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
export const getRequests = createAsyncThunk('place/getRequests', async (d, ThunkAPI) => {
    const token = getToken();

    const { rejectWithValue } = ThunkAPI;

    try {

        const response = await axios.get(
            `${baseUrl}/booking/user/requests`,
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
export const updateRequest = createAsyncThunk('place/updateRequest', async ({ id, status }, ThunkAPI) => {
    const token = getToken();

    const { rejectWithValue } = ThunkAPI;

    try {

        const response = await axios.put(
            `${baseUrl}/booking/${id}`,
            { status: status },
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

const bookingSlice = createSlice({
    initialState: {
        isLoading: false,
        message: '',
        userBookings: [],
        userRequests: []
    },
    name: "bookingSlice",
    reducers: [],
    extraReducers: (builder) => {
        builder.addCase(getUserBookings.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getUserBookings.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userBookings = action.payload.places
        })
            .addCase(getRequests.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getRequests.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userRequests = action.payload.requests

            })
    }
})
export const { } = bookingSlice.actions;
export default bookingSlice.reducer;