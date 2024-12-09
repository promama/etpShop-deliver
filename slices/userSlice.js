import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: "",
  status: "idle",
  token: "defau",
  message: "",
  phoneNumber: "",
  gender: "",
  dob: "",
  allowAccess: false,
  addressInfos: {},
  isLoading: false,
  notificationList: [],
  unreadNotify: 0,
};

// const base_url = "https://e-tpshop-backend.onrender.com";
// const base_url = "http://192.168.0.108:5000";
const base_url = "http://192.168.100.23:5000";

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (userInfos, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${base_url}/deliver/login`, userInfos);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchSignUp = createAsyncThunk(
  "user/fetchSignUp",
  async (userInfos, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${base_url}/deliver/signup`, userInfos);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchVerify = createAsyncThunk(
  "user/fetchVerify",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
        data: { email: token.email },
        method: "POST",
        // url: `http://${ip_address}:5000/user/verify`,
        url: `${base_url}/deliver/verify`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.email = "";
      state.status = "idle";
      state.token = "";
      state.message = "";
      state.phoneNumber = "";
      state.gender = "";
      state.dob = "";
      state.allowAccess = false;
    },
    changeNotify: (state, action) => {
      state.notificationList = action.payload.deliverNoti;
      state.unreadNotify = action.payload.deliverUnreadNoti;
    },
  },
  extraReducers: (builder) => {
    //sign in
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = "success";
      state.message = "login success!";
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.gender = action.payload.gender;
      state.dob = action.payload.birthDay;
      state.isLoading = false;
      state.allowAccess = true;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
      state.allowAccess = false;
    });

    //sign up
    builder.addCase(fetchSignUp.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.isLoading = false;
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });

    //verify
    builder.addCase(fetchVerify.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchVerify.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.allowAccess = true;
      state.isLoading = false;
    });
    builder.addCase(fetchVerify.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
      state.allowAccess = false;
    });
  },
});

export const { reset, changeNotify } = userSlice.actions;

export default userSlice.reducer;
