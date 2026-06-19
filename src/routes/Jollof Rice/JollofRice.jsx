import './JollofRice.scss';
import JollofRiceImage from '../../assets/jollofriceheader.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OurBestSellersDesktop from '../../component/Our Best Sellers Desktop/OurBestSellersDesktop';
import { useContext } from 'react';
import axios from 'axios';


function JollofRice() {
  const [rice, setRice] = useState([]);

  const navigate = useNavigate();
  function toProductsPage() {
    navigate('/products');
  }

  useEffect(() => {

   const fetchRice = async () => {
      try {
        const response = await axios.get('https://smackbackend.onrender.com/rice');
        setRice(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching rice:', error)
      }
    }

    fetchRice();
  }, []);

  return (
    <>
      <div className='parent'>
        <img src={JollofRiceImage} alt="" />
        <div className='parent-overlay'>
          <div className='details-parent'>
            <span onClick={toProductsPage}><h5>Product</h5></span>
            <h1>Jollof Rice</h1>
            <p>Save money and improve your nutrition by filling your freezer with our legendary Pot O Gold meals! They’re high in protein, low in sugar, and ready to eat in just 6 minutes.
            </p>
          </div>
        </div>
      </div>

      <OurBestSellersDesktop data={rice} />

    </>
  )
}

export default JollofRice;