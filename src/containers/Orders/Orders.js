import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axiosOrders from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: false
    };

    componentDidMount(){
        this.setState({loading: true});
        axiosOrders.get("/orders.json")
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                });
                }
                this.setState({orders: fetchedOrders, loading: false})
            }).catch( err => {
                this.setState({loading: false});
        })
    }

    render() {
    let orders = this.state.orders.map( order => {
        return <Order key={order.id} price={Number.parseFloat(order.price).toFixed(2)} ingredients={order.ingredients}/>
    });
    if (this.state.loading)
        orders = <Spinner/>;

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axiosOrders);