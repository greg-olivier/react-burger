import axios from 'axios';

const axiosOrders = axios.create({
    baseURL: 'https://my-react-burger-bfa8e.firebaseio.com'
});


/*axiosOrders.interceptors.request.use(req => {
    console.log({reqFromInstance: req});
    return req;
}, err => {
    console.log({errReqFromInstance:err});
    return Promise.reject(err)
});

axiosOrders.interceptors.response.use(res => {
    console.log({resFromInstance: res});
    return res;
}, err => {
    console.log({errResFromInstance:err});
    return Promise.reject(err)
});*/


export default axiosOrders;