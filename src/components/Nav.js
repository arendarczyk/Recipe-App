import React from "react";
import "../styles/Nav.scss";
import { ReactComponent as SearchSvg } from "../icons/magnifier.svg";

const Nav = () => {
    const blurBackground = () => {
        const main = document.querySelector(".main-wrapper");
        main.classList.add("blurBackground");
    };

    return (
        <nav>
            <div className="topShadow"></div>
            <div className="navWrapper">
                <div className="text"></div>
                <div className="text centerNavText">Food</div>
                <div className="text">
                    <span className="searchBtn" onClick={blurBackground}>
                        Search <SearchSvg className="searchIcon" />
                    </span>
                </div>
            </div>
            <div className="searchBigScreen">
                <input />
            </div>
        </nav>
    );
};

export default Nav;
