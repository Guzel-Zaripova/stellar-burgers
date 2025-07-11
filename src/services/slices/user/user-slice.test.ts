import { TUser } from '@utils-types';
import {
  authChecked,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userSliceReducer,
  UserState
} from './user-slice';
import { TRegisterData } from '@api';

describe('Проверка работы слайса userSlice', () => {
  const initialState: UserState = {
    isInit: false,
    user: null,
    error: null
  };

  const userRegisterData = {
    email: 'test@example.com',
    name: 'TestName',
    password: 'password'
  };

  const userData: TUser = { email: 'test@example.com', name: 'TestName' };

  const expectState = (actualState: UserState, expectedState: UserState) => {
    expect(actualState).toEqual(expectedState);
  };

  describe('Проверка действия authChecked', () => {
    it('Должен обрабатывать authChecked', () => {
      const expectedState = { ...initialState, isInit: true };
      const actualState = userSliceReducer(initialState, authChecked());
      expectState(actualState, expectedState);
    });
  });

  describe('Тесты для регистрации пользователя', () => {
    it('Должен обрабатывать registerUser.pending', () => {
      const actualState = userSliceReducer(
        initialState,
        registerUser.pending('', userRegisterData)
      );
      const expectedState = { ...initialState, error: null };
      expectState(actualState, expectedState);
    });

    it('Должен обрабатывать registerUser.fulfilled', () => {
      const actualState = userSliceReducer(
        initialState,
        registerUser.fulfilled(
          {
            success: true,
            refreshToken: 'someRefreshToken',
            accessToken: 'someAccessToken',
            user: userData
          },
          '',
          userRegisterData
        )
      );
      const expectedState = {
        ...initialState,
        isInit: true,
        user: userData
      };
      expectState(actualState, expectedState);
    });

    it('Должен обрабатывать registerUser.rejected', () => {
      const actualState = userSliceReducer(
        initialState,
        registerUser.rejected(
          new Error('Ошибка регистрации'),
          '',
          userRegisterData
        )
      );
      const expectedState = { ...initialState, error: 'Ошибка регистрации' };
      expectState(actualState, expectedState);
    });
  });

  describe('Тесты для входа пользователя', () => {
    it('Должен обрабатывать loginUser.pending', () => {
      const actualState = userSliceReducer(
        initialState,
        loginUser.pending('', userRegisterData)
      );
      const expectedState = { ...initialState, error: null };
      expectState(actualState, expectedState);
    });

    it('Должен обрабатывать loginUser.fulfilled', () => {
      const actualState = userSliceReducer(
        initialState,
        loginUser.fulfilled(
          {
            success: true,
            refreshToken: 'someRefreshToken',
            accessToken: 'someAccessToken',
            user: userData
          },
          '',
          userRegisterData
        )
      );
      const expectedState = {
        ...initialState,
        isInit: true,
        user: userData
      };
      expectState(actualState, expectedState);
    });

    it('Должен обрабатывать loginUser.rejected', () => {
      const actualState = userSliceReducer(
        initialState,
        loginUser.rejected(new Error('Ошибка входа'), '', userRegisterData)
      );
      const expectedState = { ...initialState, error: 'Ошибка входа' };
      expectState(actualState, expectedState);
    });
  });

  describe('Тесты для обновления пользователя', () => {
    const userUpdateData: TRegisterData = {
      email: 'test@example.com',
      name: 'TestName',
      password: 'newPassword'
    };

    it('Должен обрабатывать updateUser.pending', () => {
      const actualState = userSliceReducer(
        initialState,
        updateUser.pending('', userUpdateData)
      );
      const expectedState = { ...initialState, error: null };
      expectState(actualState, expectedState);
    });

    it('Должен обрабатывать updateUser.fulfilled', () => {
      const actualState = userSliceReducer(
        initialState,
        updateUser.fulfilled(
          { success: true, user: userData },
          '',
          userUpdateData
        )
      );
      const expectedState = { ...initialState, user: userData };
      expectState(actualState, expectedState);
    });

    it('Должен обрабатывать updateUser.rejected', () => {
      const actualState = userSliceReducer(
        initialState,
        updateUser.rejected(new Error('Ошибка обновления'), '', userUpdateData)
      );
      const expectedState = { ...initialState, error: 'Ошибка обновления' };
      expectState(actualState, expectedState);
    });
  });

  describe('Тесты для получения пользователя', () => {
    it('Должен обрабатывать getUser.pending', () => {
      const actualState = userSliceReducer(
        initialState,
        getUser.pending('', undefined)
      );
      const expectedState = { ...initialState, error: null };
      expectState(actualState, expectedState);
    });

    it('Должен обрабатывать getUser.fulfilled', () => {
      const actualState = userSliceReducer(
        initialState,
        getUser.fulfilled({ success: true, user: userData }, '', undefined)
      );
      const expectedState = { ...initialState, user: userData };
      expectState(actualState, expectedState);
    });

    it('Должен обрабатывать getUser.rejected', () => {
      const actualState = userSliceReducer(
        initialState,
        getUser.rejected(
          new Error('Ошибка получения пользователя'),
          '',
          undefined
        )
      );
      const expectedState = {
        ...initialState,
        error: 'Ошибка получения пользователя'
      };
      expectState(actualState, expectedState);
    });
  });

  describe('Тесты для выхода пользователя', () => {
    it('Должен обрабатывать logoutUser.pending', () => {
      const actualState = userSliceReducer(
        initialState,
        logoutUser.pending('', undefined)
      );
      const expectedState = { ...initialState, error: null };
      expectState(actualState, expectedState);
    });

    it('Должен обрабатывать logoutUser.fulfilled', () => {
      const actualState = userSliceReducer(
        initialState,
        logoutUser.fulfilled(undefined, '')
      );
      const expectedState = { ...initialState, user: null };
      expectState(actualState, expectedState);
    });

    it('Должен обрабатывать logoutUser.rejected', () => {
      const actualState = userSliceReducer(
        initialState,
        logoutUser.rejected(new Error('Ошибка выхода'), '', undefined)
      );
      const expectedState = { ...initialState, error: 'Ошибка выхода' };
      expectState(actualState, expectedState);
    });
  });
});
