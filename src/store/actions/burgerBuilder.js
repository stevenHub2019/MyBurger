import axios from '../../axios-order';
import * as actionTypes from './actionTypes';

//sync updateIngr of async getIngr
const updateIngr=(ingredients)=>{
    return{
        type:actionTypes.GET_INGR,
        ingredients: ingredients
    }
}

const updateError=(error)=>{
    return {
        type:actionTypes.ERROR,
        error: error
    }
}

//async getIngr
export const getIngr=()=>{
    return dispatch=>{
        axios.get('https://react-my-burger-49767.firebaseio.com/ingredients.json').then(
            response=>{
                dispatch(updateIngr(response.data));         
            }
        ).catch(error=>{
            dispatch(updateError(error));
        });
    }

};

export const addIngr=(type)=>{
    return{
        type:actionTypes.ADD_INGR,
        ingrType:type
    }

};

export const removeIngr=(type)=>{
    return{
        type:actionTypes.REMOVE_INGR,
        ingrType:type

    }

};

