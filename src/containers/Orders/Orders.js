import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

export class Orders extends Component {
    state={
        orders:[],
        loading: false
    }

    componentDidMount(){
        axios.get('/orders.json').then((response)=>{
            let key;
            const fetchedOrders=[];// an array of order objects
            for(key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id:key
                });
            }

            this.setState({loading:false, orders:fetchedOrders});
        }).catch(err=>{
            this.setState({loading:false});
        });
    }

    render() {
        

        const orders= this.state.orders.map((order,index)=>{
            
            return (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    index={index}/>
            )
        });

        return (
            <div>

                {orders}

            </div>
        )
    }
}

export default withErrorHandler(Orders,axios);
