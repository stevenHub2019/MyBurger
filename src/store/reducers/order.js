import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility/utility';

const initialState={
    orders:[],
    loading:false,
    error: null,   
    purchased:false
}

// order form  , payload : totalPrice  and ingredients


const reducer=(state=initialState, action)=>{
    switch (action.type) {
        case actionTypes.SUBMIT_ORDER:
            return updateObject(state, {loading:true});
            // {
            //     ...state,
            //     loading:true
            // }
            
        case actionTypes.SUBMIT_SUCCESSFUL:{
            let newOrder=updateObject(action.orderData,{id:action.orderId});
            // {
            //     ...action.orderData,
            //     id:action.orderId};// add id to orderData
            const updatedState={
                loading:false,
                orders:state.orders.concat(newOrder),
                purchased:true
            }
            return updateObject(state,updatedState);
            // {
            //     ...state,
            //     loading:false,
            //     orders:state.orders.concat(newOrder),
            //     purchased:true
            // }

            }

        case actionTypes.SUBMIT_FAILED:{
            return updateObject(state,{
                loading:false,
                error: action.error})
        }
            // return {
            //     ...state,
            //     loading:false,
            //     error: action.error
            // }

        case actionTypes.INIT_PURCHASE:
            return updateObject(state,{purchased:false});
            // {
            //     ...state,
            //     purchased:false
            // }
        case actionTypes.FETCH_ORDER:
            return updateObject(state,{loading:true});
            // {
            //     ...state,
            //     loading:true
            // }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return updateObject(state,{
                loading:false,
                orders:action.fetchedOrders
            });
            // {
            //     ...state,
            //     loading:false,
            //     orders:action.fetchedOrders
            // }
        case actionTypes.FETCH_ORDER_FAILED:
            return updateObject(state,{
                loading:false,
                error:action.error
            })
            // {
            //     ...state,
            //     loading:false,
            //     error:action.error
            // }
        default:
            return state;
    }

}

export default reducer;