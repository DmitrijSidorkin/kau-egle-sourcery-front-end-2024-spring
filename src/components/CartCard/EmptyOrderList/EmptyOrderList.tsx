import styles from './EmptyOrderList.module.scss';

function EmptyOrderList() {
  return (
    <figure className={styles['empty-cart']}>
      <img
        className={styles['empty-cart__icon']}
        src="/src/assets/icons/cart_placeholder_icon.png"
        alt="empty cart"
      />
      <figcaption className={styles['empty-cart__text']}>Your cart is empty</figcaption>
    </figure>
  );
}
export default EmptyOrderList;
