import './OurBestSellersMobile.scss';
import Bowl from '../../assets/Bowl.jpeg';

function OurBestSellersMobile() {
  return(
    <div className='our-best-sellers-mobile-parent'>
      <div className='our-best-sellers-text'>
        <span>Our best sellers</span>
      </div>

      <div className='our-best-sellers-image-parent'>
        <img src={Bowl} alt="Our best seller product" />
        <div className='our-best-sellers-image-parent-overlay'></div>
      </div>

      <div className='our-best-sellers-image-description-parent'>
        <div className='our-best-sellers-product-image-name'>Breaded Chicken Katsu Curry</div>
        <div className='price'>$3.99</div>
        <div className='measurement'>kcal: 568 | protein: 29g</div>
        <div className='buttons-parent'>
          <div className='bundle-buy'>BUNDLE BUY</div>
          <div className='quick-add'>QUICK ADD</div>
        </div>
      </div>
    </div>
  )
};

export default OurBestSellersMobile;