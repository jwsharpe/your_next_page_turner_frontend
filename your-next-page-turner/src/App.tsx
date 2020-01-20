import React, { useState, useEffect } from "react";
import "./css/App.scss";
import Header from "./components/Header";
import BookContainer from "./containers/BookContainer";
import { BookData } from "./typescript/types";
import ShowBook from "./components/ShowBook";

const App: React.FC = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [showBook, setShowBook] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    _fetchBooks();
  }, [books.length]);

  const _fetchBooks = async () => {
    const res = await fetch("http://localhost:5000/books");
    const books = await res.json();
    console.log(books);
    setBooks(books);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <Header />

      <div className="content-grid">
        {isLoading ? <div>loading</div> : <ShowBook book={books[showBook]} />}
        <BookContainer books={books} />
      </div>
    </div>
  );
};

export default App;
