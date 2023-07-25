const setJwt = token => {
    localStorage.setItem("accessToken", token);
}

const getJwt = () => {
    const token = localStorage.getItem("accessToken");
    if(token !== null && token !== undefined) {
        return token;
    } else {
        return null;
    }
}

const removeJWT = () => {
    localStorage.removeItem("accessToken");
}

const isValidToken = () => {
    const token = getJwt();
    if(!token) {
        return false
    }
    return true;
}

export default {
    setJwt,
    getJwt,
    removeJWT,
    isValidToken
}