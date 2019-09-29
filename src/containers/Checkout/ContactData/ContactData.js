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
                    minLength: 5,
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

    checkValidity=(value, rules)=>{
        let isValid=true;

        //check if a rule exisits in validation
        if(rules.required){
            isValid=value.trim() !=='' && isValid;
        }

        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid=value.length<=rules.maxLength && isValid;
        }

        return isValid;

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
            orderData:formData
        };

        //this.setState({loading:true});

        this.props.onOrderSubmit(order);

        // //firebase use .json as the endpoint
        // axios.post('/orders.json',order).then( 
        //     response=>{
        //         this.setState({
        //             loading:false,    
        //         });
        //         this.props.history.push('/');
        //     }
        // ).catch(error=>{
        //     this.setState({
        //         loading:false,
                
        //     });
            
        // });

    }

    inputChangedHandler=(event,id)=>{
        //clone orderFrom from the state
        //immutably update the state
        const updatedOrderForm={...this.state.orderForm};
        const updatedOrderFormElement={...updatedOrderForm[id]};

        //update value
        updatedOrderFormElement.value=event.target.value;
        
        //update valid value
        updatedOrderFormElement.valid=this.checkValidity(updatedOrderFormElement.value,updatedOrderFormElement.validationRules)
        
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
    loading:state.or.loading

});

const mapDispatchToProps= dispatch =>{
    return{
        onOrderSubmit: (orderData)=> dispatch(actionCreator.submitOrder(orderData)),
        
        
    }
}





export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));