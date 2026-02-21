import './ResetPassword.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import FooterDesktop from '../../component/Footer Desktop/FooterDesktop';

function ResetPassword() {
  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: false,
      mirror: true
    })
  }, [])

  return (
    <>
      <div className='reset-parent'>
        <div className='details' data-aos='fade-up' data-aos-delay='300' data-aos-duration='2000'>
          <div className='reset-password'>Reset Password</div>
          <div className='description'>Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.</div>
          <div className='one'>
            <p>USERNAME OR EMAIL *</p>
            <input type="text" name="" id="" />
          </div>
          <div className='reset-button'>RESET PASSWORD</div>
        </div>
      </div>
      <FooterDesktop />
    </>
  );
};

export default ResetPassword;