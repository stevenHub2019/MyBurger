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
        return (
            <div className={classes.Checkout}>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>
                
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

