import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './constants';
import { AuthService } from '../../../Components/Services';
import { JWT } from '../../../Components/Shared';

export const login = (data) => async (dispatch) => {
  try {
    const response = await AuthService.Login(data);
    debugger
    if (response.success) {
      dispatch({ type: LOGIN_SUCCESS, payload: response.token });
      JWT.setJwt(response.token);
      return response;
    } else {
      dispatch({ type: LOGIN_FAILED, payload: null });
      return response;
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILED, payload: null });
    return Promise.reject(error);
  }
};

export const logout = () => (dispatch) => {
    JWT.removeJWT();
    dispatch({ type: LOGOUT });
};