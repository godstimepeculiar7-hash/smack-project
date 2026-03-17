import './MobileJollofRice.scss';
import JollofRiceImage from '../../assets/jollofriceheader.jpg';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { JollofRiceProductsContext } from '../../backend/JollofRiceProducts'

import OurBestSellersMobile from '../../component/Our Best Sellers Mobile/OurBestSellersMobile';


function MobileJollofRice() {
  const { rice } = useContext(JollofRiceProductsContext);
  console.log('Rice inside foodComponent:', rice);
  const navigate = useNavigate();
  function toProductsPage() {
    navigate('/smack-products');
  }
  return (
    <>
      <div className='mobile-jollof-rice-parent'>
        <img src={JollofRiceImage} alt="" />
        <div className='mobile-jollof-rice-parent-overlay'>
          <div className='mobile-details-parent'>
            <span onClick={toProductsPage}><h5>Product</h5></span>
            <h1>Jollof Rice</h1>
            <p>Save money and improve your nutrition by filling your freezer with our legendary Pot O Gold meals! They’re high in protein, low in sugar, and ready to eat in just 6 minutes.
            </p>
          </div>
        </div>
      </div>

      <OurBestSellersMobile data={rice} />
    </>
  )
}

export default MobileJollofRice;