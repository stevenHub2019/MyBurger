import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

export default class ContactData extends Component {
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:'',
            country:''
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
        console.log(this.props);

        let form=(
            <form>
                <input type='text' name='name' placeholder='Your Name' />
                <input type='text' name='email' placeholder='Your Mail' />
                <input type='text' name='street' placeholder='Street' />
                <input type='text' name='postal' placeholder='Postal Code' />
                <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
            </form>);

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
