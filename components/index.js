import React, { Fragment } from "react";
import Header from "./Header";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>KOSAKATA STB2015 EPS TOPIK</title>
      </Head>
      <Fragment>
        <Header />
        <div>{children}</div>
      </Fragment>
    </>
  );
}
