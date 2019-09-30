import * as actionTypes from '../actions/actionTypes';

const initialState={

};

const reducer=(state=initialState, action)=>{
    switch (action.type) {
        case actionTypes.AUTH_SUBMIT_START:
            return ;
        default:
            return state;
    }

}

export default reducer;