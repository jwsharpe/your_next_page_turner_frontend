import React, { ReactElement } from "react";
import "../css/Book.scss";
import Book from "../components/Book";
import { BookData } from "../typescript/types";

interface Props {
  books: BookData[];
  showBook: number;
  setShowBook: any;
}

export default function BookContainer(props: Props): ReactElement {
  const renderBooks = () => {
    const { books } = props;

    return books.map((book, index) => {
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

  return <ul className="book-container">{renderBooks()}</ul>;
}
