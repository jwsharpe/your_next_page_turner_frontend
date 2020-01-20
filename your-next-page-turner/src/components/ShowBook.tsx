import React, { ReactElement } from "react";
import "../css/Aside.scss";
import { BookData } from "../typescript/types";
interface Props {
  book: BookData;
}

export default function ShowBook(props: Props): ReactElement {
  const { titles, authors, description } = props.book;
  return (
    <aside>
      <div className="title">{titles}</div>
      <div className="border"></div>
      <div className="author">{authors}</div>
      <div className="description">{description}</div>

      <button className="rec-button">mor like dis pls</button>
    </aside>
  );
}
