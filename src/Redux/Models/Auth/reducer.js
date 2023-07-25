
// import { JWT } from '../../../Components/Shared';
// import {LOGOUT, LOGIN_SUCCESS, LOGIN_FAILED} from './constants';

// const initialState = {
//     isLoggedIn:JWT.isValidToken(),
//     accessToken:JWT.getJwt(),
// }

// const authReducer = (state=initialState, action)=>{
//        switch(action.type) {
//            case LOGIN_SUCCESS:
//                return {...state, isLoggedIn:true, accessToken:action.payload}
//            case LOGIN_FAILED:{
//                return {...state, isLoggedIn:false, accessToken:null}
//            }
//            case LOGOUT:{
//             return {...state, isLoggedIn:false, accessToken:null}
//            }
           
//            default:
//                return initialState;
//        }
// }

// export default authReducer;

import { JWT } from '../../../Components/Shared';
import { LOGOUT, LOGIN_SUCCESS, LOGIN_FAILED } from './constants';

const initialState = {
  isLoggedIn: JWT.isValidToken(),
  accessToken: JWT.getJwt(),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, accessToken: action.payload };
    case LOGIN_FAILED:
      return { ...state, isLoggedIn: false, accessToken: null };
    case LOGOUT:
      return { ...state, isLoggedIn: false, accessToken: null };
    default:
      return state;
  }
};

export default authReducer;