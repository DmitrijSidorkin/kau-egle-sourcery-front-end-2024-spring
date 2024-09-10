import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Auth.module.scss';
import { UserData, useAuth } from '@/context/AuthContext';
import { FormData } from '../types';
import PasswordReset from './PasswordReset/PasswordReset';
import Button from '@/components/button/Button';
import { ButtonSizes, ButtonVariants, IconPosition } from '@/components/button/Enum';
import { IconArrowForwardFilled } from '@/assets/icons';
import Textfield from '@/components/Inputs/Textfield/Textfield';
import PopupToast from '@/components/PopupToast/PopupToast';
import { Variant } from '@/components/PopupToast/Enums';

export function Login() {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordResetEmail, setPasswordResetEmail] = useState<string>('');
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
  const [isResetPopUpOpen, setIsResetPopUpOpen] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState('');
  const { setIsAuthenticated, setCurrentUserData } = useAuth();
  const toastMessage =
    'We sent you an email. Follow the instructions to get back into your account.';

  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrorMessage('');
  };

  const handleResetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPasswordResetEmail(value);
  };

  const existingUsers: UserData[] = JSON.parse(localStorage.getItem('userInfo') || '[]');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault();

    const loginData: FormData = {
      email: formData.email,
      password: formData.password,
    };

    if (formData.email && formData.password) {
      const foundUser = existingUsers.find((user) => user.email === loginData.email);

      if (foundUser && foundUser.password === loginData.password) {
        setIsAuthenticated(true);
        setCurrentUserData(foundUser);
        navigate('/food-menu');
      } else if (foundUser) {
        setErrorMessage('Invalid password.');
      } else if (!foundUser) {
        setErrorMessage('Email does not exist.');
      }
    } else {
      setErrorMessage('Please enter email and password.');
    }
  };

  const handleCloseModal = () => {
    setIsPasswordResetOpen(false);
    setPasswordResetError('');
  };

  const handleResetSubmit = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault();

    if (existingUsers.find((user) => user.email === passwordResetEmail)) {
      setIsPasswordResetOpen(false);
      setIsResetPopUpOpen(true);
      setPasswordResetError('');
    } else {
      setPasswordResetError('Email does not exist.');
    }
  };

  return (
    <>
      {isResetPopUpOpen && (
        <PopupToast
          handleStateChange={setIsResetPopUpOpen}
          message={toastMessage}
          variant={Variant.SUCCESS}
        />
      )}
      {isPasswordResetOpen && (
        <PasswordReset
          handleResetChange={handleResetChange}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleResetSubmit}
          passwordResetError={passwordResetError}
        />
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles['form-container']}>
          <div className={styles['form-container__titles']}>
            <h1 className={styles['form-container__form-title']}>Login</h1>
            <h2 className={styles['form-container__form-subtitle']}>
              Lunch won&#8217;t order itself
            </h2>
          </div>
          <div className={styles['form-container__input-container']}>
            <div className={styles['form-container__input-reminder-container']}>
              <div className={styles['form-container__input-inner-container']}>
                <div className={styles['form-container__input-wrapper']}>
                  <Textfield
                    labelText="Email"
                    ariaLabel="Your email"
                    name="email"
                    type="email"
                    placeholder="ernieburnie321@gmail.com"
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Textfield
                    labelText="Password"
                    ariaLabel="Your password"
                    name="password"
                    type="password"
                    placeholder={'\u2022'.repeat(21)}
                    autoComplete="off"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles['form-container__reminder-wrapper']}>
                <button
                  type="button"
                  className={styles['form-container__reminder']}
                  onClick={() => {
                    setIsPasswordResetOpen(true);
                  }}>
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>
          <div className={styles['register-error']}>{errorMessage}</div>
        </div>
        <Button
          variant={ButtonVariants.Primary}
          size={ButtonSizes.Large}
          icon={<IconArrowForwardFilled width="24" height="24" />}
          iconPosition={IconPosition.Right}
          type="submit">
          <div className={styles['button-text']}>Log In</div>
        </Button>
      </form>
    </>
  );
}
