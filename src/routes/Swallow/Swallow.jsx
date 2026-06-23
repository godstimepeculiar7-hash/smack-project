import './Swallow.scss';
import JollofRiceImage from '../../assets/jollofriceheader.jpg';
import { useNavigate } from 'react-router-dom';
import OurBestSellersDesktop from '../../component/Our Best Sellers Desktop/OurBestSellersDesktop';
import OurBestSellersMobile from '../../component/Our Best Sellers Mobile/OurBestSellersMobile';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Swallow() {
  const [swallow, setSwallow] = useState([]);

  const navigate = useNavigate();
  function toProductsPage() {
    navigate('/products');
  }

  useEffect(() => {
    const fetchSwallow = async () => {
      try {
        const response = await axios.get('https://smackbackend.onrender.com/swallow-products');
        setSwallow(response.data);
      } catch (error) {
        console.log('Error fetching swallow:', error);
      }
    }

    fetchSwallow();
  }, [])
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

      <OurBestSellersDesktop data={swallow} />      <OurBestSellersMobile data={swallow} />
    </>

  )
}

export default Swallow;