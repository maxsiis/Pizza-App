import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';

export function Product() {
  const data = useLoaderData() as { data: Product };

  return (
    <>
      <Suspense fallback={'Загружаем...'}>
        <Await resolve={data.data}>
          {({ data }: { data: Product }) => <> Product - {data.name}</>}
        </Await>
      </Suspense>
    </>
  );
}
