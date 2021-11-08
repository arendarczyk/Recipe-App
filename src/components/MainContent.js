import React, { useState, useRef, useEffect } from "react";
import "../styles/MainContent.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Hamburger } from "../icons/hamburger.svg";
import gsap from "gsap";
import {ReactComponent as Magnifier} from "../icons/magnifier.svg"

const PreviewContent = () => {
    const [query, setQuery] = useState("");
    const wrapper = useRef(null);
    const search = useRef(null);
    const text = useRef(null);

    useEffect(() => {
        const [...elementSearch] = search.current.children
        const [...textElements] = text.current.children

        const mainWrapper = document.querySelector(".main");
        const [elements] = wrapper.current.children;

        const burger = document.getElementById("burger")

        const floor = elements.getElementById("floor");
        const human = elements.getElementById("human");
        const plant = elements.getElementById("plant");
        const bg1 = elements.getElementById("bg-1");
        const bg2 = elements.getElementById("bg-2");
        const bg3 = elements.getElementById("bg-3");
        const bg4 = elements.getElementById("bg-4");
        const bg5 = elements.getElementById("bg-5");
        const bg6 = elements.getElementById("bg-6");
        const bg7 = elements.getElementById("bg-7");

        gsap.set([floor, human, plant, bg1, bg2, bg3, bg4, bg5, bg6, bg7, elementSearch], {
            autoAlpha: 0,
        });

        const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

        tl.to(floor, { duration: 1, autoAlpha: 1 })
            // .fromTo(
            //     bg1,
            //     { x: "-=300" },
            //     { duration: 0.5, x: "+=300", autoAlpha: 1 }
            // )
            // .fromTo(
            //     [bg2, bg3, bg4, bg5, bg6, bg7],
            //     { y: "-=300" },
            //     { y: "+=300", autoAlpha: 1, stagger: 0.25 }
            // )
            // .fromTo(human, { x: "+=200" }, { x: "-=200", autoAlpha: 1 })
            // .to(plant, { autoAlpha: 1 })
            // .to([bg1, bg2, bg3, bg4, bg5, bg6, bg7], {transfrom: 'scale(0.1)'})
            // .to(burger, {autoAlpha: 0})
            .fromTo(elementSearch,{y:'-=100', autoAlpha:0} , {y:'+=100' ,autoAlpha:1})
            .fromTo(textElements, {y:'-=100', autoAlpha:0} , {y:'+=100' ,autoAlpha:1})
        //.to(mainWrapper, {filter: 'blur(5px)'});
    }, []);

    return (
        <div className="main-wrapper">
            {/* <Nav /> */}
            {/* <div className="main2">
                <div className='main2-wrapper'>
                    <input/>
                </div>
            </div> */}
            <div className="main">
                <h1 className="main__header">Magic Recipes</h1>
                <div ref={wrapper} className="svg-wrapper">
                    <Hamburger />
                </div>
                {/* <p className="main__description main__description--change-width">
                    Lorem Ipsum jest tekstem stosowanym jako przykładowy
                    wypełniacz w przemyśle poligraficznym. Został po raz
                    pierwszy użyty w XV w. przez nieznanego drukarza do
                    wypełnienia tekstem próbnej książki. Pięć wieków później
                    zaczął być używany przemyśle elektronicznym, pozostając
                    praktycznie niezmienionym.{" "}
                </p> */}
                <div ref={text} className='text-wrapper'>
                    <p className="main__description main__description--change-width">
                        Type below your favourite ingredient c:
                    </p>
                </div>
                <form ref={search} action={`/Recipe-App/showRecipe/${query}`} className="formWrapper">
                    <input
                        className="formWrapper__input"                                          
                        placeholder="e.g. egg :)"
                        onChange={(e) => {                     
                            setQuery(e.target.value);                       
                        }}
                        type="text"
                        value={query}
                    />
                    <Link
                        className="btn"
                        to={`/Recipe-App/showRecipe/${query}`}
                    >
                        <Magnifier />
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default PreviewContent;
