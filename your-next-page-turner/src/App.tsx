import React from "react";
import "./css/App.scss";
import Header from "./components/Header";
import BookContainer from "./containers/BookContainer";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div className="search">search bar</div>
      <div className="content-grid">
        <aside>content bar</aside>
        <BookContainer />
      </div>
    </div>
  );
};

export default App;
