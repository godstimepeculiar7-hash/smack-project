import './general.css';
import './orders.css';
import Hamburger from '../../assets/hamburger 1.webp';
import BuyAgain from '../../assets/buy-again.png';

function Orders() {
    return (
        <div className="main">
            <div className="page-title">Your Orders</div>

            <div className="orders-grid js-orders-grid">
                <div className="order-container">
                    <div className="order-header">
                        <div className="order-header-left-section">
                            <div className="order-date">
                                <div className="order-header-label">Order Placed:</div>
                                <div></div>
                            </div>
                            <div className="order-total">
                                <div className="order-header-label">Total:</div>
                                <div></div>
                            </div>
                        </div>
                        <div className="order-header-right-section">
                            <div className="order-header-label">Order ID:</div>
                            <div></div>
                        </div>
                    </div>
                    <div className="order-details-grid">
                        <div className="product-image-container">
                            <img src={Hamburger} alt="Product Image" />
                        </div>
                        <div className="product-details">
                            <div className="product-name">

                            </div>
                            <div className="product-delivery-date">
                                Arriving on: Today
                            </div>
                            <div className="product-quantity">
                                Quantity:
                            </div>
                            <button className="buy-again-button button-primary js-buy-again" data-product-id="">
                                <img className="buy-again-icon" src={BuyAgain} alt="Buy Again Icon" />
                                <span className="buy-again-message">Buy it again</span>
                            </button>
                        </div>
                        <div className="product-actions">
                            <button className="track-package-button button-secondary">
                                Track package
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders;