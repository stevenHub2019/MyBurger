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
        orderId:id,
        
    }

};

const submitFailed=(error)=>{
    return {
        type:actionTypes.SUBMIT_FAILED,
        error:error
    }

}


export const submitOrder=(orderData)=>{
    
    return dispatch=>{
        dispatch(postSubmit());
        axios.post('/orders.json',orderData).then( 
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

export const getOrder=()=>{
    return dispatch=>{
        dispatch(fetchOrder());
        axios.get('/orders.json').then((response)=>{
            let key;
            const fetchedOrders=[];// an array of order objects
            for(key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id:key
                });
            };
            dispatch(fetchOrderSucess(fetchedOrders));

        //this.setState({loading:false, orders:fetchedOrders});
        }).catch(err=>{
            dispatch(fetchOrderFailed(err));
            //this.setState({loading:false});
        });

    }
    

};
