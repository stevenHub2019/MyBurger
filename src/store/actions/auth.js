import * as actionTypes from './actionTypes';
import axios from 'axios';



const authStart=()=>({
    type:actionTypes.AUTH_START
});

const authSuccess=(authData)=>({
    type:actionTypes.AUTH_SUCCESS,
    token: authData.idToken,
    userId: authData.localId
});

const authFailed=(err)=>({
    type:actionTypes.AUTH_FAILED,
    errorMsg:err
});

export const logout=()=>{
    return {
        type:actionTypes.LOG_OUT,
    }
}



//dispatch method is provided by thunk function wrapper
const tokenExpTimeout=expiresIn=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout());           
        },expiresIn);
    };
};


export const auth=(email,password, isSignUp)=>{
    return dispatch=>{
        dispatch(authStart());
        // async code
        const authPost={
            email:email,
            password:password,
            returnSecureToken:true
        }

        let endpoint='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnqgHhPvD6JG6UaNH8p2WczG9zOHotRzw'
        if(!isSignUp){
            endpoint='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnqgHhPvD6JG6UaNH8p2WczG9zOHotRzw'
        }
    
        axios.post(endpoint,authPost)
            .then(response=>{
                dispatch(authSuccess(response.data));
                dispatch(tokenExpTimeout(+response.data.expiresIn*3600));

                //console.log(response.data);
            }).catch(err=>{
                dispatch(authFailed(err.response.data.error.message));
                console.log(err.response.data.error.message);
                console.dir(err);
                //console.log(err);
                //console.log(err.message);

            });
    };
};