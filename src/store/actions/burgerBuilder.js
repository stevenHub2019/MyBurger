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
                console.log(response.data);
                //this.setState({ingredients:response.data})
            }
        ).catch(error=>{
            dispatch(updateError(error));
            //console.log(error);
            //this.setState({error:error})
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



// componentDidMount(){
    //     this.props.getIngredients();
        
    //     axios.get('https://react-my-burger-49767.firebaseio.com/ingredients.json').then(
    //         response=>{
    //             this.setState({ingredients:response.data})
    //         }
    //     ).catch(error=>{
    //         this.setState({error:error})
    //     });
    // }