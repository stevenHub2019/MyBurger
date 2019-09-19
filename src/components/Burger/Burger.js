import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
import PropTypes from 'prop-types';
//import {withRouter} from 'react-router-dom'

const Burger= props=>{
    
    let message=null;

    const arrOfIngredComponents =Object.keys(props.ingredients).map(
        ingrKey=>[...Array(props.ingredients[ingrKey])].map(
            (el,index,array)=>{
                return <BurgerIngredient key={ingrKey+index} type={ingrKey} />
                }
            )
        ).reduce((prev,curr)=>[...prev,...curr]);
    
    //console.log(arrOfIngredComponents);

    if(arrOfIngredComponents.length===0){
        message=<p>Please start adding ingredients ! </p>
    }

    // const NumIngred=Object.values(props.ingredients).reduce((prev,curr)=>prev+curr);
    // if(NumIngred===0){
    //     message=<p>Please add some ingredients to your burger! </p>
    // }

    //console.log(arrOfIngredComponents);
    
    return (
        <div className={classes.Burger} >

            <BurgerIngredient type={'bread-top'} />
            {arrOfIngredComponents}
            {message}
            <BurgerIngredient type={'bread-bottom'} />

            

        </div>
    )
}

Burger.propTypes={
    ingredients:PropTypes.object
};

export default Burger;