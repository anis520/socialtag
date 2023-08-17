import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk(
  "auth/createRegister",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/v1/register/`,
        data
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const userLogin = createAsyncThunk("auth/createLogin", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:9000/api/v1/login/`,
      data,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const userLogout = createAsyncThunk("auth/createLogout", async () => {
  try {
    const response = await axios.get(
      `http://localhost:9000/api/v1/logout/`,

      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const userMe = createAsyncThunk("auth/userMe", async () => {
  try {
    const response = await axios.get("http://localhost:9000/api/v1/me", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
export const userPost = createAsyncThunk("auth/userPost", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/api/v1/post",
      data,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getPost = createAsyncThunk("auth/getPost", async () => {
  try {
    const response = await axios.get("http://localhost:9000/api/v1/post", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//////
export const getAllUsers = createAsyncThunk("auth/getAllUsers", async () => {
  try {
    const response = await axios.get(
      "http://localhost:9000/api/v1/users",

      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//////
export const getFollowUser = createAsyncThunk(
  "auth/getFollowUser",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/followuser",
        data,

        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
////// like and unlike a post
export const getLikePost = createAsyncThunk(
  "auth/getLikePost",
  async (data) => {
    try {
      const response = await axios.put(
        "http://localhost:9000/api/v1/post",
        data,

        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
////// like and unlike a post
export const getUpdatePhoto = createAsyncThunk(
  "auth/getUpdatePhoto",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/userphoto",
        data,

        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
