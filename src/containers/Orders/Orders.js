import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';
import * as actionCreator from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {

    componentDidMount(){
        this.props.onGetOrder(this.props.token,this.props.userId);
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
    loading:state.or.loading,
    token:state.ar.token,
    userId:state.ar.userId
})

const mapDispatchToProps = dispatch =>{
    return{
        onGetOrder: (token,userId)=> dispatch(actionCreator.getOrder(token,userId))
    }   
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));
