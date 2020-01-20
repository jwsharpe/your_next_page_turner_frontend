import React, { ReactElement } from "react";
import { BookData } from "../typescript/types";

interface Props {
  book: BookData;
}

export default function Book(props: Props): ReactElement {
  const { img, authors } = props.book;
  let titles = props.book.titles;
  const coverExists = !!img;
  if (titles.length > 70) {
    titles = titles.slice(0, 70);
    titles += "...";
  }
  return (
    <li className="book">
      <div className="img-container">
        {coverExists ? (
          <img alt="" src={img} />
        ) : (
          <div className="missing-book">missing :(</div>
        )}
      </div>
      <div className="title"> {titles}</div>
      <div className="author"> {authors}</div>
    </li>
  );
}
