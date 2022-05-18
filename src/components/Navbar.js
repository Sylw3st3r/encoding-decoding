import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

export default function Navbar() {
    return (
        <header>
            <h1 className={classes.logo}>Cypher</h1>
            <input
                type="checkbox"
                id="nav-toggle"
                className={classes["nav-toggle"]}
            />
            <nav className={classes.navbar}>
                <ul>
                    <li>
                        <NavLink to="atbash">Atbash</NavLink>
                    </li>
                    <li>
                        <NavLink to="vigenere">Vigenere</NavLink>
                    </li>
                    <li>
                        <NavLink to="foursquare">Four Square</NavLink>
                    </li>
                </ul>
            </nav>
            <div className={classes["nav-hamburger-container"]}>
                <label
                    htmlFor="nav-toggle"
                    className={classes["nav-toggle-lable"]}
                >
                    <span></span>
                </label>
            </div>
        </header>
    );
}
