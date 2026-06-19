import './Checkout.scss';
import './checkout-header.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import formatCurrency from '../../backend/utils/formatCurrency';
import { useFlutterwave } from 'flutterwave-react-v3';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [cartProducts, setCartProducts] = useState([]);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const { getTotalQuantity } = useOutletContext();
  const [paymentSummary, setPaymentSummary] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getDeliveryEstimate = (hours) => {
    const delivery = new Date(currentTime.getTime() + hours * 60 * 60 * 1000);
    const timeString = delivery.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const isSameDay = currentTime.toDateString() === delivery.toDateString();

    return isSameDay ? `By ${timeString}` : `Tomorrow by ${timeString}`;
  };

  const getCartProducts = async () => {
    const response = await axios.get('https://smackbackend.onrender.com/cart');
    setCartProducts(response.data)
  };

  const getPaymentSummary = async () => {
    const response = await axios.get(
      'https://smackbackend.onrender.com/payment-summary'
    );

    console.log(response.data);

    setPaymentSummary(response.data);
  };

  useEffect(() => {

    getCartProducts();

    const getDeliveryOptions = async () => {
      const response = await axios.get('https://smackbackend.onrender.com/delivery-options');
      setDeliveryOptions(response.data);
    }

    getDeliveryOptions();
    getPaymentSummary();

  }, [])

  const totalItems = cartProducts.reduce((total, product) => {
    return total + product.quantity;
  }, 0);

  const handlePlaceOrder = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      try {
        const response = await axios.post(
          "https://smackbackend.onrender.com/checkout/location",
          { lat, lng }
        );

        console.log(response.data);

        if (response.data.allowed) {
          handleFlutterPayment({
            callback: async (response) => {
              console.log(response);

              if (response.status === 'completed') {

                await axios.post(
                  'https://smackbackend.onrender.com/create-order'
                );

                await getCartProducts();
                await getTotalQuantity();

                navigate('/orders');
              }
            },

            onClose: () => {
              console.log('Payment closed');
            }
          });
        }

      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data.message);
      }
    });
  };

  const config = {
    public_key: 'FLWPUBK_TEST-d989135c2af242a4412d33d19f510c17-X',

    tx_ref: Date.now().toString(),

    amount: paymentSummary.orderTotal || 0,

    currency: 'NGN',

    payment_options: 'card,ussd,banktransfer',

    customer: {
      email: 'customer@gmail.com',
      phone_number: '08100000000',
      name: 'Godstime Peculiar',
    },

    customizations: {
      title: 'My Store',
      description: 'Payment for items in cart',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);
  return (
    <div>
      <div className="checkout-header">
        <div className="header-content">

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link"
            >{totalItems}</a>)
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
                    Delivery Time: {selectedDeliveryOption ? getDeliveryEstimate(selectedDeliveryOption.deliveryHours) : 'Not selected'}
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
                        <span className="delete-quantity-link link-primary" onClick={async () => {
                          await axios.delete(`https://smackbackend.onrender.com/cart-delete/${product.id}`);

                          await getCartProducts();
                          await getTotalQuantity();
                          await getPaymentSummary();
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
                          <div key={option.id} className="delivery-option">
                            <input type="radio"
                              checked={product.deliveryOptionId === option.id}
                              onChange={async () => {

                                await axios.put(
                                  'https://smackbackend.onrender.com/cart/delivery-option',
                                  {
                                    productId: product.id,
                                    deliveryOptionId: option.id
                                  }
                                );

                                await getCartProducts();
                                await getPaymentSummary();

                              }}
                              className="delivery-option-input"
                              name={`delivery-option-${product.id}`} />
                            <div>
                              <div className="delivery-option-date">
                                {getDeliveryEstimate(option.deliveryHours)}
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
              <div>Items ({totalItems}):</div>
              <div className="payment-summary-money">{formatCurrency(paymentSummary.itemsTotal || 0)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">{formatCurrency(paymentSummary.shippingTotal || 0)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">{formatCurrency(paymentSummary.totalBeforeTax || 0)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{formatCurrency(paymentSummary.tax || 0)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">{formatCurrency(paymentSummary.orderTotal || 0)}</div>
            </div>

            <button className="place-order-button button-primary" onClick={handlePlaceOrder}>
              Place your order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;