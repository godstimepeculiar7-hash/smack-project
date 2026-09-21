import './Register.scss';
import { Link } from 'react-router-dom';
import FooterDesktop from '../../component/Footer Desktop/FooterDesktop';
import FooterMobile from '../../component/Footer Mobile/FooterMobile';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function validateForm() {
    const nextErrors = {};
    const fullName = formData.fullName.trim();
    const email = formData.email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const fullNamePattern = /^[A-Za-z]+(?:[ '-][A-Za-z]+)+$/;
    const commonDomainTypos = {
      'gmail.comm': 'gmail.com',
      'gmail.co': 'gmail.com',
      'gmai.com': 'gmail.com',
      'gmial.com': 'gmail.com',
      'yahooo.com': 'yahoo.com',
      'outlok.com': 'outlook.com',
      'hotmai.com': 'hotmail.com'
    };

    if (!fullName) {
      nextErrors.fullName = 'Please enter your full name.';
    } else if (!fullNamePattern.test(fullName)) {
      nextErrors.fullName = 'Please enter a valid full name.';
    }

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
      nextErrors.password = 'Please enter a password.';
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

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log('Form is valid and ready for the backend:', formData);
    }
  }

  return (
    <>
      <div className='Register-parent'>
        <div className='form-parent'>
          <h1>REGISTER</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className='details'>
              <label htmlFor='full-name'>FULL NAME*</label>
              <input
                id='full-name'
                type='text'
                value={formData.fullName}
                aria-invalid={Boolean(errors.fullName)}
                onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
              />
              {errors.fullName && <p className='field-error'>{errors.fullName}</p>}
            </div>

            <div className='details'>
              <label htmlFor='email'>EMAIL ADDRESS*</label>
              <input
                id='email'
                type='email'
                value={formData.email}
                aria-invalid={Boolean(errors.email)}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              />
              {errors.email && <p className='field-error'>{errors.email}</p>}
            </div>

            <div className='details'>
              <label htmlFor='password'>PASSWORD*</label>
              <div className='password-input-wrapper'>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
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
            </div>

            <div className='details'>
              <label htmlFor='confirm-password'>CONFIRM PASSWORD*</label>
              <div className='password-input-wrapper'>
                <input
                  id='confirm-password'
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
                />
                <button
                  className='password-visibility-button'
                  type='button'
                  aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff aria-hidden='true' /> : <FiEye aria-hidden='true' />}
                </button>
              </div>
              {errors.confirmPassword && <p className='field-error'>{errors.confirmPassword}</p>}
            </div>

            <div className='second-details'>
              <button className='login' type='submit'>REGISTER</button>
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