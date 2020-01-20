import React, { ReactElement } from "react";
import "../css/Aside.scss";
import { BookData } from "../typescript/types";
interface Props {
  book: BookData;
}

export default function ShowBook(props: Props): ReactElement {
  return (
    <div>
      {props.book ? (
        <aside>
          <div className="top">
            <div className="title">{props.book.titles}</div>
            <div className="border"></div>
            <div className="author">{props.book.authors}</div>
            <div className="description">{props.book.description}</div>
          </div>

          <button className="rec-button">mor like dis pls</button>
        </aside>
      ) : (
        <aside>
          <div className="top">
            <div className="title">Please Select a Book!</div>
          </div>
        </aside>
      )}
    </div>
  );
}
