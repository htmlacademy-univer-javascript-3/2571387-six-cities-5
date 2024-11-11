import { Link } from 'react-router-dom';
//import styles from './styles.module.css';

function Error404(): JSX.Element {
  return (
    <div>
      404 Not Found
      <div>
        <Link to="/" className="link_not_found">Go back to Home</Link>
      </div>
    </div>
  );
}

export default Error404;
