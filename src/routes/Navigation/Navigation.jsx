import './Navigation.scss';
import LargeNav from '../../component/largeNav/LargeNav';
import SmallNav from '../../component/smallNav/SmallNav';
import { Outlet } from 'react-router-dom';
import ShopNowDropdown from '../../component/ShopNow Dropdown/ShopNowDropdown';
import BlogDropdown from '../../component/Blog Dropdown/BlogDropdown';
import WhySmackDropdown from '../../component/Why Smack Dropdown/WhySmackDropdown'
import MobileTopMenus from '../../component/Mobile Top Menus/MobileTopMenus';
import ShopNowForMobile from '../../component/Mobile Shop Now/MobileShopNow';
import BlogForMobile from '../../component/Mobile Blog/MobileBlog';
import WhySmack from '../../component/Mobile Why Smack/MobileWhySmack';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getSessionId } from '../../backend/utils/session';
import LoadingOverlay from '../../component/Our Best Sellers Desktop/Loading Overlay/LoadingOverlay';

function Navigation() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [loading, setLoading] = useState(false);


  const getTotalQuantity = async () => {
    const sessionId = getSessionId();
    const response = await axios.get('https://smackbackend.onrender.com/cart-quantity', {
      params: {
        sessionId
      }
    });
    setTotalQuantity(response.data.totalQuantity);
    console.log(response.data);
  };

  useEffect(() => {
    getTotalQuantity();
  }, [])


  return (
    <div>
      <LargeNav totalQuantity={totalQuantity} />
      <SmallNav totalQuantity={totalQuantity} />
      <ShopNowDropdown />
      <BlogDropdown />
      <WhySmackDropdown />
      <MobileTopMenus />
      <ShopNowForMobile />
      <BlogForMobile />
      <WhySmack />
      {loading && <LoadingOverlay />}
      <Outlet context={{ getTotalQuantity, setLoading }} />
    </div>
  )
}

export default Navigation;