import React, { Component } from 'react';
import classes from './Checkout.module.css';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';

import {connect} from 'react-redux';

export class Checkout extends Component {

    checkoutContinued=()=>{
        this.props.history.replace('/checkout/contact-data');
        
    }

    checkoutCancelled=()=>this.props.history.goBack()  //?? doesn't work

    render() {
        // how both props and router props can be passed to component
        
        let checkoutSummary= <h1>Please add ingredients to your burger</h1>
        
        if(this.props.ingredients){
            checkoutSummary=(<CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>);

        }
        return (
            <div className={classes.Checkout}>
                {checkoutSummary}
                
                <Route 
                    path={this.props.match.path+'/contact-data'} 
                    component={ContactData}/>
                

            </div>
        )
    }
}

const mapStateToProps= state =>{

    return {
        ingredients:state.ingredients,
    }
};

// const mapDispatchToProps= dispatch =>{

// };

export default connect(mapStateToProps)(Checkout);

