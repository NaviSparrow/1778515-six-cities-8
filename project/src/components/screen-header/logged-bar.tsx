import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {getEmail} from '../../services/email';

function LoggedBar():JSX.Element {
  // eslint-disable-next-line no-console
  console.log(getEmail());
  return (
    <>
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{getEmail()}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" href="#">
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </>
  );
}

export default LoggedBar;
