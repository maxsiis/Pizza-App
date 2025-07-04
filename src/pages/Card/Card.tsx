import { useDispatch, useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import { AppDispatch, RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import { PREFIX } from '../../helpers/API';
import axios from 'axios';
import styles from './Card.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router';
import { CartActions } from '../../store/cart.slice';

const DELIVERY_FEE = 169;

export function Card() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const navigate = useNavigate();
  const total = items
    .map((i) => {
      const product = cartProducts.find((p) => p.id === i.id);
      if (!product) {
        return 0;
      }
      return i.count * product.price;
    })
    .reduce((acc, i) => (acc += i), 0);

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProducts(res);
  };

  const checkout = async () => {
    await axios.post(
      `${PREFIX}/order`,
      {
        products: items,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(CartActions.clear());
    navigate('/succses');
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <>
      <Headling className={styles['headling']}>Корзина</Headling>
      {items.map((i) => {
        const product = cartProducts.find((p) => p.id === i.id);
        if (!product) {
          return;
        }
        return <CartItem key={product.id} count={i.count} {...product} />;
      })}
      <div className={styles['line']}>
        <div className={styles['text']}>Сумма заказа</div>
        <div className={styles['price']}>
          {total}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles['hr']} />
      <div className={styles['line']}>
        <div className={styles['text']}>Доставка</div>
        <div className={styles['price']}>
          {DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles['hr']} />
      <div className={styles['line']}>
        <div className={styles['text']}>
          Итог <span className={styles['totalCount']}>({items.length})</span>
        </div>
        <div className={styles['price']}>
          {total + DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>
      <div className={styles['checkout']}>
        <Button appearence="big" onClick={checkout}>
          Оплатить
        </Button>
      </div>
    </>
  );
}
