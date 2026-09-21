import './Login.scss';
import { Link } from 'react-router-dom';
import FooterDesktop from '../../component/Footer Desktop/FooterDesktop';
import FooterMobile from '../../component/Footer Mobile/FooterMobile';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  function validateForm() {
    const nextErrors = {};
    const email = formData.email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const commonDomainTypos = {
      'gmail.comm': 'gmail.com',
      'gmail.co': 'gmail.com',
      'gmai.com': 'gmail.com',
      'gmial.com': 'gmail.com',
      'yahooo.com': 'yahoo.com',
      'outlok.com': 'outlook.com',
      'hotmai.com': 'hotmail.com'
    };

    if (!email) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!emailPattern.test(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    } else {
      const [emailUsername, emailDomain] = email.split('@');
      const correctedDomain = commonDomainTypos[emailDomain];

      if (correctedDomain) {
        nextErrors.email = `Did you mean ${emailUsername}@${correctedDomain}?`;
      }
    }

    if (!formData.password) {
      nextErrors.password = 'Please enter your password.';
    } else {
      const passwordRequirements = [];

      if (!/[A-Z]/.test(formData.password)) passwordRequirements.push('one uppercase letter');
      if (!/[a-z]/.test(formData.password)) passwordRequirements.push('one lowercase letter');
      if (!/[0-9]/.test(formData.password)) passwordRequirements.push('one number');
      if (!/[^A-Za-z0-9]/.test(formData.password)) passwordRequirements.push('one special character');

      if (passwordRequirements.length > 0) {
        nextErrors.password = `Password must contain ${passwordRequirements.join(', ')}.`;
      }
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log('Login form is valid and ready for the backend:', formData);
    }
  }

  return (
    <>
      <div className='login-parent'>
        <div className='form-parent'>
          <h1>Login</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className='details'>
              <label htmlFor='login-email'>USERNAME OR EMAIL ADDRESS*</label>
              <input
                id='login-email'
                type='email'
                placeholder='Email'
                value={formData.email}
                aria-invalid={Boolean(errors.email)}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              />
              {errors.email && <p className='field-error'>{errors.email}</p>}
            </div>

            <div className='details'>
              <label htmlFor='login-password'>PASSWORD*</label>
              <div className='password-input-wrapper'>
                <input
                  id='login-password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  value={formData.password}
                  aria-invalid={Boolean(errors.password)}
                  onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                />
                <button
                  className='password-visibility-button'
                  type='button'
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff aria-hidden='true' /> : <FiEye aria-hidden='true' />}
                </button>
              </div>
              {errors.password && <p className='field-error'>{errors.password}</p>}

              <div className='second-details'>
                <button className='login' type='submit'>LOG IN</button>
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