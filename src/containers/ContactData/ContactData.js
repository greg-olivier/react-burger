import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import axiosOrders from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        address: {
            street: '',
            city: ''
        },
        email: '',
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const data = {
           ingredients : this.props.ingredients,
           customer: {
               name: this.state.name,
               address: this.state.address,
               email: this.state.email
           },
           deliveryMethod: 'fastest'
       };

       axiosOrders.post('/orders.json', data)
           .then( res => {
              this.setState({loading: false});
              this.props.history.push("/")
       }).catch(err => {
           this.setState({loading: false});
            console.log(err)
       })
    };

    render() {

        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Your postal code"/>
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