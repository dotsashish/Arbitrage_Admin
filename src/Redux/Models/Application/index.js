import store from '../../store';
import * as ACTIONS from './action';

const obj = {
    sliceString:(str, length)=>{
        if(str && str.toString().length > length) {
            return str.slice(0, length)+"...";
        }
        return str;
    },
    setLoading:(val, message)=>store.dispatch(ACTIONS.setLoading(val, message)),
}

export default obj;