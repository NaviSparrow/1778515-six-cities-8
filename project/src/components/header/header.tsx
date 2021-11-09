import Logo from '../logo/logo';
import AuthorizationBar from './authorization-bar';
import React from 'react';

function Header():JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <nav className="header__nav">
            <ul className="header__nav-list">
              <AuthorizationBar />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
