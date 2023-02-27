import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


// Define a type for the slice state
interface PostState {
  post : any,
}

// Define the initial state using that type
const initialState: PostState = {
  post: []
}

export const PostState = createSlice({
  name: 'post',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAllPosts: (state, action: PayloadAction<any>) => {
      state.post = action.payload
    },
    setAddPost: (state, action: PayloadAction<any>) => {
        state.post  = [...state.post,action.payload]
    },
  
  }, 
})

export const { setAllPosts , setAddPost } = PostState.actions

// Other code such as selectors can use the imported `RootState` type
export const getPost = (state: RootState) => state.post

export default PostState.reducer