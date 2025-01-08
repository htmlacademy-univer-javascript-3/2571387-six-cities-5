import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOfferError } from '../../store/offer-slice/offerSlice';
import { selectErrorOfferData } from '../../store/offer-slice/selectors';
import { setUserError } from '../../store/user-slice/userSlice';
import { selectErrorUserDate } from '../../store/user-slice/selectors';
import { TIMEOUT_SHOW_ERROR } from '../../types/constant';
import './error-message.css';

function ErrorMessage(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const errorUser = useAppSelector(selectErrorUserDate);
  const errorOffer = useAppSelector(selectErrorOfferData);
  if (errorUser) {
    setTimeout(() => {
      dispatch(setUserError(null));
    }, TIMEOUT_SHOW_ERROR);
  }
  if (errorOffer) {
    setTimeout(() => {
      dispatch(setOfferError(null));
    }, TIMEOUT_SHOW_ERROR);
  }
  return (errorUser || errorOffer)
    ? <div className='error-message'>{errorUser || errorOffer}</div>
    : null;
}

export default ErrorMessage;
