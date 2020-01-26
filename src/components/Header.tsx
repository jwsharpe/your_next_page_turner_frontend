import React from "react";
import "../css/Header.scss";

const Header: React.FC = () => {
  return (
    <header>
      <div>
        <h3>Your Next Page Turner</h3>
      </div>
      <div className="header-actions">
        <a href="/your-next-page-turner/about">about</a>
        <a href="/your-next-page-turner/">home</a>
      </div>
    </header>
  );
};

export default Header;
