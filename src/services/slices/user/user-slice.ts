import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../sliceNames';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '@utils-cookie';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';

interface UserState {
  isInit: boolean;
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isInit: false,
  user: null,
  isLoading: false,
  error: null
};

export const registerUser = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (data: TRegisterData) => await updateUserApi(data)
);

export const getUser = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  async () => await getUserApi()
);

export const logoutUser = createAsyncThunk(
  `${USER_SLICE_NAME}/logoutUser`,
  async () => {
    await logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
    });
  }
);

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isInit = false;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.isInit = true;
      state.user = payload.user;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isInit = false;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isInit = true;
      state.user = payload.user;
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.isLoading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });

    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.isInit = true;
      state.user = payload.user;
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.isInit = false;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isInit = false;
      state.user = null;
      state.isLoading = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
  selectors: {
    selectUser: (state) => state.user
  }
});

export const { selectUser } = userSlice.selectors;
