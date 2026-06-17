import './orders.scss';
import Hamburger from '../../assets/hamburger 1.webp';
import BuyAgain from '../../assets/buy-again.png';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const getOrders = async () => {

            const response = await axios.get(
                'https://smackbackend.onrender.com/orders'
            );

            console.log(response.data);

            setOrders(response.data);
        };

        getOrders();

    }, []);

    return (
        <div className="orders-page">
            <h1 className="orders-title">Your Orders</h1>

            <div className="orders-list">
                {orders.map((order) => {
                    return (
                        <div className="order-card" key={order.id}>

                            {/* ORDER HEADER */}
                            <div className="order-card__header">
                                <div className="order-meta">
                                    <div>
                                        <span className="label">Order Placed</span>
                                        <span className="value">{new Date(order.createdAt).toDateString()}</span>
                                    </div>

                                    <div>
                                        <span className="label">Total</span>
                                        <span className="value">₦{order.total?.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="order-id">
                                    <span className="label">Order ID</span>
                                    <span className="value">{order.id}</span>
                                </div>
                            </div>

                            {order.products.map((product) => {
                                return (
                                    <div className="order-item" key={product.productId}>

                                        <div className="product-image">
                                            <img src={product.image} alt={product.name} />
                                        </div>

                                        <div className="product-info">
                                            <h3 className="product-name">
                                                {product.name}
                                            </h3>

                                            <p className="delivery-date">
                                                Arriving: {new Date(product.estimatedDelivery).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: false,
                                                })}
                                            </p>

                                            <p className="quantity">
                                                Quantity: {product.quantity}
                                            </p>

                                            <button className="buy-again">
                                                <img src={BuyAgain} alt="Buy again" />
                                                Buy again
                                            </button>
                                        </div>

                                        <div className="actions">
                                            <button className="track-btn">
                                                Track package
                                            </button>
                                        </div>

                                    </div>
                                )
                            })}


                        </div>
                    )
                })}




            </div>
        </div>
    );
}

export default Orders;