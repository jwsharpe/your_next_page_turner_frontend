import React from "react";
import "../css/Header.scss";

const Header: React.FC = () => {
  return (
    <header>
      <div>
        <h3>Your Next Page Turner</h3>
      </div>
      <div className="header-actions">
        <a href="/about">about</a>
        <a href="/">home</a>
      </div>
    </header>
  );
};

export default Header;
