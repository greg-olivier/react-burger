import React from 'react';
import Button from "../../UI/Button/Button";
import Burger from "../../Burger/Burger";
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <h1> We hope it tastes well!</h1>
            <div style={{display: 'flex', width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button clicked={props.checkoutCancelled} btnType="Danger">CANCEL</Button>
            <Button clicked={props.checkoutApproved} btnType="Success">CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;