import styles from './PageFooter.module.scss';

export default function PageFooter() {
  return (
    <footer className={styles['page-footer']}>
      <p>Sourcery Academy</p>
      <p>Lunch App</p>
      <p>&copy; 2024 Cognizant</p>
    </footer>
  );
}
