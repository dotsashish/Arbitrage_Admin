import {login, logout} from './action';
import store from '../../store';

const model = {
    userLogin: (data)=>{
        return store.dispatch(login(data));
    },
    logout: () => {
       return store.dispatch(logout());
    }
}

export default model;