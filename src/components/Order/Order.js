import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    //// method 1 loop through object
    // const ingrDisplay= Object.keys(props.ingredients).map((ingr,i)=>{
    //     return(
    //         <p key={i}>{ingr}: {props.ingredients[ingr]}</p>
    //     )
    // })
    

    const ingredients=[];
    let ingrName
    for (ingrName in props.ingredients){
        ingredients.push(
            {
                name: ingrName,
                amount: props.ingredients[ingrName]
            }
        );
    }

    const ingrDisplay=ingredients.map((ig,index)=>{
        return (
            <span key={index} className={classes.ingredients} >{ig.name} ({ig.amount})</span>
        );
    });

    

    return (
        <div className={classes.Order}>
            <p style={{fontWeight:'bold'}}>Order : {props.index}</p>
            <p> Ingredients : {ingrDisplay} </p>
            

            <p>Price: <strong> $ {Number.parseFloat(props.price).toFixed(2)} </strong></p>
            
        </div>
    )
}

export default Order;
