import './Login.scss';
import { Link } from 'react-router-dom';
import FooterDesktop from '../../component/Footer Desktop/FooterDesktop';
import FooterMobile from '../../component/Footer Mobile/FooterMobile';

function Login() {
  return (
    <>
      <div className='login-parent'>
        <div className='form-parent'>
          <h1>Login</h1>
          <form>
            <div className='details'>
              <p>USERNAME OR EMAIL ADDRESS*</p>
              <input type="email" placeholder='Email' />
            </div>

            <div className='details'>
              <p>PASSWORD*</p>
              <input type="password" placeholder='Password' />

              <div className='second-details'>
                <button className='login' type='button'>LOG IN</button>
              </div>
            </div>
          </form>
          <div className='register-prompt'>
            <span>Don't have an account?</span>
            <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>
      <FooterDesktop />
      <FooterMobile />
    </>
  );
};

export default Login;