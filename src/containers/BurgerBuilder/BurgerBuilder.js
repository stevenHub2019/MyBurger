import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={
    //         ingredients:{
    //             salad:1,
    //             cheese:2,
    //             meat:1,
    //             bacon:1

    //         }
    //     };
    // }

    //alternative to add ingredient in user's order
    // create an array of ingredients user adds
    //each time user add an ingredient
    //add the ingrdient into the array

    state={
        ingredients:{
            salad:0,
            cheese:0,
            meat:0,
            bacon:0
        },
        ingrPrice:{
            salad:1,
            cheese:1,
            meat:2,
            bacon:1.5
            
        },
        totalPrice:2, //breadBase price
        purchaseable: false,
        purchasing:false
    }

    updatePurchaseable=(ingredients)=>{
        //const ingredients=this.state.ingredients;// ingredients is from old state
        const sumOfIngr=Object.values(ingredients).reduce(
            (prev,curr)=>prev+curr,0);

        ////alternative method
        // const sumOfIngr=Object.keys(ingredients).map(ingrKey=>ingredients[ingrKey]).reduce(
        //     (prev,curr)=>prev+curr,0);   

        this.setState({purchaseable:sumOfIngr>0})
        //console.log(sumOfIngr); //ingredients obj is not updated 

    }


    //class method add
    addIngrHandler=(type)=>{
        // increment ingredient count
        const oldCount=this.state.ingredients[type];
        const updatedCount= oldCount+1;
        let updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
       
        //update price
        const updatedPrice=this.state.totalPrice+this.state.ingrPrice[type];
        
        //update state
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:updatedPrice
        });
        
        //update purchaseable
        this.updatePurchaseable(updatedIngredients);
        
    }

    //class method remove
    removeIngrHandler=(type)=>{
        if(this.state.ingredients[type]>0){
            // decrease ingredient count
            const oldCount=this.state.ingredients[type];
            const updatedCount= oldCount-1;
            let updatedIngredients={...this.state.ingredients};
            updatedIngredients[type]=updatedCount;
        
            //update price
            const updatedPrice=this.state.totalPrice-this.state.ingrPrice[type];
            
            //update state
            this.setState({
                ingredients:updatedIngredients,
                totalPrice:updatedPrice
            });
            
            //update purchaseable
            this.updatePurchaseable(updatedIngredients);
        }
    }

    purchasingHandler=()=>{
        this.setState({purchasing:true});
    }

    cancelPurchaseHandler=()=>{
        this.setState({purchasing:false});
    }

    continuePurchaseHandler=()=>{
        alert('Continue to purchase');
    }


    render(){
        const disabledInfo={...this.state.ingredients};
        
        //tranform ingredients obj to disabledInfo obj
        let key;
        for (key in disabledInfo){
            disabledInfo[key]= disabledInfo[key] <= 0;
        };

        //let orderSummary=null;

        // if(this.state.purchasing){
        //     orderSummary=(
        //         <Modal>
        //             <OrderSummary ingredients={this.state.ingredients} />
        //         </Modal>
        //     )
        // }

        return(
            <Aux>
                <Modal show={this.state.purchasing} 
                closeModalHandler={this.cancelPurchaseHandler} >
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    cancelPurchase={this.cancelPurchaseHandler}
                    continuePurchase={this.continuePurchaseHandler}
                    />
                </Modal>

                <Burger ingredients={this.state.ingredients} />

                <BuildControls 
                addIngrHandler={this.addIngrHandler}
                removeIngrHandler={this.removeIngrHandler}
                disabledInfo={disabledInfo}
                price={this.state.totalPrice}
                purchaseable={this.state.purchaseable}
                showModal={this.purchasingHandler} />

            </Aux>
        )
    }
}

export default BurgerBuilder;