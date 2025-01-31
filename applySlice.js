import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import applyService from "@/features/apply/applyService";

const initialState = {
  application: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const applyForJob = createAsyncThunk(
  'applications/applyForJob',
  async (applicationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await applyService.applyForJob(applicationData, token);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getApplications = createAsyncThunk(
  'applications/getApplications',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await applyService.getApplications(token);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const applications = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    reset: (state) => {
      state.application = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyForJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.application = action.payload;
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.application = action.payload;
      })
      .addCase(getApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = applications.actions;

export default applications.reducer;
