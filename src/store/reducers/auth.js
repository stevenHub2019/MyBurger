import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility/utility';


const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:'/'
};

const authStart=(state)=>{
    return updateObject(state,{
        loading:true,
        error:null
    }); 
};

const authSuccess=(state,action)=>{
    //console.log(action.authData.localId);
    //console.log(action.authData.idToken);

    return updateObject(state,{
        userId: action.userId,
        token:action.token,
        loading:false

    })
};

const authFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        errorMsg:action.errorMsg
    });
};


const logOut=(state)=>{
    return updateObject(state,{
        userId:null,
        token:null,
        loading:false
    })
}

const setAuthRedirectPath=(state,action)=>{
    return updateObject(state, {
        authRedirectPath:action.path
    })
}

const reducer=(state=initialState, action)=>{
    switch (action.type) {
        case actionTypes.AUTH_START:return authStart(state,action);
        case actionTypes.AUTH_SUCCESS:return authSuccess(state,action);
        case actionTypes.AUTH_FAILED:return authFailed(state,action);      
        case actionTypes.LOG_OUT:return logOut(state);
        case actionTypes.SET_AUTH_REDIRECT_PATH:return setAuthRedirectPath(state,action);
        default:return state;
    }

}

export default reducer;