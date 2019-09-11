import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const Burger= props=>{

    const ingredientsFrState =Object.keys(props.ingredients).map(
        ingrKey=>[...Array(props.ingredients[ingrKey])].map(
            (el,index,array)=>{
                return (<BurgerIngredient key={ingrKey+index} type={ingrKey} />)
                }));

    console.log(ingredientsFrState);
    return (
        <div className={classes.Burger} >
            <BurgerIngredient type={'bread-top'} />
            {ingredientsFrState}
            <BurgerIngredient type={'bread-bottom'} />

        </div>
    )
}

export default Burger;