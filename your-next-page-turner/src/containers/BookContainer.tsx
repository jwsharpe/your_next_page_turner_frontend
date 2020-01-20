import React, { ReactElement, useState } from "react";
import "../css/Book.scss";
import Book from "../components/Book";
import { BookData } from "../typescript/types";
import SearchBar from "../components/SearchBar";
interface Props {
  books: BookData[];
}

export default function BookContainer(props: Props): ReactElement {
  const [query, setQuery] = useState<string>("");

  const filterBooks = () => {
    const { books } = props;
    let filteredBooks = [...books];
    if (query.length) {
      filteredBooks = books.filter(book =>
        ("" + book.titles).toLowerCase().includes(query.toLowerCase())
      );
    }

    return filteredBooks.map((book, index) => {
      return <Book key={index} book={book} />;
    });
  };

  return (
    <div className="book-container">
      <SearchBar query={query} setQuery={setQuery} />
      <ul>{filterBooks()}</ul>
    </div>
  );
}
