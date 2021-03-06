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
               value: '',
               validation: {
                   required: true,
                   minLength: 2,
                   maxLength: 8
               },
               valid: false,
               touched: false
           },
           street: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your Street'
               },
               value: '',
               validation: {
                   required: true
               },
               valid: false,
               touched: false
           },
           city: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your City'
               },
               value: '',
               validation: {
                   required: true
               },
               valid: false,
               touched: false
           },
           email: {
               elementType: 'input',
               elementConfig: {
                   type: 'email',
                   placeholder: 'Your Email'
               },
               value: '',
               validation: {
                   required: true
               },
               valid: false,
               touched: false
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
               value: 'fastest',
               validation: {},
               valid: true,
               touched: false
           },
       },
        formIsValid: false,
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentfier in this.state.orderForm){
            formData[formElementIdentfier] = this.state.orderForm[formElementIdentfier].value;
        }

        const order = {
            ingredients : this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    checkValidity(value, rules) {

        let isValid = true;

        if (!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifer in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifer].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
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
            <form onSubmit={this.orderHandler}>
                { formElementsArray.map( formElement => {
                    return <Input
                        key={formElement.id}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        valuetype={formElement.id}
                        value={formElement.config.value}/>
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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