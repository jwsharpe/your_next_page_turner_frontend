import React, { ReactElement } from "react";
import { TextField } from "@material-ui/core";

interface Props {
  query: string;
  setQuery: any;
}

export default function SearchBar(props: Props): ReactElement {
  const _changeHandler = (e: any) => props.setQuery(e.target.value);
  return (
    <div className="search">
      <div className="container">
        <TextField
          id="outlined-basic"
          label="Search your favorites!"
          variant="outlined"
          value={props.query}
          onChange={_changeHandler}
          fullWidth
        />
      </div>
    </div>
  );
}
