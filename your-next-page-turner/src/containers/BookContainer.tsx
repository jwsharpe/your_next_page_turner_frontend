import React, { ReactElement } from "react";
import "../css/Book.scss";
import Book from "../components/Book";
import { BookData } from "../typescript/types";

interface Props {
  books: BookData[];
}

export default function BookContainer(props: Props): ReactElement {
  const renderBooks = () => {
    return props.books.map((book, index) => {
      return <Book index={index} book={book} />;
    });
  };
  return <ul>{renderBooks()}</ul>;
}
