import React, { ReactElement, useState } from "react";
import "../css/Book.scss";
import Book from "../components/Book";
import { BookData } from "../typescript/types";
import { useDebounce } from "../helper/importedHooks";
import SearchBar from "../components/SearchBar";
import RecTitle from "../components/RecTitle";

interface Props {
  books: BookData[];
  showBook: number;
  pageNumber: number;
  recTitle: string;
  setShowBook: any;
  isPageLoading: any;
  fetchNextPage: any;
  clearRecs: any;
}

export default function BookContainer(props: Props): ReactElement {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 250);

  const _handleScroll = (event: any) => {
    event.persist();
    const { scrollTop, scrollHeight } = event.target;
    if (
      scrollHeight - scrollTop < scrollHeight / 2 &&
      !props.isPageLoading &&
      props.pageNumber !== -1
    ) {
      props.fetchNextPage();
    }
  };

  const filterBooks = () => {
    const { books } = props;
    let filteredBooks = [...books];
    if (debouncedQuery.length) {
      filteredBooks = books.filter(book =>
        book.titles.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }

    return filteredBooks.map((book, index) => {
      return (
        <Book
          setShowBook={props.setShowBook}
          showBook={props.showBook}
          key={index}
          book={book}
        />
      );
    });
  };

  return (
    <div onScroll={_handleScroll} className="book-container">
      {props.pageNumber !== -1 ? (
        <SearchBar query={query} setQuery={setQuery} />
      ) : (
        <RecTitle recTitle={props.recTitle} clearRecs={props.clearRecs} />
      )}

      <ul>{filterBooks()}</ul>
    </div>
  );
}
