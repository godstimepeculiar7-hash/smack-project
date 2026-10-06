import './Login.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FooterDesktop from '../../component/Footer Desktop/FooterDesktop';
import FooterMobile from '../../component/Footer Mobile/FooterMobile';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      try {
        await axios.post(
          'http://localhost:5000/auth/login',
          {
            email: formData.email,
            password: formData.password
          },
          {
            withCredentials: true
          }
        );

        navigate('/dashboard');

      } catch (error) {
        if (error.response) {
          const responseMessage = error.response.data?.message;
          setErrors({
            form: typeof responseMessage === 'string'
              ? responseMessage
              : 'Invalid username/email or password.',
            credentials: error.response.status === 401
          });
        } else {
          setErrors({
            form: 'Unable to connect to the server. Please try again.'
          });
        }
      }
    }
  }

  return (
    <>
      <div className='login-parent'>
        <div className='form-parent'>
          <h1>Login</h1>
          {location.state?.message && (
            <p className="login-redirect-notice" role="status">
              {location.state.message}
            </p>
          )}
          <form onSubmit={handleSubmit} noValidate>
            {errors.form && (
              <p id="login-form-error" className="form-error" role="alert">{errors.form}</p>
            )}
            <div className='details'>
              <label htmlFor='login-email'>USERNAME OR EMAIL ADDRESS*</label>
              <input
                id='login-email'
                type='email'
                placeholder='Email'
                value={formData.email}
                aria-invalid={Boolean(errors.email || errors.credentials)}
                aria-describedby={errors.email ? 'login-email-error' : errors.form ? 'login-form-error' : undefined}
                onChange={(event) => {
                  setFormData({ ...formData, email: event.target.value });
                  setErrors((currentErrors) => ({
                    ...currentErrors,
                    form: '',
                    credentials: false
                  }));
                }}
              />
              {errors.email && <p id='login-email-error' className='field-error'>{errors.email}</p>}
            </div>

            <div className='details'>
              <label htmlFor='login-password'>PASSWORD*</label>
              <div className='password-input-wrapper'>
                <input
                  id='login-password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  value={formData.password}
                  aria-invalid={Boolean(errors.password || errors.credentials)}
                  aria-describedby={errors.password ? 'login-password-error' : errors.form ? 'login-form-error' : undefined}
                  onChange={(event) => {
                    setFormData({ ...formData, password: event.target.value });
                    setErrors((currentErrors) => ({
                      ...currentErrors,
                      form: '',
                      credentials: false
                    }));
                  }}
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
              {errors.password && <p id='login-password-error' className='field-error'>{errors.password}</p>}

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