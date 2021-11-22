import Logo from '../logo/logo';
import AuthorizationBar from './authorization-bar';
import React from 'react';

function Header():JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <AuthorizationBar />
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
