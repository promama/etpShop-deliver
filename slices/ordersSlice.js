import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  message: "",
  status: "idle",
  isLoading: false,
  notificationList: [],
  unreadNotify: 0,
  orders: [],
  delivering: [],
  success: [],
  cancel: [],
  singleOrderDetail: {},
};

// const base_url = "https://e-tpshop-backend.onrender.com";
//const base_url = "http://192.168.0.108:5000";
//const base_url = "http://172.16.30.66:5000";
// const base_url = "http://172.21.22.135:5000";
const base_url = "http://192.168.184.142:5000";

export const fetchShowOrderDetail = createAsyncThunk(
  "order/fetchShowOrderDetail",
  async (userInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${userInfos.access_token}`,
        },
        data: { email: userInfos.email, orderId: userInfos.orderId },
        method: "POST",
        // url: `http://${ip_address}:5000/user/verify`,
        url: `${base_url}/deliver/showOrderDetail`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchFinishOrder = createAsyncThunk(
  "order/fetchFinishOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${orderData.access_token}`,
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        data: orderData.data,
        // url: `http://${ip_address}:5000/user/verify`,
        url: `${base_url}/deliver/uploadImage`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchShowCancelOrder = createAsyncThunk(
  "order/fetchShowCancelOrder",
  async (userInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${userInfos.access_token}`,
        },
        data: { email: userInfos.email },
        method: "POST",
        // url: `http://${ip_address}:5000/user/verify`,
        url: `${base_url}/deliver/showCancelOrder`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchSuccessOrder = createAsyncThunk(
  "order/fetchSuccessOrder",
  async (userInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${userInfos.access_token}`,
        },
        data: { email: userInfos.email },
        method: "POST",
        // url: `http://${ip_address}:5000/user/verify`,
        url: `${base_url}/deliver/showSuccessOrder`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchCancelOrder = createAsyncThunk(
  "order/fetchCancelOrder",
  async (userInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${userInfos.access_token}`,
        },
        data: {
          email: userInfos.email,
          orderId: userInfos.orderId,
          reason: userInfos.reason,
        },
        method: "POST",
        // url: `http://${ip_address}:5000/user/verify`,
        url: `${base_url}/deliver/cancelOrder`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchDeliveringOrder = createAsyncThunk(
  "order/fetchDeliveringOrder",
  async (userInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${userInfos.access_token}`,
        },
        data: { email: userInfos.email },
        method: "POST",
        // url: `http://${ip_address}:5000/user/verify`,
        url: `${base_url}/deliver/showDeliveringOrder`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchTakeOrder = createAsyncThunk(
  "order/fetchTakeOrder",
  async (userInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${userInfos.access_token}`,
        },
        data: { email: userInfos.email, orderId: userInfos.orderId },
        method: "POST",
        // url: `http://${ip_address}:5000/user/verify`,
        url: `${base_url}/deliver/takeOrder`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async (userInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${userInfos.access_token}`,
        },
        data: { email: userInfos.email },
        method: "POST",
        // url: `http://${ip_address}:5000/user/verify`,
        url: `${base_url}/deliver/showAllOrder`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrders: (state, action) => {
      state.message = "";
      state.status = "idle";
      (state.isLoading = false), (state.notificationList = []);
      state.unreadNotify = 0;
      state.orders = [];
    },
    setMyDeliverOrder: (state, action) => {
      state.delivering = action.payload.listOrder;
    },
    changeAllOrderList: (state, action) => {
      state.orders = action.payload.listOrder;
    },
  },
  extraReducers: (builder) => {
    //show all deliverable orders
    builder.addCase(fetchAllOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.status = "success";
      state.token = action.payload.token;
      state.orders = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });

    //take a deliverable orders
    builder.addCase(fetchTakeOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTakeOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.token = action.payload.token;
      state.orders = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(fetchTakeOrder.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });

    //show order on delivering
    builder.addCase(fetchDeliveringOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDeliveringOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.token = action.payload.token;
      state.delivering = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(fetchDeliveringOrder.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });

    //cancel order
    builder.addCase(fetchCancelOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCancelOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.token = action.payload.token;
      state.delivering = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(fetchCancelOrder.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });

    //show order on success
    builder.addCase(fetchSuccessOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSuccessOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.token = action.payload.token;
      state.success = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(fetchSuccessOrder.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });

    //show finish order
    builder.addCase(fetchFinishOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFinishOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.isLoading = false;
    });
    builder.addCase(fetchFinishOrder.rejected, (state, action) => {
      state.status = "fail";
      state.isLoading = false;
    });

    //show cancel order
    builder.addCase(fetchShowCancelOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchShowCancelOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.cancel = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(fetchShowCancelOrder.rejected, (state, action) => {
      state.status = "fail";
      state.isLoading = false;
    });

    //show order detail
    builder.addCase(fetchShowOrderDetail.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchShowOrderDetail.fulfilled, (state, action) => {
      state.status = "success";
      state.singleOrderDetail = action.payload.listOrder[0];
      state.isLoading = false;
    });
    builder.addCase(fetchShowOrderDetail.rejected, (state, action) => {
      state.status = "fail";
      state.isLoading = false;
    });
  },
});

export const { resetOrders, setMyDeliverOrder, changeAllOrderList } =
  ordersSlice.actions;

export default ordersSlice.reducer;
