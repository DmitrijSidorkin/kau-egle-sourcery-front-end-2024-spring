import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Auth.module.scss';
import { UserData, useAuth } from '@/context/AuthContext';
import { FormFields } from '../types';
import Button from '@/components/button/Button';
import { ButtonSizes, ButtonVariants } from '@/components/button/Enum';
import Textfield from '@/components/Inputs/Textfield/Textfield';
import RulesModal from './RulesModal/RulesModal';

export function Register() {
  const [isRulesRead, setIsRulesRead] = useState(false);
  const [formData, setFormData] = useState<FormFields>({
    email: '',
    username: '',
    password: '',
    repassword: '',
    rules: false,
  });

  const { setIsAuthenticated, setCurrentUserData } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [mouseOverRules, setMouseOverRules] = useState(false);
  const rulesError = 'You have to agree to our Community Rules before registering';

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrorMessage('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: UserData = {
      userName: formData.username,
      email: formData.email,
      password: formData.password,
      name: '',
      surname: '',
      balance: 0,
      img: '',
      orders: [
        {
          weekDay: '',
          mealIds: [],
        },
      ],
      orderHistory: [
        {
          date: '',
          mealsIds: [],
        },
      ],
    };

    const existingUsers: UserData[] = JSON.parse(localStorage.getItem('userInfo') || '[]');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?~_+\-=|\\]).{8,32}$/;

    if (!formData.rules) {
      setErrorMessage(rulesError);
    } else if (existingUsers.find((user) => user.userName === userData.userName)) {
      setErrorMessage('Username already exists!');
    } else if (!emailRegex.test(formData.email)) {
      setErrorMessage('Invalid email!');
    } else if (existingUsers.find((user) => user.email === userData.email)) {
      setErrorMessage('Email already exists!');
    } else if (!formData.username.trim() || formData.username.trim().length < 6) {
      setErrorMessage('Username must be at least 6 characters long.');
    } else if (formData.password !== formData.repassword) {
      setErrorMessage('Passwords do not match!');
    } else if (!passwordRegex.test(formData.password)) {
      setErrorMessage(
        'Password must contain at least one digit, special character, lower case and upper-case letter and be 8-32 characters long.'
      );
    } else {
      existingUsers.push(userData);
      localStorage.setItem('userInfo', JSON.stringify(existingUsers));
      setIsAuthenticated(true);
      setCurrentUserData(userData);
      navigate('/food-menu');
      setErrorMessage('');
    }
  };

  function rulesFocus() {
    if (!isRulesRead && errorMessage !== rulesError) {
      setMouseOverRules(true);
    }
  }
  function rulesBlur() {
    if (!isRulesRead && errorMessage !== rulesError) {
      setMouseOverRules(false);
    }
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, rules: e.target.checked });
  }

  return (
    <>
      {isRulesOpen && <RulesModal handleRulesModalState={setIsRulesOpen} />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles['form-container']}>
          <div className={styles['form-container__titles']}>
            <h1 className={styles['form-container__form-title']}>Register</h1>
            <h2 className={styles['form-container__form-subtitle']}>
              Join our office foodies today!
            </h2>
          </div>
          <div className={styles['form-container__input-container']}>
            <div className={styles['form-container__input-inner-container']}>
              <div className={styles['form-container__input-wrapper']}>
                <Textfield
                  labelText="Your email"
                  ariaLabel="Your email"
                  name="email"
                  type="email"
                  placeholder="ernieburnie321@gmail.com"
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Textfield
                  labelText="Create user name"
                  ariaLabel="Create user name"
                  name="username"
                  type="text"
                  placeholder="spydermanX12"
                  autoComplete="off"
                  value={formData.username}
                  onChange={handleChange}
                />
                <Textfield
                  labelText="Create password"
                  ariaLabel="Create password"
                  name="password"
                  type="password"
                  placeholder={'\u2022'.repeat(21)}
                  value={formData.password}
                  onChange={handleChange}
                />
                <Textfield
                  labelText="Repeat password"
                  ariaLabel="Repeat password"
                  name="repassword"
                  type="password"
                  placeholder={'\u2022'.repeat(21)}
                  value={formData.repassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <label
              className={styles['form-container__rules']}
              htmlFor="rules"
              onMouseOver={() => rulesFocus()}
              onMouseLeave={() => rulesBlur()}
              onFocus={() => rulesFocus()}
              onBlur={() => rulesBlur()}>
              <input
                id="rules"
                className={styles['form-container__rules-checkbox']}
                aria-label="Checkbox to mark that you have read the community rules"
                type="checkbox"
                name="rules"
                checked={formData.rules}
                onChange={(event) => handleCheckboxChange(event)}
                required
                disabled={!isRulesRead}
              />
              I have read the
              <button
                type="button"
                className={styles['form-container__rules-link']}
                onClick={() => {
                  setIsRulesOpen(true);
                  setIsRulesRead(true);
                  rulesBlur();
                }}>
                Community Rules
              </button>
              {mouseOverRules && (
                <p className={styles['form-container__hover-message']}>
                  You should read the rules before agreeing to them.
                </p>
              )}
            </label>
          </div>
          <div className={styles['register-error']}>{errorMessage}</div>
        </div>
        <Button variant={ButtonVariants.Primary} size={ButtonSizes.Large} type="submit">
          <div className={styles['button-text']}>Create Account</div>
        </Button>
      </form>
    </>
  );
}
