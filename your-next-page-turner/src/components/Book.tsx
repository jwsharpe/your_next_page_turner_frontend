import React, { ReactElement } from "react";
import { BookData } from "../typescript/types";

interface Props {
  index: number;
  book: BookData;
}

export default function Book(props: Props): ReactElement {
  return <li key={props.index}>{props.book.titles}</li>;
}
