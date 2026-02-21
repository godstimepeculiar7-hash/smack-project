import './Login.scss';
import { Link } from 'react-router-dom';
import FooterDesktop from '../../component/Footer Desktop/FooterDesktop';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { auth } from '../../backend/firebase.utils';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import FooterMobile from '../../component/Footer Mobile/FooterMobile';

const googleProvider = new GoogleAuthProvider();

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function signWithEmailAndPassword(e) {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;

      setError('');

      Swal.fire({
        icon: 'success',
        title: 'Congratulations',
        allowOutsideClick: false,
        showCloseButton: true,
        showConfirmButton: true
      })
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setError('Incorrect email or password');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (error.code === 'auth/user-disabled') {
        setError('This account has been disabled');
      } else {
        setError('Login failed. Try again.')
      }
    }

    setEmail('')
    setPassword('');
  }



  async function signInWithGoogle(e) {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result
    } catch (error) {
      console.log(error.code)
      if (error.code === 'auth/internal-error') {
        Swal.fire({
          icon: 'error',
          title: 'Please connect to the internet',
          showCloseButton: true,
          allowOutsideClick: false,
          draggable: false
        })
      }
    }
  }


  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: false,
      mirror: true
    })

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('logged in:', user.email)
      } else {
        console.log('not logged in')
      }
    })
  }, [])

  return (
    <>
      <div className='login-parent'>
        <div className='form-parent' data-aos='fade-up' data-aos-delay='300' data-aos-duration='2000'>
          <h1>Login</h1>
          <form onSubmit={(e) => signWithEmailAndPassword(e)}>
            <div className='details'>
              <p>USERNAME OR EMAIL ADDRESS*</p>
              <input type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
              <h5 className='wrong-password'>{error}</h5>
            </div>

            <div className='details'>
              <p>PASSWORD*</p>
              <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
              <h5 className='wrong-password'>{error}</h5>

              <div className='second-details'>
                <div className='radio-div'>
                  <input type="radio" className='radio' />
                  <p className='remember-me'>REMEMBER ME</p>
                </div>

                <button className='login' type='submit'>LOG IN</button>
              </div>
              <button className='sign-in-with-google' type='button' onClick={(e) => signInWithGoogle(e)}><FcGoogle size={22} className='google' />Sign in with Google</button>
              <div className='third-details'>
                <Link to="/register">Need an account? Register here</Link>
                <Link to="/my-account/lost-password">Lost your password?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <FooterDesktop />
      <FooterMobile />
    </>
  );
};

export default Login;