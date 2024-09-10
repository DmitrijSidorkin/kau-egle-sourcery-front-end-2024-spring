import { useRef, useState } from 'react';
import { CheckCircle, ChevronRight } from '@/assets/icons';
import styles from './CheckoutButtonMobile.module.scss';

function CheckoutButtonMobile() {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isCartEmpty] = useState(false);
  const [, setCirclePosition] = useState(0);
  const [isCircleEnd, setIsCircleEnd] = useState(false);
  const [isReleased, setIsReleased] = useState(false);
  const [leftOpacity, setLeftOpacity] = useState(0);
  const [rightOpacity, setRigthOpacity] = useState(1);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);

  const handleMouseUp = () => {
    if (isCircleEnd) {
      setIsReleased(true);
    }
    setCirclePosition(0);
    setIsButtonPressed(false);
    setRigthOpacity(1);
  };

  const handleMouseLeave = () => {
    setIsCircleEnd(false);
    setIsButtonPressed(false);
    setCirclePosition(0);
    setRigthOpacity(1);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (circleRef.current) {
      const circleBounds = circleRef.current.getBoundingClientRect();
      if (
        event.clientX >= circleBounds.left &&
        event.clientX <= circleBounds.right &&
        event.clientY >= circleBounds.top &&
        event.clientY <= circleBounds.bottom
      ) {
        setIsButtonPressed(true);
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isButtonPressed) return;
    if (buttonRef.current !== null) {
      const newCirclePosition = event.clientX - buttonRef.current.getBoundingClientRect().left;
      if (newCirclePosition >= 0 && newCirclePosition <= buttonRef.current.offsetWidth - 55) {
        setCirclePosition(newCirclePosition);
        buttonRef.current.style.setProperty('--circle-position', `${newCirclePosition}px`);
        const maxDistance = buttonRef.current.offsetWidth - 55;
        const opacity = newCirclePosition / maxDistance;
        setRigthOpacity(1 - opacity);
        setLeftOpacity(opacity);
        buttonRef.current.style.setProperty('--left-opacity', leftOpacity.toString());
        buttonRef.current.style.setProperty('--right-opacity', rightOpacity.toString());
      }
      if (newCirclePosition >= buttonRef.current.offsetWidth - 55) {
        setIsCircleEnd(true);
      } else {
        setIsCircleEnd(false);
      }
    }
  };
  return (
    <button
      type="button"
      disabled={isCartEmpty}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      ref={buttonRef}
      aria-label="Slide to order"
      tabIndex={0}
      className={`${styles['slider-button']} ${isButtonPressed ? styles['slider-button__button-pressed'] : ''} ${isReleased ? styles['slider-button__circle-end'] : ''}`}>
      {isReleased ? (
        <span className={styles['slider-button__span-confirm']}>
          <p>Confirmed!</p>
          <div className={styles['slider-button__icon-container']}>
            <CheckCircle />
          </div>
        </span>
      ) : (
        <>
          <span className={styles['slider-button__span-release']}>
            <p>Release</p>
          </span>
          <span ref={circleRef} className={styles['slider-button__span-circle']}>
            <ChevronRight />
          </span>
          <span className={styles['slider-button__span-element']}>
            <p>Slide to order</p>
          </span>
        </>
      )}
    </button>
  );
}
export default CheckoutButtonMobile;
