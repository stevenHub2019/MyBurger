import * as actionTypes from '../action';
import axios from '../../axios-order';

const initialState={
    ingredients:{
        salad:0,
        cheese:0,
        bacon:0,
        meat:0 },
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
        case actionTypes.GETINGR:
            axios.get('https://react-my-burger-49767.firebaseio.com/ingredients.json').then(
                response=>{
                    return {
                        ...state,
                        ingredients:response.data
                    }
                    //this.setState({ingredients:response.data})
                }
            ).catch(error=>{
                return{
                    error:error
                }
                //this.setState({error:error})
            });
            break;
        
        case actionTypes.ADD_INGR: {
            // increment ingredient count
            const updatedIngredients={...state.ingredients};
            updatedIngredients[action.ingrType]++
        
            //update price
            const updatedPrice=state.totalPrice+state.ingrPrice[action.ingrType];
            
            //update state
            return {
                ...state,
                ingredients:updatedIngredients,
                totalPrice:updatedPrice
            }
        }
        case actionTypes.REMOVE_INGR:{
             return {
                 ...state,
                 ingredients:{
                     ...state.ingredients,
                     [action.ingrType]:state.ingredients[action.ingrType]-1

                 },
                 totalPrice:state.totalPrice- state.ingrPrice[action.ingrType]
             }
        }

            
        default:
            return state;
    }
    
}

export default reducer;