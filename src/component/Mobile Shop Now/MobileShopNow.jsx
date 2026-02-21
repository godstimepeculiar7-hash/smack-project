import './MobileShopNow.scss';
import { MdChevronLeft } from 'react-icons/md';
import { Products } from '../ShopNow Dropdown/products';
import { useContext } from 'react';
import { mobileShopNow } from './context';

function ShopNowForMobile() {
  const style = ['main', 'stay', 'remove'];

  const { mobileShop, setMobileShop } = useContext(mobileShopNow);

  function runMobileShopNow() {
    setMobileShop(1)
    console.log(mobileShop)
  }

  function removeMobileShopNow(e) {
    e.stopPropagation()
    setMobileShop(2);
    console.log(mobileShop)
  }

  return (
    <div className={style[mobileShop]} onClick={runMobileShopNow}>
      <div className='mobile-shop-now'>
        <div className='back' onClick={(e) => removeMobileShopNow(e)}><MdChevronLeft size={37} />Back</div>
        {Products.map((product) => {
          return (
            <div key={product.id} className='details'>
              <div className='image'>
                <img src={product.image} alt="" />
                <div className='overlay'></div>
              </div>
              <div className='description'>
                <div className='first'>{product.h1}</div>
                <div className='second'>{product.h5}</div>
              </div>
            </div>
          )
        })}

        <div className='shop'>VIEW ALL PRODUCTS</div>
      </div>
    </div>
  );
};

export default ShopNowForMobile;