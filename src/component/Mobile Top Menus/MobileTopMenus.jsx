import './MobileTopMenus.scss';
import { MdChevronRight } from "react-icons/md";
import { useContext } from 'react';
import { ShopNowSmallMenu } from '../../../Context/ShopNowSmallMenu';
import { mobileShopNow } from '../Mobile Shop Now/context';
import { mobileBlog } from '../Mobile Blog/context';
import { whySmack } from '../Mobile Why Smack/context';

function MobileTopMenus() {
  const styles = ['default', 'show', 'unshow'];

  const { smallShopNow, setSmallShopNow } = useContext(ShopNowSmallMenu);

  function run() {
    setSmallShopNow(1);
    document.body.style.overflow = 'auto';
  }

  const {mobileShop, setMobileShop} = useContext(mobileShopNow)

  function runMobileShopNow() {
    setMobileShop(1)
    console.log(mobileShop)
  }
  
  const {blog, setBlog} = useContext(mobileBlog)

  function runMobileBlog() {
    setBlog(1);
    console.log(blog)
  }

  const {why, setWhy} = useContext(whySmack)

  function runWhySmack() {
    setWhy(1);
    console.log(why)
  }


  return (
    <div className={styles[smallShopNow]} onClick={run}>
      <div className='mobile-top-menus-parent'>
        <div className='details'>
          <div className='each' onClick={runMobileShopNow}>Shop Now <MdChevronRight size={37} color='grey' /></div>
          <div className='each'>Bundles</div>
          <div className='each' onClick={runMobileBlog}>Blog <MdChevronRight size={37} color='grey' /></div>
          <div className='each' onClick={runWhySmack}>Why SMACK <MdChevronRight size={37} color='grey' /></div>
          <div className='each'>Our Kitchen</div>
          <div className='each'>Stock SMACK</div>
        </div>
      </div>
    </div>
  );
};

export default MobileTopMenus;