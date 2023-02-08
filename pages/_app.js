import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store, wrapper } from "../store";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2941796843013407"
        crossorigin="anonymous"
      ></Script>
      <Component {...pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
