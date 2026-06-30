import './OurBestSellersMobile.scss';
import Bowl from '../../assets/Bowl.jpeg';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { getSessionId } from '../../backend/utils/session';


function OurBestSellersMobile({ data, cartQuantity }) {
  const { getTotalQuantity } = useOutletContext();

  return (
    <div className='our-best-sellers-mobile-parent'>
      <div className='our-best-sellers-mobile-text'>
        <span>Our best sellers</span>
      </div>

      {data.map((product) => {
        return (
          <div>
            <div key={product.id} className='our-best-sellers-mobile-image-parent'>
              <img src={product.image} alt="Our best seller product" />
              <div className='our-best-sellers-mobile-image-parent-overlay'></div>
            </div>


            <div className='our-best-sellers-mobile-image-description-parent'>
              <div className='our-best-sellers-mobile-product-image-name'>{product.name}</div>
              <div className='mobile-price'>{product.priceCents}</div>
              <div className='mobile-measurement'>{product.kg}</div>
              <div className='mobile-buttons-parent'>
                <div className='mobile-bundle-buy'>BUNDLE BUY</div>
                <div className='mobile-quick-add' onClick={async () => {
                  try {
                    const sessionId = getSessionId();
                    const productId = product._id
                    const response = await axios.post('https://smackbackend.onrender.com/cart', {
                      sessionId,
                      productId
                    });
                    console.log(response.data)
                    await getTotalQuantity();
                  } catch (error) {
                    console.log(error)
                  }

                }}>QUICK ADD</div>
              </div>
            </div>
          </div>
        )
      })}


    </div>
  )
};

export default OurBestSellersMobile;