import React, { ReactElement } from "react";

interface Props {
  books: { titles: String }[];
}

export default function BookContainer(props: Props): ReactElement {
  const renderBooks = () => {
    return props.books.map((book, index) => {
      const { titles } = book;
      return <li key={index}>{titles}</li>;
    });
  };
  return <ul>{renderBooks()}</ul>;
}
