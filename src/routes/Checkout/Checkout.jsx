import './Checkout.scss';
import './checkout-header.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getSessionId } from '../../backend/utils/session';
import { useOutletContext } from 'react-router-dom';

function Checkout() {
  const sessionId = getSessionId();
  const [cartItems, setCartItems] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  const { getTotalQuantity, setLoading, totalQuantity } = useOutletContext();

  const quantities = [1, 2, 3, 4, 5];

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

  const getPaymentSummary = async () => {
    const response = await axios.get('https://smackbackend.onrender.com/payment-summary', {
      params: {
        sessionId
      }
    });
    console.log(response.data);
    setPaymentSummary(response.data);
  }


  useEffect(() => {
    getCart();
    getPaymentSummary();

    const deliveryResponse = async () => {
      const response = await axios.get('https://smackbackend.onrender.com/delivery-options');
      setDeliveryOptions(response.data);
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
              href="index.html">{totalQuantity} items</a>)
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
              const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                return deliveryOption.id === item.deliveryOptionId
              })
              return (
                <div className="cart-item-container">
                  <div className="delivery-date">
                    Delivery Time: {selectedDeliveryOption ? `Delivers in ${selectedDeliveryOption.estimatedHours} hours` : 'Loading...'}
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
                          <select value={item.quantity} onChange={async (event) => {
                            await axios.put('https://smackbackend.onrender.com/update-quantity', {
                              sessionId,
                              productId: item.productId._id,
                              quantity: parseInt(event.target.value, 10)
                            })
                            await getCart();
                            await getTotalQuantity();
                            await getPaymentSummary();
                          }} className="quantity-dropdown">
                            {quantities.map((quantity) => {
                              return (
                                <option key={quantity} value={quantity} >
                                  {quantity}
                                </option>
                              );
                            })}
                          </select>
                        </span>
                        <span className="delete-quantity-link link-primary"
                          onClick={async () => {
                            const response = await axios.delete('https://smackbackend.onrender.com/cart', {
                              data: {
                                sessionId,
                                productId: item.productId._id
                              }
                            });
                            await getCart();
                            await getTotalQuantity();
                            await getPaymentSummary();
                            console.log(response.data); // Log the response data to the console
                          }}
                        >
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
                                await getCart();
                                await getPaymentSummary();
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
              <div>Items ({totalQuantity}):</div>
              <div className="payment-summary-money">₦{paymentSummary?.itemsTotal}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">₦{paymentSummary?.shippingTotal}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">₦{paymentSummary?.totalBeforeTax}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">₦{paymentSummary?.tax}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">₦{paymentSummary?.totalCost}</div>
            </div>

            <button className="place-order-button button-primary" onClick={async () => {
              navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                console.log(latitude)
                console.log(longitude)

                try {
                  const response = await axios.post('https://smackbackend.onrender.com/checkout/location', {
                    sessionId,
                    latitude,
                    longitude
                  })
                  console.log(response.data);
                } catch (error) {
                  console.log(error.response.data);
                }
              })
            }}>
              Place your order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;