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
import * as actionTypes from '../../store/action';

//UI state shouldn't be managed by redux
class BurgerBuilder extends Component{
    state={
        purchasing:false,
        loading:false,
        error:null
    }

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

    updatePurchaseable=(ingredients)=>{
        //const ingredients=this.props.ingredients;// ingredients is from old state
        const sumOfIngr=Object.values(ingredients).reduce(
            (prev,curr)=>prev+curr,0);

        ////alternative method
        // const sumOfIngr=Object.keys(ingredients).map(ingrKey=>ingredients[ingrKey]).reduce(
        //     (prev,curr)=>prev+curr,0);   

        return sumOfIngr>0
        //console.log(sumOfIngr); //ingredients obj is not updated 

    }


    //class method add
    // addIngrHandler=(type)=>{
    //     console.log(this.props.addIngredient)
    //     this.props.addIngredient(type);

    //     // // increment ingredient count
    //     // const oldCount=this.props.ingredients[type];
    //     // const updatedCount= oldCount+1;
    //     // let updatedIngredients={...this.props.ingredients};
    //     // updatedIngredients[type]=updatedCount;
       
    //     // //update price
    //     // const updatedPrice=this.props.totalPrice+this.state.ingrPrice[type];
        
    //     // //update state
    //     // this.setState({
    //     //     ingredients:updatedIngredients,
    //     //     totalPrice:updatedPrice
    //     // });
        
    //     //update purchaseable
    //     this.updatePurchaseable(this.props.ingredients);
        
    // }

    //class method remove
    // removeIngrHandler=(type)=>{
    //     if(this.props.ingredients[type]>0){
    //         this.props.removeIngredient(type);

    //         // // decrease ingredient count
    //         // const oldCount=this.props.ingredients[type];
    //         // const updatedCount= oldCount-1;
    //         // let updatedIngredients={...this.props.ingredients};
    //         // updatedIngredients[type]=updatedCount;
        
    //         // //update price
    //         // const updatedPrice=this.props.totalPrice-this.state.ingrPrice[type];
            
    //         // //update state
    //         // this.setState({
    //         //     ingredients:updatedIngredients,
    //         //     totalPrice:updatedPrice
    //         // });
            
    //         //update purchaseable
    //         this.updatePurchaseable(this.props.ingredients);//not updated immediately
    //     }
    // }

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

        // const order={
        //     ingredients: this.props.ingredients,
        //     price: this.props.totalPrice,
        //     customer:{
        //         name:'Steve',
        //         Address:{
        //             street:'williamton street',
        //             zipCode:'453732',
        //             country:'Germany'
        //         },
        //         email:'test@test.com'
        //     },
        //     deliveryMethod:'on foot'
        // };
        // this.setState({loading:true});
        // axios.post('./orders',order).then(
        //     response=>{
        //         this.setState({
        //             loading:false,
        //             purchasing:false
        //         });
                
        //     }
        // ).catch(error=>{
        //     this.setState({
        //         loading:false,
        //         purchasing:false
        //     });
            
        // });
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

        if(this.state.loading){
            orderSummary=<Spinner /> ;
        }


        let burger= <Spinner/>
        if(this.state.error){
            burger=<p>{this.state.error.message} </p>
        }

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
        ingredients:state.ingredients,
        totalPrice:state.totalPrice

    }
   
};
const mapDispatchToProps=dispatch=>{
    return {
        getIngredients:()=>dispatch({
            type:actionTypes.GETINGR
        }),
        addIngredient:(type)=> dispatch({
            type:actionTypes.ADD_INGR,
            ingrType:type
        }),
        removeIngredient:(type)=> dispatch({
            type:actionTypes.REMOVE_INGR,
            ingrType:type
        })
    }

};


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));