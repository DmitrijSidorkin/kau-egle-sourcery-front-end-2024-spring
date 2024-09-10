import { ChangeEvent } from 'react';
import Button from '@/components/button/Button';
import IconButton from '@/components/IconButton/IconButton';
import { ButtonSizes, ButtonVariants } from '@/components/button/Enum';
import Textfield from '@/components/Inputs/Textfield/Textfield';
import styles from './PasswordReset.module.scss';

interface RulesModalProps {
  handleResetChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCloseModal: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  passwordResetError: string;
}

function PasswordReset({
  handleResetChange,
  handleCloseModal,
  handleSubmit,
  passwordResetError,
}: RulesModalProps) {
  return (
    <div className={styles['window-container']}>
      <form className={styles['reset-password']} onSubmit={handleSubmit}>
        <div className={styles['reset-password__header']}>
          <h3 className={styles['reset-password__header-text']}>Community Rules</h3>
          <IconButton onClick={() => handleCloseModal()} aria-label="close" />
        </div>
        <div className={styles['reset-password__instructions']}>
          <p className={styles['reset-password__instructions-text']}>
            Enter your email address, and we&apos;ll send you a link to get back into your account.
          </p>
          <Textfield
            name="password-reset"
            placeholder="Enter your email address"
            labelText="Email address"
            type="email"
            ariaLabel="password reset"
            onChange={handleResetChange}
          />
        </div>
        <p className={styles['reset-password__error']}>{passwordResetError}</p>
        <div className={styles['reset-password__button-container']}>
          <Button
            variant={ButtonVariants.Secondary}
            size={ButtonSizes.Medium}
            onClick={() => handleCloseModal()}
            aria-label="Return to log in">
            Return to log in
          </Button>
          <Button
            size={ButtonSizes.Medium}
            type="submit"
            onClick={() => handleSubmit}
            aria-label="Send recovery link">
            Send recovery link
          </Button>
        </div>
      </form>
    </div>
  );
}
export default PasswordReset;
