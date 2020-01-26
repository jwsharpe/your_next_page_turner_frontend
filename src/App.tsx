import React, { useState, useEffect } from "react";
import "./css/App.scss";
import Header from "./components/Header";
import BookContainer from "./containers/BookContainer";
import { BookData } from "./typescript/types";
import ShowBook from "./components/ShowBook";

import { useDebounce } from "./helper/importedHooks";
import SearchBar from "./components/SearchBar";
import RecTitle from "./components/RecTitle";

const IP = "https://your-next-page-turner-backend.herokuapp.com";

const App: React.FC = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [recTitle, setRecTitle] = useState<string>("");
  const [showBook, setShowBook] = useState<number>(-1);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 200);

  useEffect(() => {
    if (!localStorage.getItem("first")) {
      console.log(localStorage.getItem("first"));
      alert(
        "Hi! This app is still in its infancy. There are only 200 books in the production database, so recommendations will be skewed and books you expect to be here will not be! Thanks. -James"
      );
      localStorage.setItem("first", "visited");
    }

    if (isAppLoading) {
      setIsAppLoading(false);
      _fetchFirstPage();
    }

    if (query.length >= 2) {
      _fetchSearchQuery(debouncedQuery);
    }

    if (query.length === 0) {
      _clearSearch();
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

    const res = await fetch(IP + "/books", content);
    const books = await res.json();

    setBooks([book, ...books]);
  };

  const _fetchSearchQuery = async (query: string) => {
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
    const res = await fetch(IP + "/query", content);
    const books = await res.json();
    setBooks(books);
  };

  const _clearRecs = () => {
    _fetchFirstPage();
  };

  const _clearSearch = () => {
    _fetchFirstPage();
  };

  const _fetchFirstPage = () => {
    setIsPageLoading(true);
    setBooks([]);
    setPageNumber(0);
    _fetchPage(0);
  };

  const _fetchNextPage = () => {
    setIsPageLoading(true);
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
    _fetchPage(nextPage);
  };

  const _fetchPage = async (page: number) => {
    const res = await fetch(IP + "/books/" + page);
    const newBooks = await res.json();
    setBooks([...books, ...newBooks]);
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
