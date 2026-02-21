import './LargeNav.scss';
import facebook from '../../assets/facebook.svg';
import tiktok from '../../assets/tiktok.svg';
import instagram from '../../assets/instagram.svg';
import youtube from '../../assets/youtube.svg';
import searchIcon from '../../assets/search-icon.png';
import userIcon from '../../assets/user-icon.png';
import shoopingBag from '../../assets/shopping-icon.png';
import ReactFlagsSelect from 'react-flags-select';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useContext } from 'react';
import { shopNow } from '../../../Context/ShopNowDropdown';
import { blogDrop } from '../../../Context/BlogDropdown';
import { whySmackDrop } from '../../../Context/WhySmackDropdown';
import { useNavigate } from 'react-router-dom';



function LargeNav() {
  const { shop, setShop } = useContext(shopNow);

  const handler = () => {
    setShop(1);
    console.log(shop)
    document.body.style.overflow = 'hidden';
  }

  const unhandler = () => {
    setShop(2);
    document.body.style.overflow = 'auto';
  }

  const { blog, setBlog } = useContext(blogDrop)

  const blogHandler = () => {
    setBlog(1);
    console.log(blog)
    document.body.style.overflow = 'hidden';
  }

  const unBlogHandler = () => {
    setBlog(2)
    document.body.style.overflow = 'auto';
  }

  const { whySmack, setWhySmack } = useContext(whySmackDrop);

  const whySmackHandler = () => {
    setWhySmack(1);
    console.log(whySmack)
    document.body.style.overflow = 'hidden';
  }

  const unWhySmackHandler = () => {
    setWhySmack(2);
    document.body.style.overflow = 'auto';
  }

  const navigate = useNavigate();

  function Cart() {
    navigate('/cart');
  }

  function home() {
    navigate('/');
  }

  function login() {
    navigate('/login');
  }

  function findaretailer() {
    navigate('/find-a-retailer');
  }

  function becomeastockist() {
    navigate('/become-a-stockist');
  }

  function contactus() {
    navigate('/contact-us');
  }


  const [selectedCountry, setSelectedCountry] = useState('');

  function handleSelectedCountry(countryCode) {
    setSelectedCountry(countryCode);

    if (countryCode !== 'NG') {
      /* SHOW ALERT POP UP */

      async function popUp() {
        const answer = await Swal.fire({
          title: 'Congratulations 🌎',
          text: `This service is availble in ${countryCode}`,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'black',
          allowOutsideClick: false,
          draggable: true,
          showCloseButton: true
        })

        if (answer.isConfirmed) {
          setSelectedCountry(countryCode);
        } else if (answer.isDismissed) {
          const secondAnswer = await Swal.fire({
            title: 'Error',
            text: 'Please select a country',
            icon: 'warning',
            showConfirmButton: true,
            confirmButtonText: 'OK'
          })

          if (secondAnswer.isConfirmed) {
            setSelectedCountry('');
          }
        }
      }

      popUp()
    }

  }




  return (
    <div>
      <div className='blur'>
        <div className='fixed-width'>
          <div className='top-header'>
            <div className='top-header-left-section'>
              <img src={facebook} alt="facebook icon" className='facebook-icon' />
              <img src={tiktok} alt="tiktok icon" className='tiktok-icon' />
              <img src={instagram} alt="instagram icon" className='instagram-icon' />
              <img src={youtube} alt="youtube icon" className='youtube-icon' />
            </div>
            <ReactFlagsSelect
              className='flag-selector'

              selected={selectedCountry} // The flag currently selected
              onSelect={handleSelectedCountry} // Function that runs whem the flag is clicked
              searchable={true}
              placeholder='Select Country'
              countries={['US', 'NG', 'GB']}
            />
            <div className='top-header-right-section'>
              <p className='top-header-right-section-routes' onClick={findaretailer}>Find a retailer</p>
              <p className='top-header-right-section-routes' onClick={becomeastockist}>Become a stockist</p>
              <p className='top-header-right-section-routes' onClick={contactus}>Contact us</p>
              <p className='top-header-right-section-routes' onClick={login}>Wholesale</p>
            </div>
          </div>
        </div>
        <hr />
        <div className='sub-fixed-width'>
          <div className='sub-fixed-width-left-section' onClick={home}>
            SMACK
          </div>
          <div className='sub-fixed-width-middle-section'>
            <p className='sub-fixed-width-middle-section-routes' onMouseOver={handler} onMouseOut={unhandler}>
              Shop Now
              <span className='drop-down'>▼</span>
            </p>

            <p className='sub-fixed-width-middle-section-routes'>
              Bundles
            </p>

            <p className='sub-fixed-width-middle-section-routes' onMouseOver={blogHandler} onMouseOut={unBlogHandler}>
              Blog
              <span className='drop-down'>▼</span>
            </p>

            <p className='sub-fixed-width-middle-section-routes' onMouseOver={whySmackHandler} onMouseOut={unWhySmackHandler}>
              Why SMACK
              <span className='drop-down'>▼</span>
            </p>

            <p className='sub-fixed-width-middle-section-routes'>
              Our Kitchen
            </p>

            <p className='sub-fixed-width-middle-section-routes'>
              Stock SMACK
            </p>
          </div>
          <div className='sub-fixed-right-section'>
            <img src={searchIcon} alt="search icon" className='sub-fixed-right-section-icons' />
            <img src={userIcon} alt="user icon" className='sub-fixed-right-section-icons' onClick={login} />
            <img src={shoopingBag} alt="shoping bag" className='sub-fixed-right-section-icons' onClick={Cart}/>
            <button className='basket'>0</button>
          </div>

        </div>
      </div>



    </div>
  )
}

export default LargeNav;