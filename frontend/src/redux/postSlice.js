import { createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    post: [],
    posts: [],
  },
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { setPost, setPosts } = postSlice.actions;
export default postSlice.reducer;
