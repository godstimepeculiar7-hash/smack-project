import './Checkout.scss';
import './checkout-header.css';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../backend/Cart';
import { useNavigate } from 'react-router-dom';
import riceProducts from '../../My Products/Rice';
import { formatCurrency } from '../../component/Our Best Sellers Desktop/Money/Money';
import { deliveryOptions } from '../../backend/deliveryOptions';
import swallow from '../../My Products/Swallow';
import { Products } from '../../component/Our Best Sellers Desktop/products';
import dayjs from 'dayjs';

function Checkout() {
  const { cart, totalQuantity, removeFromCart, updateDeliveryOption, totalCost, shippingCost, totalBeforeTax, tax, orderTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(dayjs());

  const home = () => {
    navigate('/')
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="checkout-header">
        <div className="header-content">

          <div className="checkout-header-middle-section">
            Checkout (<div className="return-to-home-link"
              onClick={home}>{totalQuantity} items</div>)
          </div>


        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">

            {cart.map((cartItem) => {

              const allProducts = [...riceProducts, ...swallow, ...Products];

              const matchingProduct = allProducts.find((product) => {
                return product.id === cartItem.id

              });

              const selectedOption = deliveryOptions.find((option) => {
                return option.id === cartItem.deliveryOptionId
              });

              return (
                <div className="cart-item-container">
                  <div className="delivery-date">
                    Delivery Time: {selectedOption.deliveryHours} hour delivery
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image"
                      src={matchingProduct.image} />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {matchingProduct.name}
                      </div>
                      <div className="product-price">
                        {matchingProduct.priceCents}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary" onClick={() => {
                          removeFromCart(cartItem.id)
                        }}>
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {deliveryOptions.map((option) => {
                        let priceString = 'Free Shipping';

                        if (option.priceCents > 0) {
                          priceString = `${option.priceCents} - Shipping`
                        }

                        return (
                          <div key={option.id} className="delivery-option">
                            <input type="radio" checked={option.id === cartItem.deliveryOptionId}
                              className="delivery-option-input"
                              onChange={() => {
                                updateDeliveryOption(cartItem.id, option.id)
                              }}
                              name={`delivery-option-${cartItem.id}`} />
                            <div>
                              <div className="delivery-option-date">
                                {currentTime.add(option.deliveryHours, 'hour').format('HH:mm A, ')}
                              </div>
                              <div className="delivery-option-price">
                                {priceString}
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
              <div className="payment-summary-money">{totalCost()}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">{shippingCost()}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">{totalBeforeTax}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{tax}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">{orderTotal}</div>
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