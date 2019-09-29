import * as actionTypes from '../actions/actionTypes';

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
            return {
                ...state,
                loading:true
            }
            
        case actionTypes.SUBMIT_SUCCESSFUL:
            let newOrder={
                ...action.orderData,
                id:action.orderId};// add id to orderData

            return {
                ...state,
                loading:false,
                orders:state.orders.concat(newOrder),
                purchased:true

            }

        case actionTypes.SUBMIT_FAILED:
            return {
                ...state,
                loading:false,
                error: action.error
            }
        case actionTypes.INIT_PURCHASE:
            return {
                ...state,
                purchased:false
            }
        case actionTypes.FETCH_ORDER:
            return{
                ...state,
                loading:true
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                orders:action.fetchedOrders
            }
        case actionTypes.FETCH_ORDER_FAILED:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        default:
            return state;
    }

}

export default reducer;