import React, { useState, useEffect } from "react";
import "./css/App.scss";
import Header from "./components/Header";
import BookContainer from "./containers/BookContainer";
import { BookData } from "./typescript/types";
import ShowBook from "./components/ShowBook";

const App: React.FC = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [recTitle, setRecTitle] = useState<string>("");
  const [showBook, setShowBook] = useState<number>(-1);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  useEffect(() => {
    _fetchPage(pageNumber);
  }, []);

  const _fetchRecsByTitle = async (book: BookData) => {
    setPageNumber(-1);
    setRecTitle(book.titles);

    const mainBody = {
      text: book.titles
    };
    const content = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(mainBody)
    };

    const res = await fetch("http://localhost:5000/books", content);
    const books = await res.json();

    setBooks([book, ...books]);
  };

  const _clearRecs = async () => {
    setBooks([]);
    setShowBook(0);
    setPageNumber(0);
    const res = await fetch("http://localhost:5000/books/0");
    const newBooks = await res.json();
    setBooks(newBooks);
    setPageNumber(pageNumber + 1);

    if (setIsPageLoading) setTimeout(() => setIsPageLoading(false), 500);
    if (isAppLoading) setIsAppLoading(false);
  };

  const _fetchNextPage = () => {
    setIsPageLoading(true);
    _fetchPage(pageNumber);
  };

  const _fetchPage = async (page: number) => {
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
          <ShowBook
            fetchRecsByTitle={_fetchRecsByTitle}
            book={books[findShowBookIndex(showBook)]}
          />
        )}
        <BookContainer
          books={books}
          recTitle={recTitle}
          showBook={showBook}
          setShowBook={setShowBook}
          clearRecs={_clearRecs}
          pageNumber={pageNumber}
          isPageLoading={isPageLoading}
          fetchNextPage={_fetchNextPage}
        />
      </div>
    </div>
  );
};

export default App;
