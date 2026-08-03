import './Checkout.scss';
import './checkout-header.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getSessionId } from '../../backend/utils/session';

function Checkout() {
  const sessionId = getSessionId();
  const [cartItems, setCartItems] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  const getCart = async () => {
    const response = await axios.get('https://smackbackend.onrender.com/checkout', {
      params: {
        sessionId
      }
    });
    console.log(response.data.items); // Log the response data to the console
    setCartItems(response.data.items);
    console.log('Cart Items:', cartItems); // Log the cart items to the console
  }


  useEffect(() => {
    getCart();

    const deliveryResponse = async () => {
      const response = await axios.get('https://smackbackend.onrender.com/delivery-options');
      setDeliveryOptions(response.data);
      console.log(response.data)
    }

    deliveryResponse();
  }, [])

  return (
    <div>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">

          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link"
              href="index.html">3 items</a>)
          </div>

          <div className="checkout-header-right-section">

          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cartItems.map((item) => {
              return (
                <div className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: Tuesday, June 21
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image"
                      src={item.productId.image} />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {item.productId.name}
                      </div>
                      <div className="product-price">
                        ₦{item.productId.priceCents}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{item.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((deliveryOption) => {
                        return (
                          <div className="delivery-option">
                            <input type="radio"
                              className="delivery-option-input"
                              checked={deliveryOption.id === item.deliveryOptionId}
                              onChange={async () => {
                                await axios.put('https://smackbackend.onrender.com/cart/delivery-option', {
                                  sessionId,
                                  productId: item.productId._id,
                                  deliveryOptionId: deliveryOption.id
                                })
                                getCart();
                              }}
                              name={`delivery-options${item._id}`} />
                            <div>
                              <div className="delivery-option-date">
                                {deliveryOption.estimatedHours} Hours Delivery
                              </div>
                              <div className="delivery-option-price">
                                {deliveryOption.priceCents === 0 ? 'FREE Shipping' : `₦${deliveryOption.priceCents.toLocaleString()}`}
                              </div>
                            </div>
                          </div>
                        )
                      })}


                    </div>
                  </div>
                </div>
              )
            })}



          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

            <div className="payment-summary-row">
              <div>Items (3):</div>
              <div className="payment-summary-money">$42.75</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">$4.99</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">$47.74</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">$4.77</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">$52.51</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;