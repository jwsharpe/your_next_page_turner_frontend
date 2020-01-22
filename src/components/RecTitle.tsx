import React, { ReactElement } from "react";
import "../css/RecTitle.scss";

interface Props {
  recTitle: string;
  clearRecs: any;
}

export default function RecTitle(props: Props): ReactElement {
  return (
    <div className="search">
      <div className="container rec-container">
        <div className="rec-title">Books like {props.recTitle}</div>
        <div className="clear-rec-button" onClick={props.clearRecs}>
          clear recs
        </div>
      </div>
    </div>
  );
}
