import './SmackProducts.scss';
import FoodComponentDesktop from '../../component/Food Component Desktop/FoodComponentDesktop';
import FoodComponentMobile from '../../component/Food Component Mobile/FoodComponentMobile';
import CantDecideWhatToPick from '../../component/Cant Decide What To Pick/CantDecideWhatToPick';

function SmackProducts() {
  return(
    <>
    <div className='smack-product-parent'>
      <h1 data-aos='fade-up' data-aos-delay='300' data-aos-duration='2000'>Our Products</h1>
        <div className='smack-products-description' data-aos='fade-up' data-aos-delay='300' data-aos-duration='2000'>
          <p className='smack-products-note'>We are passionate about real food.</p>
          <p>The SMACK range has been designed to incorporate a full mix of food suitable for people who need convenient, healthy food that tastes great and is quick to prepare.</p>
        </div>
    </div>

    <FoodComponentDesktop />
    <FoodComponentMobile />
    <CantDecideWhatToPick />
    </>
  )
}

export default SmackProducts;