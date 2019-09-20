import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


export default class ContactData extends Component {
    state={
        orderForm:{
            
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:''
            },
            
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:''
            },
            
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code'
                },
                value:''
            },
            
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:''
            },
            
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Email'
                },
                value:''
            },
            
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                        ]
                },
                value:''
            },
            
        },
        loading:false
        
    }

    orderHandler=(event)=>{
        event.preventDefault();//prevent sending request to reload the page;
        
        const order={
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name:'Steve',
                Address:{
                    street:'williamton street',
                    postalCode:'453732',
                    country:'Germany'
                },
                email:'test@test.com'
            },
            deliveryMethod:'on foot'
        };

        this.setState({loading:true});

        //firebase use .json as the endpoint
        axios.post('/orders.json',order).then( 
            response=>{
                this.setState({
                    loading:false,    
                });
                this.props.history.push('/');
            }
        ).catch(error=>{
            this.setState({
                loading:false,
                
            });
            
        });

    }


    render() {
        let form=[];
        let key;
        for(key in this.state.orderForm){
            form.push({
                id:key,//name, street, email, zipcode
                config:this.state.orderForm[key]  //{elementType:..,elementConfi:...}
            })
        }

        console.log(form);
        // props is passed as an object and when spread, will turn to attribues key = value
        let form=(
            <form>
                <Input elementType='..' elementConfig='...' value='...' />
                <Input inputType='input' type='text' name='email' placeholder='Your Mail' />
                <Input inputType='input' type='text' name='street' placeholder='Street' />
                <Input inputType='input' type='text' name='postal' placeholder='Postal Code' />
                <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
            </form>
        );

        if(this.state.loading){
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
