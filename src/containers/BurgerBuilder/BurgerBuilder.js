import React,{Component,Fragment} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';

import * as actionCreator from '../../store/actions/index';


//UI state shouldn't be managed by redux
class BurgerBuilder extends Component{
    state={
        purchasing:false
    }

    componentDidMount(){
        console.log(this.props)
        this.props.getIngredients();

        // this.props.getIngredients();
        
        // axios.get('https://react-my-burger-49767.firebaseio.com/ingredients.json').then(
        //     response=>{
        //         this.setState({ingredients:response.data})
        //     }
        // ).catch(error=>{
        //     this.setState({error:error})
        // });
    }

    updatePurchaseable=(ingredients)=>{
        //const ingredients=this.props.ingredients;// ingredients is from old state
        const sumOfIngr=Object.values(ingredients).reduce(
            (prev,curr)=>prev+curr,0); 

        return sumOfIngr>0
       

    }

    purchasingHandler=()=>{
        this.setState({purchasing:true});
    }

    cancelPurchaseHandler=()=>{
        this.setState({purchasing:false});
    }

    //pass ingredients and totalPrice as queryParams to checkout component 
    continuePurchaseHandler=()=>{
        this.props.history.push({
            pathname:'/checkout'
        });
    }

    render(){
        const disabledInfo={...this.props.ingredients};
        
        //tranform ingredients obj to disabledInfo obj
        let key;
        for (key in disabledInfo){
            disabledInfo[key]= disabledInfo[key] <= 0;
        };

        // display order summary or loading spinner
        let orderSummary=null;
        if (this.props.ingredients){
            orderSummary=(
                <OrderSummary 
                    ingredients={this.props.ingredients}
                    cancelPurchase={this.cancelPurchaseHandler}
                    continuePurchase={this.continuePurchaseHandler}
                    totalPrice={this.props.totalPrice}
                />
            );
        }


        let burger= <Spinner/>
        if(this.props.error){
            burger=<p>{this.props.error.message} </p>
        }

        // ingredients if exist
        
        if (this.props.ingredients){
            burger=(
                <Fragment>
                    <Burger ingredients={this.props.ingredients} />

                    <BuildControls 
                    addIngrHandler={this.props.addIngredient}
                    removeIngrHandler={this.props.removeIngredient}
                    disabledInfo={disabledInfo}
                    price={this.props.totalPrice}
                    purchaseable={this.updatePurchaseable(this.props.ingredients)}
                    showModal={this.purchasingHandler} />

                </Fragment>
            );
        }


        return(
            <Aux>
                <Modal show={this.state.purchasing} 
                closeModalHandler={this.cancelPurchaseHandler}>

                    {orderSummary}

                </Modal>

                {burger}

            </Aux>
        )
    }
}


const mapStateToProps = state =>{
    return {
        ingredients:state.bbr.ingredients,
        totalPrice:state.bbr.totalPrice,
        error:state.bbr.error
    }
};

const mapDispatchToProps=dispatch=>{
    return {
        getIngredients:()=>dispatch(actionCreator.getIngr()),
        addIngredient:(type)=> dispatch(actionCreator.addIngr(type)),
        removeIngredient:(type)=> dispatch(actionCreator.removeIngr(type))
    }

};


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));