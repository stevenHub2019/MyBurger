import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../store/utility/utility';

const initialState={
    ingredients:null,
    // {
    //     salad:0,
    //     cheese:0,
    //     bacon:0,
    //     meat:0 },
    totalPrice:2,
    ingrPrice:{         //manage by redux
        salad:1,
        cheese:1,
        meat:2,
        bacon:1.5   
    },
    error:null
}

const reducer=(state=initialState,action)=>{

    switch(action.type){
        case actionTypes.GET_INGR:

            //update totalPrice :long but secure way
            //ingr price
            let totalIngrPrice=0;
            Object.keys(action.ingredients).forEach((ingr)=>{
                totalIngrPrice += action.ingredients[ingr]*state.ingrPrice[ingr];
            });
            
            //base price
            const basePrice=2;
            //total price
            const updatedPrice=basePrice+totalIngrPrice;

            return updateObject(state,{
                ingredients:{
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat 
                },
                totalPrice: updatedPrice,
                error:null
            });
            // {
            //     ...state,
            //     ingredients: {
            //         salad:action.ingredients.salad,
            //         bacon:action.ingredients.bacon,
            //         cheese:action.ingredients.cheese,
            //         meat:action.ingredients.meat 
            //     },
            //     totalPrice: updatedPrice,
            //     error:null
             
            // }
        case actionTypes.ERROR:
            return updateObject(state,{error:action.error});
            // {
            //     ...state,
            //     error:action.error
            // }   
        
        case actionTypes.ADD_INGR: {
            // increment ingredient count
            const updatedIngredients={...state.ingredients};
            updatedIngredients[action.ingrType]++
        
            //update price
            const updatedPrice=state.totalPrice+state.ingrPrice[action.ingrType];

            return updateObject(state,{
                ingredients:updatedIngredients,
                totalPrice:updatedPrice});
        }

        case actionTypes.REMOVE_INGR:{
            const updatedIngr=updateObject(state.ingredients,{[action.ingrType]:state.ingredients[action.ingrType]-1});
            const updatedState={
                ingredients:updatedIngr,
                totalPrice:state.totalPrice- state.ingrPrice[action.ingrType]
            };
            return updateObject(state,updatedIngr);

            //  return {
            //      ...state,
            //      ingredients:{
            //          ...state.ingredients,
            //          [action.ingrType]:state.ingredients[action.ingrType]-1

            //      },
            //      totalPrice:state.totalPrice- state.ingrPrice[action.ingrType]
            //  }
        }

            
        default:
            return state;
    }
    
}

export default reducer;