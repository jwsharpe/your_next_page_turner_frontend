import React, { ReactElement } from "react";
import { BookData } from "../typescript/types";

interface Props {
  book: BookData;
}

export default function Book(props: Props): ReactElement {
  const coverExists = !!props.book.img;

  return (
    <li className="book">
      <div className="img-container">
        {coverExists ? (
          <img alt="" src={props.book.img} />
        ) : (
          <div className="missing-book">missing :(</div>
        )}
      </div>
      <div className="title"> {props.book.titles}</div>
      <div className="author"> {props.book.authors}</div>
    </li>
  );
}
