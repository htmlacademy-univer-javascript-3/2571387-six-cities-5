import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { checkAuthorizationStatus, fetchOffersAction } from '../store/api-actions';

export function useInitApp() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuthorizationStatus());
    dispatch(fetchOffersAction());
  }, [dispatch]);
}
