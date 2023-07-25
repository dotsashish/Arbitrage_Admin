import * as CONSTANTS from "./constants";

const initialState = {
    loading:false,
    //loadingMessage:'Please wait...'
}

export default (state=initialState, action) => {
    switch(action.type) {
        case CONSTANTS.SET_LOADING_TRUE:
            return {
                ...state,
                loading:true,
                //loadingMessage:action.payload ? action.payload : 'Please wait...'
            }
        case CONSTANTS.SET_LOADING_FALSE:
            return {
                ...state,
                loading:false,
                //loadingMessage:''
            }  
        default:
            return state;          
    }
}