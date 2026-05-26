import './orders.scss';

import Hamburger from '../../assets/hamburger 1.webp';
import BuyAgain from '../../assets/buy-again.png';

function Orders() {
    return (
        <div className="orders-page">
            <h1 className="orders-title">Your Orders</h1>

            <div className="orders-list">

                {/* ORDER CARD */}
                <div className="order-card">

                    {/* ORDER HEADER */}
                    <div className="order-card__header">
                        <div className="order-meta">
                            <div>
                                <span className="label">Order Placed</span>
                                <span className="value">May 26, 2026</span>
                            </div>

                            <div>
                                <span className="label">Total</span>
                                <span className="value">₦12,500</span>
                            </div>
                        </div>

                        <div className="order-id">
                            <span className="label">Order ID</span>
                            <span className="value">#ORD-10293</span>
                        </div>
                    </div>

                    {/* ORDER ITEM */}
                    <div className="order-item">

                        <div className="product-image">
                            <img src={Hamburger} alt="Product" />
                        </div>

                        <div className="product-info">
                            <h3 className="product-name">
                                Chicken Burger Deluxe
                            </h3>

                            <p className="delivery-date">
                                Arriving: Today
                            </p>

                            <p className="quantity">
                                Quantity: 1
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

                </div>

            </div>
        </div>
    );
}

export default Orders;