import React, { ReactElement } from "react";
import { BookData } from "../typescript/types";

interface Props {
  book: BookData;
}

export default function Book(props: Props): ReactElement {
  return (
    <li className="book">
      <div className="img-container">
        <img alt="" src={props.book.img} />
      </div>
      <div className="title"> {props.book.titles}</div>
      <div className="author"> {props.book.authors}</div>
    </li>
  );
}
