import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';
import * as actionCreator from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {
    // state={
    //     orders:[],
    //     loading: false
    // }

    componentDidMount(){
        this.props.onGetOrder();

        // axios.get('/orders.json').then((response)=>{
        //     let key;
        //     const fetchedOrders=[];// an array of order objects
        //     for(key in response.data){
        //         fetchedOrders.push({
        //             ...response.data[key],
        //             id:key
        //         });
        //     }

        //     this.setState({loading:false, orders:fetchedOrders});
        // }).catch(err=>{
        //     this.setState({loading:false});
        // });
    }

    render() {
        

        let orders= <Spinner/>;
        if(!this.props.loading){
            orders=this.props.orders.map((order,index)=>{    
                return (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                        index={index}/>
                )
            });
        } 
            

        return (
            <div>

                {orders}

            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    orders:state.or.orders,
    loading:state.or.loading
})

const mapDispatchToProps = dispatch =>{
    return{
        onGetOrder: ()=> dispatch(actionCreator.getOrder())
    }
    
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));
