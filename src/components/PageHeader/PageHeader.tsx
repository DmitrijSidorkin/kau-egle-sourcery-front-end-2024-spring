import styles from './PageHeader.module.scss';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className={styles['page-header']}>
      <h1 className={styles['page-header__title']}>{title}</h1>
      <h2 className={styles['page-header__subtitle']}>{subtitle}</h2>
    </header>
  );
}
