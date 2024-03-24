import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Cookies from 'js-cookie';
import { notifyError, notifySuccess } from '../helpers';
const baseUrl = "http://127.0.0.1:4000/api";

export const register = createAsyncThunk('auth/register', async (data, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {

        const response = await axios.post(`${baseUrl}/register`,
            {
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password
            }
            , {

            }

        )
        const result = await response.data;
        notifySuccess(result.message)

        return result;

    } catch (error) {
        notifyError(error.response.data.errors)

        return rejectWithValue(error.response.data)
    }

})
export const login = createAsyncThunk('auth/login', async (data, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {

        const response = await axios.post(`${baseUrl}/login`,
            {
                email: data.email,
                password: data.password
            }, {

        }

        )
        const result = await response.data;
        notifySuccess(result.message)
        return result;

    } catch (error) {
        notifyError(error.response.data.errors)
        return rejectWithValue(error.response.data)
    }

})
export const forgetPassword = createAsyncThunk('auth/forget-password', async (data, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {

        const response = await axios.post(`${baseUrl}/forget-password`,
            {
                email: data.email,
            }, {
        }

        )
        const result = await response.data;
        notifySuccess(result.message)
        return result;

    } catch (error) {
        notifyError(error.response.data.errors)
        return rejectWithValue(error.response.data)
    }

})
export const resetPassword = createAsyncThunk('auth/reset-password', async (data, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {

        const response = await axios.post(`${baseUrl}/reset-password/${data.id}`,

            {
                password: data.password,
                token: data.token,
            }, {
        }

        )

        const result = await response.data;
        notifySuccess(result.message)
        return result;

    } catch (error) {
        notifyError(error.response.data.errors)
        return rejectWithValue(error.response.data)
    }

})

export const getProfile = createAsyncThunk('auth/getProfile', async (ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    try {
        const response = await axios.get(`${baseUrl}/profile`)
        const result = await response.data;

        return result;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const refreshToken = createAsyncThunk('auth/refreshToken', async (ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;

    try {
        const response = await axios.get(`${baseUrl}/refresh`, { withCredentials: true })
        const result = await response.data;
        return result;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const userData = localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))
    : null

const initialState = {
    user: userData,
    message: null,
    errors: null,
}
const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
        clearMessage: (state) => {
            state.message = '';
        },
        clearUser: (state) => {
            state.user = null
        }
        ,
        logout: (state) => {
            localStorage.removeItem('userData');
            Cookies.remove('token')
            state.user = null;
            notifySuccess("User logged out")
        }
    },

    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(register.fulfilled, (state, action) => {
            state.message = action.payload?.message;
            state.isLoading = false

        }).addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.errors = action.payload?.errors;
        })

            .addCase(login.pending, (state, action) => {
                state.isLoading = true;
            }).addCase(login.fulfilled, (state, action) => {
                Cookies.set('token', JSON.stringify(action.payload.token),)
                localStorage.setItem("userData", JSON.stringify(action.payload.user))
                state.user = action.payload.user;
                state.message = action.payload?.message;
                state.isLoading = false
            }).addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload?.errors;
            })

            .addCase(refreshToken.pending, (state, action) => {
                state.isLoading = true;
            }).addCase(refreshToken.fulfilled, (state, action) => {
                Cookies.set('token', JSON.stringify(action.payload.token),)
                state.message = action.payload?.message;
                state.isLoading = false
            }).addCase(refreshToken.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload?.errors;
            })

            .addCase(resetPassword.pending, (state, action) => {
                state.isLoading = true;
            }).addCase(resetPassword.fulfilled, (state, action) => {
                state.message = action.payload?.message;
                state.isLoading = false
            }).addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload?.errors;
            })

            .addCase(forgetPassword.pending, (state, action) => {
                state.isLoading = true;
            }).addCase(forgetPassword.fulfilled, (state, action) => {
                state.message = action.payload?.message;
                state.isLoading = false
            }).addCase(forgetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload?.errors;
            })


            .addCase(getProfile.pending, (state, action) => {
                state.isLoading = true;
            }).addCase(getProfile.fulfilled, (state, action) => {
                state.user = action.payload?.user
                state.message = action.payload?.message;
                state.isLoading = false
            }).addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload?.errors;
            })
    }
})

export const { clearErrors, clearMessage, logout, clearUser } = authSlice.actions
export default authSlice.reducer