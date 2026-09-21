import './Register.scss';
import { Link } from 'react-router-dom';
import FooterDesktop from '../../component/Footer Desktop/FooterDesktop';
import FooterMobile from '../../component/Footer Mobile/FooterMobile';

function Register() {
  return (
    <>
      <div className='Register-parent'>
        <div className='form-parent'>
          <h1>REGISTER</h1>
          <form>
            <div className='details'>
              <p>FULL NAME*</p>
              <input type="text" />
            </div>

            <div className='details'>
              <p>EMAIL ADDRESS*</p>
              <input type="email" />
            </div>

            <div className='details'>
              <p>PASSWORD*</p>
              <input type="password" />
            </div>

            <div className='details'>
              <p>CONFIRM PASSWORD*</p>
              <input type="password" />
            </div>

            <div className='second-details'>
              <button className='login' type='button'>REGISTER</button>
            </div>
          </form>
          <div className='login-prompt'>
            <span>Already have an account?</span>
            <Link to="/login">Log in</Link>
          </div>
        </div>

      </div>

      <FooterDesktop />
      <FooterMobile />
    </>
  )
}

export default Register;