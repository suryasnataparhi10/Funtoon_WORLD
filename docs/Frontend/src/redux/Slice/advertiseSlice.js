import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// FETCH ADVERTISE LIST
export const fetchAdvertises = createAsyncThunk(
  "advertise/fetchAdvertises",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/advertise");
      return res.data.advertise;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching data");
    }
  }
);

const advertiseSlice = createSlice({
  name: "advertise",
  initialState: {
    loading: false,
    advertiseList: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertises.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdvertises.fulfilled, (state, action) => {
        state.loading = false;
        state.advertiseList = action.payload;
      })
      .addCase(fetchAdvertises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default advertiseSlice.reducer;
