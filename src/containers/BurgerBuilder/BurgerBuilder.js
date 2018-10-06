import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosOrders from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.8,
    bacon: 1,
    meat: 1.3
};

class BurgerBuilder extends Component {
    /*constructor(props){
        super(props);
        this.state={...}
    }*/

    state = {
        ingredients: {
            salad:0,
            cheese: 0,
            bacon: 0,
            meat:0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    updatePurchaseState = () => {
        const ingredients = {
            ...this.state.ingredients
        };

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0);
        this.setState({purchasable: sum > 0})
    };

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice + priceAddition;
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients},this.updatePurchaseState);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0)
            return;
        const updatedCount = oldCount - 1 ;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice - priceAddition;
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients}, this.updatePurchaseState);

    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        this.setState({loading: true});
        const data = {
            ingredients : this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Greg Smith',
                adress: {
                    number: 99,
                    street: 'Palm Street',
                    zipCode: '59873',
                    city: 'San Francisco'
                },
                email: 'test@test.fr'
            },
            deliveryMethod: 'fastest'
        };
        axiosOrders.post('/orders', data)
            .then( res => {
                this.setState({loading: false, purchasing: false});
                if (res.status === 200)
                    console.log(res);
        }).catch(err => {
            this.setState({loading: false, purchasing: false});
            console.log(err);
        })

    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary =
            <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;

        if (this.state.loading === true){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axiosOrders);