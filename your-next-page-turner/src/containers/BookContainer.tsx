import React, { ReactElement, useState } from "react";
import "../css/Book.scss";
import Book from "../components/Book";
import { BookData } from "../typescript/types";
import { useDebounce } from "../helper/importedHooks";
import SearchBar from "../components/SearchBar";

interface Props {
  books: BookData[];
  showBook: number;
  setShowBook: any;
}

export default function BookContainer(props: Props): ReactElement {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 250);

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
    <div className="book-container">
      <SearchBar query={query} setQuery={setQuery} />
      <ul>{filterBooks()}</ul>
    </div>
  );
}
