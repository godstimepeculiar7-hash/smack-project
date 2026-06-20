import './Chinese Dishes.scss';
import JollofRiceImage from '../../assets/jollof.avif';
import { useNavigate } from 'react-router-dom';
import OurBestSellersMobile from '../../component/Our Best Sellers Mobile/OurBestSellersMobile';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

function ChineseDishes() {
    const [swallow, setSwallow] = useState([]);
    const navigate = useNavigate();
    
    function toProductsPage() {
        navigate('/smack-products');
    }

    useEffect(() => {
        const fetchSwallow = async () => {
            try{
                const response = await axios.get('https://smackbackend.onrender.com/swallow');
                setSwallow(response.data)
                console.log(response.data);
            } catch(error) {
                console.log('Error fetching Swallow:', error)
            }
        }

        fetchSwallow();
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

                <OurBestSellersMobile data={swallow} />


            </>

    )
}

export default ChineseDishes;