import './OurBestSellersMobile.scss';
import { useOutletContext } from 'react-router-dom';


function OurBestSellersMobile({ data }) {
  const { requireDashboardLogin } = useOutletContext();

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
                <button className='mobile-quick-add' type="button" onClick={requireDashboardLogin}>
                  QUICK ADD
                </button>
              </div>
            </div>
          </div>
        )
      })}


    </div>
  )
};

export default OurBestSellersMobile;