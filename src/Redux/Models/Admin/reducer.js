import * as CONSTANTS  from './constants';

const initialState = {
}
 
const adminReducer =  (state=initialState, action) => { 
    switch(action.type) {
      case CONSTANTS.GET_ALL_FAQ: 
        return {
             ...state,
          }
      case CONSTANTS.FAQ_UPDATE:
         return {
           userInfo:action.payload
         }
      case CONSTANTS.FAQ_FAILLED:{
         return {...state, accessToken:null}
      }

      case CONSTANTS.ABOUT_GET_ALL: 
        return {
             ...state,
          }
      case CONSTANTS.ABOUT_UPDATE:
         return {
           userInfo:action.payload
         }
      case CONSTANTS.ABOUT_FAILLED:{
         return {...state, accessToken:null}
      }

      case CONSTANTS.TERM_GET_ALL: 
        return {
             ...state,
          }
      case CONSTANTS.TERM_UPDATE:
         return {
           userInfo:action.payload
         }
      case CONSTANTS.TERM_FAILLED:{
         return {...state, accessToken:null}
      }

      case CONSTANTS.LEGAL_GET_ALL: 
        return {
             ...state,
          }
      case CONSTANTS.LEGAL_UPDATE:
         return {
           userInfo:action.payload
         }
      case CONSTANTS.LEGAL_FAILLED:{
         return {...state, accessToken:null}
      }

      case CONSTANTS.NOTIFICATION_GET_ALL: 
      return {
           ...state,
        }
      case CONSTANTS.PARTNER_POST:
      return {
         data: action.payload.data,
      };
      case CONSTANTS.NOTIFICATION_UPDATE:
         return {
            userInfo:action.payload
         }
      case CONSTANTS.NOTIFICATION_FAILLED:{
         return {...state, accessToken:null}
      }

      case CONSTANTS.HELP_GET_ALL: 
        return {
             ...state,
          }
      case CONSTANTS.HELP_UPDATE:
         return {
           userInfo:action.payload
         }
      case CONSTANTS.HELP_FAILLED:{
         return {...state, accessToken:null}
      }

      case CONSTANTS.PARTNER_GET_ALL: 
      return {
           ...state,
        }
      case CONSTANTS.PARTNER_POST:
      return {
        data: action.payload.data,
      };
      
       case CONSTANTS.PARTNER_UPDATE:
          return {
             userInfo: action.payload
          }
       case CONSTANTS.PARTNER_FAILLED: {
          return { ...state, accessToken: null }
       }


       case CONSTANTS.CURRENCY_GET_ALL:
          return {
             ...state,
          }
       case CONSTANTS.CURRENCY_UPDATE:
          return {
             userInfo: action.payload
          }
       case CONSTANTS.CURRENCY_FAILLED: {
          return { ...state, accessToken: null }
       }


       case CONSTANTS.USER_GET_ALL:
          return {
           ...state,
        }
      case CONSTANTS.USER_UPDATE:
         return {
            userInfo:action.payload
         }
      case CONSTANTS.USER_FAILLED:{
         return {...state, accessToken:null}
      }

      case CONSTANTS.USER_PROFILEUPDATE:{
         return {
            ...state, userInfo:action.payload.data
         }
      }

      case CONSTANTS.PASSWORD_UPDATE:{
         return {
            ...state, isUpdated:action.payload
         }
      }
      case CONSTANTS.PASSWORD_FAILED:{
         return {...state, accessToken:null}
      }

          default:
       return initialState;          
    }
}

export default adminReducer;