import { useEffect, useState } from 'react';
import AppRouter from './routes/AppRouter';
import SplashScreen from './components/SplashScreen/SplashScreen';
import styles from './App.module.scss';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Set the desired loading time (in milliseconds)
    return () => clearTimeout(timer);
  }, []);
  return <div className={styles.App}>{isLoading ? <SplashScreen /> : <AppRouter />}</div>;
}

export default App;
