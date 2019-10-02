import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
//import * as actionTypes from '../../../store/actions/actionTypes';
import * as actionCreator from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import {checkValidity} from '../../../utility/utility';

class ContactData extends Component {
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validationRules:{
                    required: true,
                    minLength: 1,
                    maxLength: 12
                },
                valid: false,
                isTouch: false
            },
            
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validationRules:{
                    required: true
                },
                valid: false,
                isTouch: false
            },
            
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code'
                },
                value:'',
                validationRules:{
                    required: true
                },
                valid: false,
                isTouch: false
            },
            
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validationRules:{
                    required: true
                },
                valid: false,
                isTouch: false
            },
            
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Email'
                },
                value:'',
                validationRules:{
                    required: true
                },
                valid: false,
                isTouch: false
            },
            
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                        ]
                },
                value:'fastest',
                isTouch: false,
                validationRules:{},
                valid: true
            },
            
        },
        isFormValid:false,
        //loading:false
        
    }

    // refactorize to redux dispatch
    orderHandler=(event)=>{
        event.preventDefault();//prevent sending request to reload the page;

        const formData={}; // {name : value , address: value...}
        let key;
        for(key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value;
            //={...formData,{[key]:this.state.orderForm[key].value}}
        }

        // order summary / details
        const order={
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData:formData,
            userId:this.props.userId
        };
        
        this.props.onOrderSubmit(order,this.props.token);

    }

    inputChangedHandler=(event,id)=>{
        //clone orderFrom from the state
        //immutably update the state
        const updatedOrderForm={...this.state.orderForm};
        const updatedOrderFormElement={...updatedOrderForm[id]};

        //update value
        updatedOrderFormElement.value=event.target.value;
        
        //update valid value
        updatedOrderFormElement.valid=checkValidity(updatedOrderFormElement.value,updatedOrderFormElement.validationRules);
        
        //update isTouch
        updatedOrderFormElement.isTouch=true;

        //transfer deeply cloned updatedOrderFromElement to updatedOrderForm which can then be used to update orderFrom in the state
        updatedOrderForm[id]=updatedOrderFormElement;

        //updatae isFormValid
        let isFormValid=true;
        let key;
        for(key in updatedOrderForm){
            isFormValid= updatedOrderForm[key].valid && isFormValid;
        }
        
        //console.log(isFormValid);

        // state update
        this.setState({orderForm:updatedOrderForm, isFormValid: isFormValid});
        
        //console.log(updatedOrderForm);
    }

    render() {
         // transform orderForm into an array
        let formArray=[];
        let key;
        for(key in this.state.orderForm){
            formArray.push({
                id:key,//name, street, email, zipcode
                config:this.state.orderForm[key]  //{elementType:..,elementConfi:...}
            })
        }

        //ORDER FORM
        //dynamically creates Input components

        //where is props.label??
        let inputs=formArray.map(form=>{
            return (
                <Input 
                    key={form.id}
                    elementType={form.config.elementType} 
                    value={form.config.value} 
                    elementConfig={form.config.elementConfig}
                    changed={(event)=>this.inputChangedHandler(event,form.id)}
                    valid={form.config.valid}
                    shouldValidate={form.config.validationRules}
                    isTouch={form.config.isTouch}
                    label={form.id}/>  //props.lable??
            )
        });

        // props is passed as an object and when spread, will turn to attribues key = value
        //how does onSubmit work??
        let form=(
            <form onSubmit={this.orderHandler}>
                {/* <Input elementType='..' elementConfig='...' value='...' /> */}
                {inputs}
                
                <Button btnType='Success' disabled={!this.state.isFormValid} >Order</Button>
            </form>
        );

        if(this.props.loading){
            form=<Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                
                <h4>Enter your Contact Data</h4>
                
                {form}   

            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    ingredients:state.bbr.ingredients,
    totalPrice:state.bbr.totalPrice,
    loading:state.or.loading,
    token:state.ar.token,
    userId:state.ar.userId
});

const mapDispatchToProps= dispatch =>{
    return{
        onOrderSubmit: (orderData,token)=> dispatch(actionCreator.submitOrder(orderData,token))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));