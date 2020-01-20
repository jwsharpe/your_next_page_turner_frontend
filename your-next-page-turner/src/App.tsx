import React, { useState, useEffect } from "react";
import "./css/App.scss";
import Header from "./components/Header";
import BookContainer from "./containers/BookContainer";

const App: React.FC = () => {
  const [books, setBooks] = useState<{ titles: String }[]>([]);

  useEffect(() => {
    _fetchBooks();
  }, [0]);

  const _fetchBooks = async () => {
    const res = await fetch("http://localhost:5000/books");
    const books = await res.json();
    console.log(books);
    setBooks(books);
  };

  return (
    <div className="App">
      <Header />
      <div className="search">search bar</div>
      <div className="content-grid">
        <aside>content bar</aside>
        <BookContainer books={books} />
      </div>
    </div>
  );
};

export default App;
