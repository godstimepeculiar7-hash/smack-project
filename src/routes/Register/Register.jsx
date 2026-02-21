import './Register.scss';
import FooterDesktop from '../../component/Footer Desktop/FooterDesktop';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../backend/firebase.utils';
import { saveUserToDataBase } from '../../backend/firebase.utils';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import FooterMobile from '../../component/Footer Mobile/FooterMobile';
import Swal from 'sweetalert2';

const googleProvider = new GoogleAuthProvider();

function Register() {
  <title>Register</title>
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [right, setRight] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');

  async function signUpWithGoogle(e) {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const { user } = result;
      await saveUserToDataBase(user)

    } catch (error) {
      console.log(error.code)
      if (error.code === 'auth/weak-password') {
        setError('Password is too weak');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('This email already has an account');
      } else if (error.code === 'auth/invalid-email') {
        setError('Email format is wrong');
      } else if(error.code === 'auth/internal-error') {
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

  async function emailAndPassword(e) {
    e.preventDefault();
    const passwordErrors = validatePassword(password);

    if (passwordErrors.length > 0) {
      setError(passwordErrors.join(', '));
      return;
    }


    if (password !== confirmPassword) {
      setError('Passwords must match');
      return false;
    } else {
      setError('');
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = result;
      await saveUserToDataBase(user, {phone, fullName});
      console.log(user.uid);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setEmailError('');
      setRight('');
      setPhone('');
      setFullName('');

    } catch (error) {
      if (error.code === 'auth/weak-password') {
        setError('Password is too weak');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('This email already has an account');
      } else if (error.code === 'auth/invalid-email') {
        console.log(error.code)
        setEmailError('Email format is wrong');
      }
    }
  }

  function validatePassword(password) {
    const errors = [];

    if (!/[A-Z]/.test(password)) {
      errors.push('Uppercase letter needed');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Lowercase letter needed');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Number needed');
    }

    if (password.length < 6) {
      errors.push('Password must be at least 6 characters');
    } else {
      setRight('Password met all requirements')
    }

    return errors; // returns an array of missing rules
  }



  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: false,
      mirror: true
    })
  }, [])

  return (
    <>
      <div className='Register-parent'>
        <div className='form-parent' data-aos='fade-up' data-aos-delay='300' data-aos-duration='2000'>
          <h1>REGISTER</h1>
          <form onSubmit={emailAndPassword}>
            <div className='details'>
              <p>FULL NAME*</p>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>

            <div className='details'>
              <p>PHONE*</p>
              <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className='details'>
              <p>EMAIL ADDRESS*</p>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <h5 className='wrong-password'>{emailError}</h5>
            </div>

            <div className='details'>
              <p>PASSWORD*</p>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <h5 className='wrong-password'>{error}</h5>
              <h5 className='right-password'>{right}</h5>

              <div className='details'>
                <p>CONFIRM PASSWORD*</p>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <h5 className='wrong-password'>{error}</h5>
                <h5 className='right-password'>{right}</h5>
              </div>

              <div className='second-details'>

                <button className='login' type='submit'>REGISTER</button>
              </div>

              <button className='sign-in-with-google' type='button' onClick={(e) => signUpWithGoogle(e)}><FcGoogle size={22} className='google' />Sign up with Google</button>
              <div className='third-details'>
                <Link to="/login">Already have an account? Login here</Link>
              </div>

            </div>
          </form>
        </div>

      </div>

      <FooterDesktop />
      <FooterMobile />
    </>
  )
}

export default Register;