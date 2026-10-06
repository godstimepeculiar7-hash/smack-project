import './Navigation.scss';
import LargeNav from '../../component/largeNav/LargeNav';
import SmallNav from '../../component/smallNav/SmallNav';
import { Outlet, useNavigate } from 'react-router-dom';
import ShopNowDropdown from '../../component/ShopNow Dropdown/ShopNowDropdown';
import BlogDropdown from '../../component/Blog Dropdown/BlogDropdown';
import WhySmackDropdown from '../../component/Why Smack Dropdown/WhySmackDropdown'
import MobileTopMenus from '../../component/Mobile Top Menus/MobileTopMenus';
import ShopNowForMobile from '../../component/Mobile Shop Now/MobileShopNow';
import BlogForMobile from '../../component/Mobile Blog/MobileBlog';
import WhySmack from '../../component/Mobile Why Smack/MobileWhySmack';
import { useState } from 'react';
import ProductSearch from '../../component/Product Search/ProductSearch';

function Navigation() {
  const navigate = useNavigate();
  const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);

  const requireDashboardLogin = (
    message = 'Please log in to your SMACK dashboard before adding dishes to your cart.'
  ) => {
    setIsProductSearchOpen(false);
    navigate('/login', {
      state: { message }
    });
  };


  return (
    <div>
      <LargeNav
        onSearch={() => setIsProductSearchOpen(true)}
        onCartClick={() => requireDashboardLogin(
          'Please log in to your SMACK dashboard to view your cart.'
        )}
      />
      <SmallNav
        onSearch={() => setIsProductSearchOpen(true)}
        onCartClick={() => requireDashboardLogin(
          'Please log in to your SMACK dashboard to view your cart.'
        )}
      />
      <ProductSearch
        open={isProductSearchOpen}
        onClose={() => setIsProductSearchOpen(false)}
        onAddToCart={() => {
          requireDashboardLogin();
          return false;
        }}
      />
      <ShopNowDropdown />
      <BlogDropdown />
      <WhySmackDropdown />
      <MobileTopMenus />
      <ShopNowForMobile />
      <BlogForMobile />
      <WhySmack />
      <Outlet context={{ requireDashboardLogin }} />
    </div>
  )
}

export default Navigation;