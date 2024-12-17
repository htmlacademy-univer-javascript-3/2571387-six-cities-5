import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { fetchOffersAction } from '../store/api-actions';

export function useInitApp() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOffersAction());
  }, []);
}

