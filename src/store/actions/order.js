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
                dispatch(submitFailed(error))

            });
                //this.props.history.push('/');  ???
    }
}



