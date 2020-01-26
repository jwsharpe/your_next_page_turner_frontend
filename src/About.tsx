import React, { ReactElement } from "react";
import Header from "./components/Header";
import "./css/About.scss";

interface Props {}

export default function About({}: Props): ReactElement {
  return (
    <>
      <Header />
      <div className="about">
        <h2>About</h2>
        <p>
          Your Next Page Turner is an application that allows you to find
          recommendations based on a selected book.
        </p>
        <p> This project was created by James Sharpe and Rebecca Rosen.</p>

        <p>
          Currently this app is in its infancy. The current number of books in
          the production database is 200, so finding books and getting book
          recommendations will be skewed. Our next goal is minimizing the
          recommendation system matrix to host more books.
        </p>
        <p>
          Rebecca did the data collection, data scraping and reccomendation
          system. Find more about the project backend{" "}
          <a href="https://github.com/rebecca-hh-rosen/your_next_page_turner_backend">
            here.
          </a>
        </p>
        <p>
          James did the frontend engineering and deployed it. Find more about
          the project's frontend{" "}
          <a href="https://github.com/jwsharpe/your_next_page_turner_frontend">
            here.
          </a>
        </p>
        <a href="https://github.com/jwsharpe">View James on Github</a>
        <a href="https://github.com/rebecca-hh-rosen">View Rebecca on Github</a>
        <p></p>
        <p>Thank you for visiting :)</p>
      </div>
    </>
  );
}
