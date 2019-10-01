import * as actionTypes from './actionTypes';
import axios from '../../axios-order';


const postSubmit=()=>{
    return {
        type:actionTypes.SUBMIT_ORDER
    }
}

const submitSuccessful=(id,orderData)=>{
    return {
        type: actionTypes.SUBMIT_SUCCESSFUL,
        orderData:orderData,
        orderId:id     
    }

};

const submitFailed=(error)=>{
    return {
        type:actionTypes.SUBMIT_FAILED,
        error:error
    }
}


export const submitOrder=(orderData,token)=>{
    
    return dispatch=>{
        dispatch(postSubmit());
        //  '/orders.json' determine the json file name in which the post data will be stored
        axios.post('/orders.json?auth='+token, orderData).then( 
            response=>{
                //console.log(response.data.name); // check out to extract id
                dispatch(submitSuccessful(response.data.name,orderData));
            }).catch(error=>{
                dispatch(submitFailed(error));
            });           
    }
}

export const initPurchase=()=>{
    return{
        type:actionTypes.INIT_PURCHASE
    }
}


const fetchOrder=()=>({
    type:actionTypes.FETCH_ORDER
});

const fetchOrderSucess=(fetchedOrders)=>({
    type:actionTypes.FETCH_ORDER_SUCCESS,
    fetchedOrders:fetchedOrders
});

const fetchOrderFailed=(err)=>({
    type:actionTypes.FETCH_ORDER_FAILED,
    error:err
});

export const getOrder=(token)=>{
    return dispatch=>{
        dispatch(fetchOrder());
        axios.get('/orders.json?auth='+token).then((response)=>{
            let key;
            const fetchedOrders=[];// an array of order objects
            for(key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id:key
                });
            };
            dispatch(fetchOrderSucess(fetchedOrders));

        }).catch(err=>{
            dispatch(fetchOrderFailed(err));
        });
    }
    
};
