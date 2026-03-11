import './Home.scss';
import smackVideo from '../../assets/smack 1.mp4';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Excellent from '../../component/Excellent/Excellent';
import SubscribeAndSaveForDesktop from '../../component/Subscribe and Save for Desktop/SubscribeAndSave';
import SubscribeAndSaveForMobile from '../../component/Subscribe and Save for mobile/SubscribeAndSave';
import WhyEveryoneChoosesSmackDesktop from '../../component/Why Everyone Chooses Smack for Desktop/WhyEveryoneChoosesSmackDesktop';
import WhyEveryoneChoosesSmackMobile from '../../component/Why Everyone Chooses Smack for Mobile/WhyEveryoneChoosesSmackMobile';
import FoodComponentDesktop from '../../component/Food Component Desktop/FoodComponentDesktop';
import FoodComponentMobile from '../../component/Food Component Mobile/FoodComponentMobile';
import SmackServices from '../../component/Smack Services/SmackServicesDesktop';
import SmackServicesMobile from '../../component/Smack Services Mobile/SmackServicesMobile';
import HistoryOfSmackDesktop from '../../component/History of Smack Desktop/HistoryOFSmackDesktop';
import HistoryOfSmackMobile from '../../component/History of Smack Mobile/HistoryOfSmackMobile';
import OurBestSellersProduct from '../../component/Our Best Sellers Products/OurBestSellersProducts';
import OurBestSellersMobile from '../../component/Our Best Sellers Mobile/OurBestSellersMobile';
import FindTheRightBundleDesktop from '../../component/Find The Right Bundle Desktop/FindTheRightBundleDesktop';
import FindTheRightBundleMobile from '../../component/Find The Right Bundle Mobile/FindTheRightBundleMobile';
import GoogleMap from '../../component/Google Map/GoogleMap';
import FooterDesktop from '../../component/Footer Desktop/FooterDesktop';
import FooterMobile from '../../component/Footer Mobile/FooterMobile';
import { uploadProducts } from '../../backend/firebase.utils';
import { useNavigate } from 'react-router-dom';
import { uploadSwallow } from '../../backend/firebase.utils';

function HomePage() {
  const navigate = useNavigate()

  function product() {
    navigate('/smack-products')
  }




  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: true,
      mirror: true
    })



  }, [])


  return (
    <div>
      <div className='home-page-video'>
        <video src={smackVideo} autoPlay muted loop className="smack-video" />
        <div className='home-page-video-overlay'>
          <div className='text' data-aos='fade-up' data-aos-delay='900' data-aos-duration='3000'>
            <p className='heck-yeah'>HECK YEAH!</p>
            <p className='caption'>Dive into our ALL-NEW-flavor-crafted to fuel your hunger and you hustle. Smack Resturant: food that hits just right, every time!</p>
            <button className='order-button' onClick={product}>
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      <Excellent />
      <SubscribeAndSaveForDesktop />
      <SubscribeAndSaveForMobile />
      <Excellent />
      <WhyEveryoneChoosesSmackDesktop />
      <WhyEveryoneChoosesSmackMobile />
      <FoodComponentDesktop />
      <FoodComponentMobile />
      <SmackServices />
      <SmackServicesMobile />
      <HistoryOfSmackDesktop />
      <HistoryOfSmackMobile />
      <OurBestSellersProduct />
      <OurBestSellersMobile />
      <FindTheRightBundleDesktop />
      <FindTheRightBundleMobile />
      <GoogleMap />
      <FooterDesktop />
      <FooterMobile />
    </div>
  )
}


export default HomePage;