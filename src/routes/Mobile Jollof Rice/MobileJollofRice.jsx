import './MobileJollofRice.scss';
import JollofRiceImage from '../../assets/jollofriceheader.jpg';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { JollofRiceProductsContext } from '../../backend/JollofRiceProducts'
import OurBestSellersMobile from '../../component/Our Best Sellers Mobile/OurBestSellersMobile';
import axios from 'axios';

function MobileJollofRice() {
  const [rice, setRice] = useState([])

  const navigate = useNavigate();
  function toProductsPage() {
    navigate('/smack-products');
  };

  useEffect(() => {
    const fetchRice = async () => {
      try{
        const response = await axios.get('https://smackbackend.onrender.com/rice-products');
        setRice(response.data)
        console.log(response.data);
      }catch(error) {
        console.log('Error fetching Rice:', error)
      }
    }

    fetchRice();
  }, [])
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