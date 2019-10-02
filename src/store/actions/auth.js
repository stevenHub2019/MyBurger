import * as actionTypes from './actionTypes';
import axios from 'axios';

//actionCreators

const authStart=()=>({
    type:actionTypes.AUTH_START
});

const authSuccess=(token,userId)=>({
    type:actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
});

const authFailed=(err)=>({
    type:actionTypes.AUTH_FAILED,
    errorMsg:err
});

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirDate');
    localStorage.removeItem('userId');
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
                const expirDate= new Date(new Date().getTime()+response.data.expiresIn*1000); //firebase expiresIn is in sec
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirDate',expirDate);
                localStorage.setItem('userId',response.data.localId);

                dispatch(authSuccess(response.data.idToken,response.data.localId));
                dispatch(tokenExpTimeout(+response.data.expiresIn*1000));

                console.log(response.data);
            }).catch(err=>{
                dispatch(authFailed(err.response.data.error.message));
                //console.log(err.response.data.error.message);
                //console.dir(err);
             
            });
    };
};

export const setAuthRedirectPath= (path)=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const checkAuthState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const expirDate= new Date (localStorage.getItem('expirDate'));
            if(expirDate<new Date()){
                dispatch(logout());
            }else{
                const expiresIn= expirDate-new Date(); //in ms
                dispatch(tokenExpTimeout(expiresIn));

                const userId=localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));

                //checking
                //localStorage.setItem('expirTime',expiresIn);
            }
        }
    }
}