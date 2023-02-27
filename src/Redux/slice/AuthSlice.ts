import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


// Define a type for the slice state
interface AuthState {
  user: any,
  loading: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  loading: false
}

export const AuthSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
    setLoading: (state, action: PayloadAction<any>) => {
      state.loading = action.payload
    },
  
  },
})

export const { setUser , setLoading } = AuthSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getAuth = (state: RootState) => state.auth

export default AuthSlice.reducer