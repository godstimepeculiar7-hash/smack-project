import './Swallow.scss';
import JollofRiceImage from '../../assets/jollofriceheader.jpg';
import { useNavigate } from 'react-router-dom';
import OurBestSellersDesktop from '../../component/Our Best Sellers Desktop/OurBestSellersDesktop';
import { useContext } from 'react';
import { SwallowProductContext } from '../../backend/SwallowProducts';


function Swallow() {
  const { swallow } = useContext(SwallowProductContext)
  console.log('Swallow inside foodComponent:', swallow);
  const navigate = useNavigate();
  function toProductsPage() {
    navigate('/products');
  }
  return (
    <>
      <div className='parent'>
        <img src={JollofRiceImage} alt="" />
        <div className='parent-overlay'>
          <div className='details-parent'>
            <span onClick={toProductsPage}><h5>Product</h5></span>
            <h1>Swallow</h1>
            <p>Save money and improve your nutrition by filling your freezer with our legendary Pot O Gold meals! They’re high in protein, low in sugar, and ready to eat in just 6 minutes.
            </p>
          </div>
        </div>
      </div>

      <OurBestSellersDesktop data={swallow} />

    </>

  )
}

export default Swallow;