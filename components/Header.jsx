import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import classes from "../styles/header.module.css";
import { getAntonim, getKamus, getSinonim } from "../store/actions/wordAction";
import { SEARCH_TYPE, SEARCH_WORD } from "../store/types";
import { BsSearch } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import { navData } from "./navData";

export default function Header() {
  const search = useSelector((state) => state.search);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState({ word: "", type: "kamus" });
  const [isSearch, setSearch] = useState(false);

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
    switch (name) {
      case "word":
        dispatch({ type: SEARCH_WORD, payload: value });
        break;

      case "type":
        dispatch({ type: SEARCH_TYPE, payload: value });
        break;

      default:
        break;
    }
    setSearchData({ ...searchData, [name]: value });
  };

  const toggleMenu = () => {
    menuRef.current.classList.toggle(`${classes.menu__active}`);
  };

  useEffect(() => {
    switch (search?.type) {
      case "kamus":
        getKamus(dispatch, search?.word);
        break;

      case "antonim":
        getAntonim(dispatch, search?.word);
        break;

      case "sinonim":
        getSinonim(dispatch, search?.word);
        break;

      default:
        break;
    }
  }, [search]);

  useEffect(() => {
    window.addEventListener("scroll", headerFunc);
    return () => window.removeEventListener("scroll", headerFunc);
  }, []);

  return (
    <header className={`${classes.header}`} ref={headerRef}>
      <Container className={classes.container}>
        <div className={`${classes.nav__wrapper}`}>
          {/* ======== navigation logo ======== */}
          <div className={`${classes.left}`}>
            <span className={`${classes.mobile__menu}`} onClick={toggleMenu}>
              <AiOutlineMenu />
            </span>

            {/* ========= nav menu =========== */}
            <div
              className={`${classes.navigation}`}
              ref={menuRef}
              onClick={toggleMenu}
            >
              <div className={`${classes.nav__menu}`}>
                {navData.map((item, index) => {
                  const current = item.path.slice(1) || "home";
                  return (
                    <Link
                      // style={{
                      //   color: tag.includes(current) ? "#01d293" : "",
                      // }}
                      href={item.path}
                      key={index}
                    >
                      {item.display}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={classes.right}>
            {isSearch && (
              <select
                className={classes.select}
                name="type"
                value={searchData?.type}
                onChange={inputHandler}
              >
                <option value="kamus">Kamus</option>
                <option value="antonim">반대말</option>
                <option value="sinonim">비슷한 말</option>
              </select>
            )}

            {isSearch && (
              <input
                type="text"
                placeholder="cari"
                className={classes.input_search}
                name="word"
                value={searchData?.word}
                onChange={inputHandler}
              />
            )}

            <button
              className="secondary__btn"
              onClick={() => setSearch(!isSearch)}
            >
              {isSearch ? <RiCloseFill /> : <BsSearch />}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
