import './ShopNowDropdown.scss';
import Shopnowrightimage from '../../assets/Smackdropdownimage.png'
import { Products } from './products';
import { useContext } from 'react';
import { shopNow } from '../../../Context/ShopNowDropdown';

function ShopNowDropdown() {
  let styles = ['default', 'show', 'unshow'];
  let { shop, setShop } = useContext(shopNow);

  let handler = () => {
    setShop(1);
    document.body.style.overflow = 'hidden';
  }

  let unhandler = () => {
    setShop(2);
    document.body.style.overflow = 'auto';
  }
 
  return (
    <div className={styles[shop]} onMouseOver={handler} onMouseOut={unhandler}>

      <div className="overflw">

        <div className='shop-now-drop-down'>
          <div className='drop-down-parent'>
            <div className='left'>
              <div className='left-parent'>
                {Products.map((product) => {
                  return (
                    <div key={product.id} className='left-products'>
                      <div className='left-products-left'>
                        <img src={product.image} alt="" />
                        <div className='overlay'></div>
                      </div>
                      <div className='left-products-right'>
                        <h1>{product.h1}</h1>
                        <h5>{product.h5}</h5>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='view-all-products'>VIEW ALL PRODUCTS</div>
            </div>
            <div className='right'>
              <img src={Shopnowrightimage} alt="" />
              <div className='right-overlay'>
                <div className='right-details'>
                  <h4>COLLABORATION</h4>
                  <h1>SMACK</h1>
                  <div className='shop-now'>SHOP NOW</div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ShopNowDropdown;