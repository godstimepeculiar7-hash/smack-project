import './Checkout.scss';
import './checkout-header.css';
import { useContext } from 'react';
import { CartContext } from '../../backend/Cart';
import { useNavigate } from 'react-router-dom';
import riceProducts from '../../My Products/Rice';
import { formatCurrency } from '../../component/Our Best Sellers Desktop/Money/Money';
import { deliveryOptions } from '../../backend/deliveryOptions';
import swallow from '../../My Products/Swallow';

function Checkout() {
  const { cart, totalQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate()

  const home = () => {
    navigate('/')
  }

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

              const matchingProduct = riceProducts.find((product) => {
                return product.id === cartItem.id

              });

              return (
                <div className="cart-item-container">
                  <div className="delivery-date">
                    Delivery Time: 7 hour delivery
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
                          cart.map((cartItem) => {
                            const matchingProduct = cart.find((product) => {
                              if(cartItem.id === product.id) {
                                removeFromCart(product.id)
                              }
                            })
                          })
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
                        return (
                          <div className="delivery-option">
                            <input type="radio" checked
                              className="delivery-option-input"
                              name={`delivery-option-${cartItem.id}`} />
                            <div>
                              <div className="delivery-option-date">
                                {option.deliveryDays} hour delivery
                              </div>
                              <div className="delivery-option-price">
                                FREE Shipping
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