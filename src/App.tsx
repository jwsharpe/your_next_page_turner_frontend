import React, { useState, useEffect } from "react";
import "./css/App.scss";
import Header from "./components/Header";
import BookContainer from "./containers/BookContainer";
import { BookData } from "./typescript/types";
import ShowBook from "./components/ShowBook";

import { useDebounce } from "./helper/importedHooks";
import SearchBar from "./components/SearchBar";
import RecTitle from "./components/RecTitle";

const App: React.FC = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [recTitle, setRecTitle] = useState<string>("");
  const [showBook, setShowBook] = useState<number>(-1);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    if (isAppLoading || debouncedQuery.length === 0) {
      setIsAppLoading(false);
      _fetchPage(0);
    }
    if (query.length) {
      _fetchSearchQuery(debouncedQuery);
    }
  }, [debouncedQuery.length]);

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

  const _fetchSearchQuery = async (query: string) => {
    // console.log(query);
    const mainBody = {
      query: query
    };
    const content = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(mainBody)
    };
    const res = await fetch("http://localhost:5000/query", content);
    const books = await res.json();
    setBooks(books);
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
  };

  const _handleScroll = (event: any) => {
    event.persist();
    const { scrollTop, scrollHeight } = event.target;
    if (
      scrollHeight - scrollTop < scrollHeight / 2 &&
      !isPageLoading &&
      pageNumber !== -1 &&
      !query.length
    ) {
      _fetchNextPage();
    }
  };

  const findShowBookIndex = (id: number) => {
    return books.findIndex(book => book.id === id);
  };

  return (
    <div className="App">
      <Header />

      <div className="content-grid">
        <ShowBook
          fetchRecsByTitle={_fetchRecsByTitle}
          book={books[findShowBookIndex(showBook)]}
        />

        <div onScroll={_handleScroll} className="content-container">
          {pageNumber !== -1 ? (
            <SearchBar query={query} setQuery={setQuery} />
          ) : (
            <RecTitle recTitle={recTitle} clearRecs={_clearRecs} />
          )}

          <BookContainer
            books={books}
            showBook={showBook}
            setShowBook={setShowBook}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
