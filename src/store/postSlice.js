import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id : "",
    title : "",
    fileId : "",
    data : {},
    posts: [],
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers : {
        configurePost: (state,action) => {
            state.data = action.payload
            state.id = action.payload.$id
            state.title = action.payload.title
            state.fileId = action.payload.featuredimg
        },
        Allposts: (state,action) => {
            state.posts = action.payload
        },
    }
})

export const {configurePost , Allposts} = postSlice.actions;

export default postSlice.reducer;