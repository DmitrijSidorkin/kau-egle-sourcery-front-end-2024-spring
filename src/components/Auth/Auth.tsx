import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserData as APIData } from './types';
import { LunchAppLogo } from '@/assets/icons';
import { Login } from './Login/Login';
import { Register } from './Register/Register';
import PageFooter from '../PageFooter/PageFooter';
import styles from './Auth.module.scss';

export function Auth() {
  const [activeTab, setActiveTab] = useState('login');
  const [, setUserData] = useState<APIData[]>([{}]);

  useEffect(() => {
    const fetchData = async () => {
      const existingData = localStorage.getItem('userInfo');

      if (!existingData) {
        const response = await fetch('http://localhost:3002/user');
        const data = await response.json();

        const modifiedData = {
          ...data,
          email: 'yomomma@gmail.com',
        };

        const usersArray = [modifiedData];
        setUserData(usersArray);
        localStorage.setItem('userInfo', JSON.stringify(usersArray));
      } else {
        setUserData(JSON.parse(existingData));
      }
    };

    fetchData();
  }, []);

  const handleTabSwitch = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className={styles['auth-wrapper']}>
        <div className={styles['auth-wrapper__additional-wrapper']}>
          <div className={styles['auth-wrapper__background-image']} />
          <div className={styles['auth-wrapper__img-container']}>
            <img
              className={styles['auth-wrapper__img']}
              src="/src/assets/images/AuthImg.png"
              alt="man and woman standing holding forks thinking about food"
            />
          </div>
          <div className={styles['auth-container']}>
            <div className={styles.auth}>
              <div className={styles.auth__container}>
                <div className={styles['auth__icon-box']}>
                  <LunchAppLogo width="104" height="51" />
                </div>
                <div className={styles['auth__tabs-wrapper']}>
                  <div className={styles.auth__tabs}>
                    <button
                      type="button"
                      onClick={() => handleTabSwitch('login')}
                      className={classNames(styles.auth__login, {
                        [styles['auth__login--active']]: activeTab === 'login',
                      })}>
                      LOGIN
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTabSwitch('register')}
                      className={classNames(styles.auth__register, {
                        [styles['auth__register--active']]: activeTab === 'register',
                      })}>
                      REGISTER
                    </button>
                  </div>
                </div>
                {activeTab === 'login' ? <Login /> : <Register />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter />
    </>
  );
}
