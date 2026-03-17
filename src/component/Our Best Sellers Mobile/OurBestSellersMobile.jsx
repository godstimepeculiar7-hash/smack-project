import './OurBestSellersMobile.scss';
import Bowl from '../../assets/Bowl.jpeg';

function OurBestSellersMobile() {
  return(
    <div className='our-best-sellers-mobile-parent'>
      <div className='our-best-sellers-mobile-text'>
        <span>Our best sellers</span>
      </div>

      <div className='our-best-sellers-mobile-image-parent'>
        <img src={Bowl} alt="Our best seller product" />
        <div className='our-best-sellers-mobile-image-parent-overlay'></div>
      </div>

      <div className='our-best-sellers-mobile-image-description-parent'>
        <div className='our-best-sellers-mobile-product-image-name'>Breaded Chicken Katsu Curry</div>
        <div className='mobile-price'>$3.99</div>
        <div className='mobile-measurement'>kcal: 568 | protein: 29g</div>
        <div className='mobile-buttons-parent'>
          <div className='mobile-bundle-buy'>BUNDLE BUY</div>
          <div className='mobile-quick-add'>QUICK ADD</div>
        </div>
      </div>
    </div>
  )
};

export default OurBestSellersMobile;