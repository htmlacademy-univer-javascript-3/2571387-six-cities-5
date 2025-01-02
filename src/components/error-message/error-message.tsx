import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectErrorOfferData, setOfferError } from '../../store/offerSlice';
import { selectErrorUserDate, setUserError } from '../../store/userSlice';
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
