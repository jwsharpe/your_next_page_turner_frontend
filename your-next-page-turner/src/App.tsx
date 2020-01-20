import React, { useState, useEffect } from "react";
import "./css/App.scss";
import Header from "./components/Header";
import BookContainer from "./containers/BookContainer";
import SearchBar from "./components/SearchBar";
import { BookData } from "./typescript/types";

const App: React.FC = () => {
  const [books, setBooks] = useState<BookData[]>([]);

  useEffect(() => {
    _fetchBooks();
  }, [0]);

  const _fetchBooks = async () => {
    const res = await fetch("http://localhost:5000/books");
    const books = await res.json();
    var i;
    for (i = 0; i < books.length; i++) {
      if (books[i].titles.length > 120) {
        books[i].titles.replace(/\(([^)]\))/, "");
      }
    }
    console.log(books);
    setBooks(books);
  };

  return (
    <div className="App">
      <Header />

      <div className="content-grid">
        <aside>content bar</aside>
        <BookContainer books={books} />
      </div>
    </div>
  );
};

export default App;
