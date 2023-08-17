import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUsers,
  getFollowUser,
  getLikePost,
  getPost,
  getUpdatePhoto,
  userLogin,
  userLogout,
  userMe,
  userPost,
  userRegister,
} from "./authapiSlice";

//create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    message: null,
    error: null,
    loading: false,
    posts: [],
    users: [],
    theme: "light",
  },
  reducers: {
    setMessageEmpty: (state) => {
      (state.message = null), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    // regester
    builder.addCase(userRegister.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      // (state.user = action.payload.data.user),
      (state.loading = false), (state.message = action.payload.data.message);
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      (state.error = action.error.message), (state.loading = false);
    });

    // loging

    builder.addCase(userLogin.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      (state.loading = false),
        (state.message = action.payload.data.message),
        (state.user = action.payload.data.user);
      localStorage.setItem("user", JSON.stringify(action.payload.data.user));
    });

    builder.addCase(userLogin.rejected, (state, action) => {
      (state.loading = false), (state.error = action.error.message);
    });

    // logout

    builder.addCase(userLogout.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(userLogout.fulfilled, (state, action) => {
      (state.loading = false),
        (state.message = action.payload.data.message),
        (state.user = null);
      localStorage.removeItem("user");
    });

    // get me

    builder.addCase(userMe.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userMe.fulfilled, (state, action) => {
      (state.loading = false),
        (state.message = action.payload.data.message),
        (state.user = action.payload.data.me);
    });

    builder.addCase(userMe.rejected, (state, action) => {
      (state.loading = false), console.log(action.error.message);
      (state.error = action.error.message), (state.user = null);
      // localStorage.removeItem("user");
    });

    //create post
    builder.addCase(userPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userPost.fulfilled, (state, action) => {
      state.message = action.payload.data.message;
      state.loading = false;
      state.posts.push(action.payload.data.post);
    });
    builder.addCase(userPost.rejected, (state, action) => {
      (state.error = action.error.message), (state.loading = false);
    });

    //get post
    builder.addCase(getPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.message = action.payload.data.message;
      state.loading = false;
      state.posts = action.payload.data.post;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      (state.error = action.error.message), (state.loading = false);
    });
    //get users

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.message = action.payload.data.message;
      state.loading = false;
      state.users = action.payload.data.users;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      (state.error = action.error.message), (state.loading = false);
    });
    //get users

    builder.addCase(getFollowUser.fulfilled, (state, action) => {
      state.message = action.payload.data.message;
      state.loading = false;
      state.user = action.payload.data.user;
    });
    builder.addCase(getFollowUser.rejected, (state, action) => {
      (state.error = action.error.message), (state.loading = false);
    });

    //get like a post

    builder.addCase(getLikePost.fulfilled, (state, action) => {
      // state.posts = action.payload.data.user;
      state.posts[
        state.posts.findIndex(
          (data) => data._id === action.payload.data.post._id
        )
      ] = action.payload.data.post;
    });
    builder.addCase(getLikePost.rejected, (state, action) => {
      state.error = action.error.message;
    });

    //get update user photo

    builder.addCase(getUpdatePhoto.fulfilled, (state, action) => {
      // state.posts = action.payload.data.user;
      state.user = action.payload.data.user;
    });
    builder.addCase(getUpdatePhoto.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

//export

// selectors
export const getUserData = (state) => state.auth;
// action
export const { setMessageEmpty } = authSlice.actions;
// slice
export default authSlice.reducer;
