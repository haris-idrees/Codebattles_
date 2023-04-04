import React from "react";
import "../components/Navbar.css";
import { GiBiceps } from "react-icons/gi";

export default class Navbar extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <nav>
          <h2 className="logo">
            Code <span>Battles </span>
            <GiBiceps/>
          </h2>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
          </ul>
          <button type="button">Login/Signup</button>
        </nav>
      </>
    );
  }
}
