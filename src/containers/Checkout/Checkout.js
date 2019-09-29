import React, { Component } from 'react';
import classes from './Checkout.module.css';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

export class Checkout extends Component {

    checkoutContinued=()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelled=()=>this.props.history.goBack()  //?? doesn't work

    render() {
        
        let checkoutSummary= <Redirect to='/' />
        console.log(this.props.ingredients);

        if(this.props.ingredients){
            
            checkoutSummary= this.props.purchased? <Redirect to='/' /> : (
                <div className={classes.Checkout}>
                     <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued}/>

                    <Route 
                        path={this.props.match.path+'/contact-data'} 
                        component={ContactData}/>
                </div>
           );
        }

        return checkoutSummary;
    }
}

const mapStateToProps= state =>{

    return {
        ingredients:state.bbr.ingredients,
        purchased:state.or.purchased
    }
};

// const mapDispatchToProps= dispatch =>{

// };

export default connect(mapStateToProps)(Checkout);

