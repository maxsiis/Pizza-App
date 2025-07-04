import styles from './CartItem.module.css';
import { CartItemProps } from './CartItem.props';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { CartActions } from '../../store/cart.slice';

function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const increase = () => {
    dispatch(CartActions.add(props.id));
  };

  const descrease = () => {
    dispatch(CartActions.remove(props.id));
  };

  const remove = () => {
    dispatch(CartActions.delete(props.id));
  };

  return (
    <div className={styles['item']}>
      <div
        className={styles['image']}
        style={{ backgroundImage: `url('${props.image}')` }}
      ></div>
      <div className={styles['description']}>
        <div className={styles['name']}>{props.name}</div>
        <div className={styles['price']}>{props.price}&nbsp;₽</div>
      </div>
      <div className={styles['actions']}>
        <button className={styles['minus']} onClick={descrease}>
          <img src="/minus-icon.svg" alt="Удалить из корзины" />
        </button>
        <div className={styles['number']}>{props.count}</div>
        <button className={styles['plus']} onClick={increase}>
          <img src="/plus-icon.svg" alt="Добавить в корзину" />
        </button>
        <button className={styles['remove']} onClick={remove}>
          <img src="/cross-icon.svg" alt="Удалить блюдо" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
