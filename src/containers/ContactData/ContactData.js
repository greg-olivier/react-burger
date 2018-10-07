import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import axiosOrders from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './ContactData.css';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
       orderForm: {
           name: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your Name'
               },
               value: ''
           },
           street: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your Street'
               },
               value: ''
           },
           city: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your City'
               },
               value: ''
           },
           email: {
               elementType: 'input',
               elementConfig: {
                   type: 'email',
                   placeholder: 'Your Email'
               },
               value: ''
           },
           deliveryMethod: {
               elementType: 'select',
               elementConfig: {
                   options:
                       [{
                           value: 'fastest',
                           valueDisplay: 'Fastest'
                       },
                       {
                           value: 'cheapest',
                           valueDisplay: 'Cheapest'
                       }]
               },
           },
       },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients : this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email
            },
            deliveryMethod: 'fastest'
        };


       axiosOrders.post('/orders.json', order)
           .then( res => {
              this.setState({loading: false});
              this.props.history.push("/")
       }).catch(err => {
           this.setState({loading: false});
            console.log(err)
       })
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm})
    };

    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form>
                { formElementsArray.map( formElement => {
                    return <Input
                        key={formElement.id}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}/>
                })}
                <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
            </form>
        );
        if (this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4> Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;