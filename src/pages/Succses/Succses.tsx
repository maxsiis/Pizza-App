import { useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import styles from './Succses.module.css';

export function Succses() {
  const navigate = useNavigate();
  return (
    <div className={styles['success']}>
      <img
        className={styles['pizza']}
        src="/pizza.webp"
        alt="Изображение пиццы"
      />
      <div className={styles['text']}>Ваш заказ упешно оформлен</div>
      <Button appearence="big" onClick={() => navigate('/')}>
        Вернуться в меню
      </Button>
    </div>
  );
}
