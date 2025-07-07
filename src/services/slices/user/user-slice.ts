import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../sliceNames';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '@utils-cookie';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { AppDispatch } from 'src/services/store/store';

interface UserState {
  isInit: boolean;
  user: TUser | null;
  error: string | null;
}

const initialState: UserState = {
  isInit: false,
  user: null,
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

export const checkUserAuth = () => (dispatch: AppDispatch) => {
  if (getCookie('accessToken')) {
    dispatch(getUser()).finally(() => {
      dispatch(authChecked());
    });
  } else {
    dispatch(authChecked());
  }
};

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
  reducers: {
    authChecked: (state) => {
      state.isInit = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isInit = false;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.isInit = true;
      state.user = payload.user;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.error.message as string;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isInit = false;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isInit = true;
      state.user = payload.user;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error.message as string;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.error.message as string;
    });

    builder.addCase(getUser.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.user = payload.user;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = action.error.message as string;
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.error = action.error.message as string;
    });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isInit
  }
});

export const { selectUser, selectIsAuthChecked } = userSlice.selectors;
export const { authChecked } = userSlice.actions;
