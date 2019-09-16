import React,{Component,Fragment} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        ingredients:null,
        ingrPrice:{
            salad:1,
            cheese:1,
            meat:2,
            bacon:1.5
            
        },
        totalPrice:2, //breadBase price
        purchaseable: false,
        purchasing:false,
        loading:false,
        error:null
    }

    componentDidMount(){
        axios.get('https://react-my-burger-49767.firebaseio.com/ingredients.json').then(
            response=>{
                this.setState({ingredients:response.data})
            }
        ).catch(error=>{
            this.setState({error:error})
        });
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
        //alert('Continue to purchase');
        const order={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
                name:'Steve',
                Address:{
                    street:'williamton street',
                    zipCode:'453732',
                    country:'Germany'
                },
                email:'test@test.com'
            },
            deliveryMethod:'on foot'
        };
        this.setState({loading:true});
        axios.post('./orders',order).then(
            response=>{
                this.setState({
                    loading:false,
                    purchasing:false
                });
                
            }
        ).catch(error=>{
            this.setState({
                loading:false,
                purchasing:false
            });
            
        });
    }

    render(){
        const disabledInfo={...this.state.ingredients};
        
        //tranform ingredients obj to disabledInfo obj
        let key;
        for (key in disabledInfo){
            disabledInfo[key]= disabledInfo[key] <= 0;
        };

        // display order summary or loading spinner
        let orderSummary=null;
        if (this.state.ingredients){
            orderSummary=(
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    cancelPurchase={this.cancelPurchaseHandler}
                    continuePurchase={this.continuePurchaseHandler}
                    totalPrice={this.state.totalPrice}
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

        if (this.state.ingredients){
            burger=(
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />

                    <BuildControls 
                    addIngrHandler={this.addIngrHandler}
                    removeIngrHandler={this.removeIngrHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
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



export default withErrorHandler(BurgerBuilder,axios);