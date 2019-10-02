import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/utility';

const initialState={
    ingredients:null,
    totalPrice:2,
    ingrPrice:{         //manage by redux
        salad:1,
        cheese:1,
        meat:2,
        bacon:1.5   
    },
    error:null,
    building:false
}

const getIngr=(state,action)=>{
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
            error:null,
            building: false
        });

};

const error=(state,action)=>{return updateObject(state,{error:action.error});};

const addIngr=(state,action)=>{
    // increment ingredient count
    const updatedIngredients={...state.ingredients};
    updatedIngredients[action.ingrType]++

    //update price
    const updatedPrice=state.totalPrice+state.ingrPrice[action.ingrType];

    return updateObject(state,{
        ingredients:updatedIngredients,
        totalPrice:updatedPrice,
        building:true
    });
};

const removeIngr=(state,action)=>{
    const updatedIngr=updateObject(state.ingredients,{[action.ingrType]:state.ingredients[action.ingrType]-1});
    return updateObject(state,{
        ingredients:updatedIngr,
        totalPrice:state.totalPrice- state.ingrPrice[action.ingrType],
        building:true
    });
};

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.GET_INGR: return getIngr(state,action);           
        case actionTypes.ERROR: return error(state,action);
        case actionTypes.ADD_INGR: return addIngr(state, action);
        case actionTypes.REMOVE_INGR: return removeIngr(state,action);
        default:return state;
    }
}

export default reducer;