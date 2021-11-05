import {Link} from 'react-router-dom';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {Actions} from '../../types/action';
import {resetPropertyScreen} from '../../store/action';
import {Dispatch} from '@reduxjs/toolkit';

const mapStateToProps = ({expendedOffer}: State) => ({
  expendedOffer,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  clickHandler() {
    dispatch(resetPropertyScreen());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Logo(props: PropsFromRedux): JSX.Element {
  const {expendedOffer, clickHandler} = props;
  return (
    <div className="header__left">
      <Link className="header__logo-link" to="/">
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"
          onClick={() => expendedOffer !== null ? clickHandler() : ''}
        />
      </Link>
    </div>
  );
}

export {Logo};
export default connector(Logo);
