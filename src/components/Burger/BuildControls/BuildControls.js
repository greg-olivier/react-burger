import React, {Component} from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';
import PropTypes from "prop-types";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' }
];

class BuildControls extends Component {
    render() {
        return (
            <div className={classes.BuildControls}>
                <p>Current Price : <strong>{this.props.price.toFixed(2)} €</strong></p>
                {controls.map(ctrl => (
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        added={() => this.props.ingredientAdded(ctrl.type)}
                        removed={() => this.props.ingredientRemoved(ctrl.type)}
                        disabled={this.props.disabled[ctrl.type]}
                    />
                ))}
                <button className={classes.OrderButton} disabled={!this.props.purchasable} onClick={this.props.ordered}>ORDER
                    NOW
                </button>
            </div>
        )
    }

};


BuildControls.propTypes = {
    price: PropTypes.number.isRequired,
    ingredientAdded: PropTypes.func.isRequired,
    ingredientRemoved: PropTypes.func.isRequired,
    disabled: PropTypes.object.isRequired,
    purchasable: PropTypes.bool.isRequired,
    ordered: PropTypes.func.isRequired
};

export default BuildControls;