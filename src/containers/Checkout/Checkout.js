import React, { Component } from 'react';
import classes from './Checkout.module.css';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';

export class Checkout extends Component {
    
    state={
        ingredients:{
            salad:0,
            cheese:0,
            meat:0,
            bacon:0},
        totalPrice: 0

        // ingrPrice:{
        //     salad:1,
        //     cheese:1,
        //     meat:2,
        //     bacon:1.5},

        // totalPrice:2, //breadBase price
        // purchaseable: false,
        // purchasing:false,
        // loading:false,
        // error:null
    }
    
    componentDidMount(){
        if(this.props.location.search){
            let param;
            let price;
            const ingredients={};
            const query = new URLSearchParams(this.props.location.search);
            for ( param of query.entries()) {
                if(param[0]==='price'){
                    price= +param[1]
                } else{
                    ingredients[param[0]]= +param[1];//convert string to number
                }
            }
            
            this.setState({
                ingredients:ingredients,
                totalPrice:price});
        }
        
        

            // const key=param[0];
            // const value=param[1];
            // //setting key using variable value
            // ingredients={...ingredients,[key]:value}
        
    }

    checkoutContinued=()=>{
        this.props.history.replace('/checkout/contact-data');
        
    }

    checkoutCancelled=()=>this.props.history.goBack();

    render() {
        // how both props and router props can be passed to component
        return (
            <div className={classes.Checkout}>
                <CheckoutSummary 
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>
                
                <Route 
                    path={this.props.match.path+'/contact-data'} 
                    render={(props)=> <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>}
                />

            </div>
        )
    }
}

export default Checkout;

