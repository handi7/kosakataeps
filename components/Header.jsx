import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "reactstrap";
import classes from "../styles/header.module.css";
import { getAntonim, getKamus, getSinonim } from "../store/actions/wordAction";

export default function Header() {
  const headerRef = useRef(null);
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState({ word: "", type: "kamus" });

  const headerFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add(`${classes.header__shrink}`);
    } else {
      headerRef.current.classList.remove(`${classes.header__shrink}`);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  useEffect(() => {
    switch (searchData?.type) {
      case "kamus":
        getKamus(dispatch, searchData?.word);
        break;

      case "antonim":
        getAntonim(dispatch, searchData?.word);
        break;

      case "sinonim":
        getSinonim(dispatch, searchData?.word);
        break;

      default:
        break;
    }
  }, [searchData]);

  useEffect(() => {
    window.addEventListener("scroll", headerFunc);
    return () => window.removeEventListener("scroll", headerFunc);
  }, []);

  return (
    <header className={`${classes.header}`} ref={headerRef}>
      <Container className={classes.container}>
        <div className={`${classes.nav__wrapper}`}>
          {/* ======== navigation logo ======== */}
          <div className={`${classes.logo}`}>
            <Link href="/">
              <h1>STB2015</h1>
            </Link>
          </div>

          <div className={classes.right}>
            <select
              className={classes.select}
              name="type"
              value={searchData?.type}
              onChange={inputHandler}
            >
              <option value="kamus">Kamus</option>
              <option value="antonim">Antonim(Bandaemal)</option>
              <option value="sinonim">Sinonim(Bisethanmal)</option>
            </select>

            <input
              type="text"
              placeholder="cari"
              className={classes.input_search}
              name="word"
              value={searchData?.word}
              onChange={inputHandler}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
