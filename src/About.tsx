import React, { ReactElement } from "react";
import Header from "./components/Header";
import "./css/About.scss";

interface Props {}

export default function About({}: Props): ReactElement {
  return (
    <>
      <Header />
      <div className="about">
        <p>hi dis is a projct about books!</p>
        <a href="https://github.com/jwsharpe">
          i made the clicky buttons and the website
        </a>
        <a href="https://github.com/rebecca-hh-rosen">
          rebecca got the books and made the COOL rec system
        </a>
        <img
          className="about-animate"
          src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.agentinengagement.com%2Fwp-content%2Fuploads%2F2013%2F12%2FID-100169696-Books.jpg&f=1&nofb=1"
        />
      </div>
    </>
  );
}
