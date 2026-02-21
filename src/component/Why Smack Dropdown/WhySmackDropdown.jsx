import './WhySmackDropdown.scss';
import Whysmack from '../../assets/Whysmack.jpg';
import { useContext } from 'react';
import { whySmackDrop } from '../../../Context/WhySmackDropdown';

function WhySmackDropdown() {
  const styles = ['default', 'show', 'unshow'];

  const {whySmack, setWhySmack} = useContext(whySmackDrop);

  const whySmackHandler = () => {
    setWhySmack(1)
    document.body.style.overflow = 'hidden';
  }

  const unWhySmackHandler = () => {
    setWhySmack(2);
    document.body.style.overflow = 'auto';
  }
  return (
    <div className={styles[whySmack]} onMouseOver={whySmackHandler} onMouseOut={unWhySmackHandler}>
      <div className='overflow'>
        <div className='why-smack'>
          <div className='left'>
            <div className='details'>
              <div className="links">Our Story</div>
              <div className="links">Sustainability</div>
              <div className="links">Our Kitchens</div>
              <div className="links">Benefits of Frozen</div>
              <div className="links">Community</div>
            </div>
            <div className='view-all-products'>VIEW ALL BLOG ARTICLES</div>
          </div>
          <div className='right'>
            <img src={Whysmack} alt="" />
            <div className='overlay'>
              <div className='right-details'>
                <h4>FROZEN FOR FRESHNESS</h4>
                <h1>Find out why</h1>
                <div className='shop-now'>LEARN MORE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default WhySmackDropdown;