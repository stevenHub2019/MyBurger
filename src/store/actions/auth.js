import * as actionTypes from './actionTypes';
import axios from 'axios';


const authStart=()=>({
    type:actionTypes.AUTH_START
});

const authSuccess=(authData)=>({
    type:actionTypes.AUTH_SUCCESS,
    authData: authData
});

const authFailed=(err)=>({
    type:actionTypes.AUTH_FAILED,
    error:err
});


export const auth=(email,password)=>{
    return dispatch=>{
        dispatch(authStart());
        // async code
        const signUpPost={
            email:email,
            password:password,
            returnSecureToken:true
        }

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnqgHhPvD6JG6UaNH8p2WczG9zOHotRzw',signUpPost)
            .then(response=>{
                dispatch(authSuccess(response.data));
                console.log(response.data);
            }).catch(error=>{
                dispatch(authFailed(error));
            });
    };
};