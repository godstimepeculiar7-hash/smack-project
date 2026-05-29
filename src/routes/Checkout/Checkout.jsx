import './Checkout.scss';
import './checkout-header.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Checkout() {
  const [cartProducts, setCartProducts] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  const getCartProducts = async () => {
    const response = await axios.get('http://localhost:5000/cart');
    setCartProducts(response.data)
  };

  useEffect(() => {

    getCartProducts();

    const getDeliveryOptions = async () => {
      const response = await axios.get('http://localhost:5000/delivery-options');
      setDeliveryOptions(response.data);
    }



    getDeliveryOptions();


  }, [])
  return (
    <div>
      <div className="checkout-header">
        <div className="header-content">

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link"
            >3 items</a>)
          </div>


        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cartProducts.map((product) => {

              const selectedDeliveryOption = deliveryOptions.find((option) => {
                return option.id === product.deliveryOptionId;
              });

              return (
                <div className="cart-item-container" key={product.id}>
                  <div className="delivery-date">
                    Delivery Time: {selectedDeliveryOption?.deliveryHours} hour delivery
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image"
                      src={product.image} />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {product.name}
                      </div>
                      <div className="product-price">
                        ₦{product.priceCents}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{product.quantity}</span>
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
                      {deliveryOptions.map((option) => {
                        return (
                          <div key={option.id} className="delivery-option">
                            <input type="radio"
                              checked={product.deliveryOptionId === option.id}
                              onChange={async () => {

                                await axios.put(
                                  'http://localhost:5000/cart/delivery-option',
                                  {
                                    productId: product.id,
                                    deliveryOptionId: option.id
                                  }
                                );

                                await getCartProducts();

                              }}
                              className="delivery-option-input"
                              name={`delivery-option-${product.id}`} />
                            <div>
                              <div className="delivery-option-date">
                                {option.deliveryHours} hour delivery
                              </div>
                              <div className="delivery-option-price">
                                {option.priceCents === 0 ? 'FREE Shipping' : `₦${option.priceCents}`}
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