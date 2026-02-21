import './SmallNav.scss';
import searchIcon from '../../assets/search-icon.png';
import userIcon from '../../assets/user-icon.png';
import shopingBag from '../../assets/shopping-icon.png';
import { useContext } from 'react';
import { ShopNowSmallMenu } from '../../../Context/ShopNowSmallMenu';
import { MdClose } from 'react-icons/md';
import { MdMenu } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


function SmallNav() {
  const { smallShopNow, setSmallShopNow } = useContext(ShopNowSmallMenu);
  const navigate = useNavigate()

  const smallmenu = () => {
    setSmallShopNow(1)
    console.log(smallShopNow)
    document.body.style.overflow = 'hidden';
  }

  const removeSmallMenu = () => {
    setSmallShopNow(2);
    document.body.style.overflow = 'auto';
  }

  function home() {
    navigate('/');
  }

  function contact() {
    navigate('/login')
  }



  return (
    <div>
      <div id='blur'>
        <div className='fixed-width'>
          <div className='fixed-width-left-section' onClick={home}>
            SMACK
          </div>
          <div className='fixed-width-right-section'>
            <img src={searchIcon} alt="search icon" className='fixed-width-right-section-icons' />
            <img src={userIcon} alt="user icon" className='fixed-width-right-section-icons' onClick={contact} />
            <img src={shopingBag} alt="shoping bag" className='fixed-width-right-section-icons' />
            {smallShopNow === 1 ? (<MdClose size={30} color='white' onClick={removeSmallMenu} className='cancel'/>) : (
              <MdMenu size={30} onClick={smallmenu} color='white'/>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmallNav;