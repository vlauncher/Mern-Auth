import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// Get user from LocalStorage
const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user:user ? user : null ,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

/* Actions Start */
export const register = createAsyncThunk('auth/register',async(userdata,thunkApi)=>{
    try {
        const response = await axios.post('http://localhost:8000/auth/register/',userdata)
        if(response.data){
            localStorage.setItem('user',JSON.stringify(response.data))
        }
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login',async(userdata,thunkApi)=>{
    try {
        const response = await axios.post('http://localhost:8000/auth/login/',userdata)
        if(response.data){
            localStorage.setItem('user',JSON.stringify(response.data))
        }
        return response.data
    } catch (error) {
         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})
export const logout = createAsyncThunk('auth/logout',async ()=>{
    localStorage.removeItem('user');
})

/* Actions Ends */


/* Reducer Starts */

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state) =>{
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(register.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected,(state,action)=>{
                state.isError = true
                state.user=null
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(login.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected,(state,action)=>{
                state.isError = true
                state.user=null
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(logout.fulfilled,(state)=>{
                state.user = null
            })
    }
})

/* Reducer Ends */

export const { reset } = authSlice.actions
export default authSlice.reducer;