import React, { useState, useEffect } from "react";
import "./css/App.scss";
import Header from "./components/Header";
import BookContainer from "./containers/BookContainer";
import { BookData } from "./typescript/types";
import ShowBook from "./components/ShowBook";

const App: React.FC = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [showBook, setShowBook] = useState<number>(-1);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  useEffect(() => {
    _fetchPage(pageNumber);
  }, []);

  const _fetchNextPage = () => {
    setIsPageLoading(true);
    _fetchPage(pageNumber);
  };

  const _fetchPage = async (page: number) => {
    console.log("fetching, ", page);
    const res = await fetch("http://localhost:5000/books/" + page);
    const newBooks = await res.json();
    setBooks([...books, ...newBooks]);
    setPageNumber(pageNumber + 1);

    if (setIsPageLoading) setTimeout(() => setIsPageLoading(false), 500);
    if (isAppLoading) setIsAppLoading(false);
  };

  const findShowBookIndex = (id: number) => {
    return books.findIndex(book => book.id === id);
  };

  return (
    <div className="App">
      <Header />

      <div className="content-grid">
        {isAppLoading ? (
          <div>loading</div>
        ) : (
          <ShowBook book={books[findShowBookIndex(showBook)]} />
        )}
        <BookContainer
          books={books}
          showBook={showBook}
          setShowBook={setShowBook}
          isPageLoading={isPageLoading}
          fetchNextPage={_fetchNextPage}
        />
      </div>
    </div>
  );
};

export default App;
