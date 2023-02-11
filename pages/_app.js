import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store, wrapper } from "../store";
import Script from "next/script";
import Layout from "../components";
import { Fragment } from "react";
import { Container } from "reactstrap";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Fragment>
          <Container>
            <Component {...pageProps} />
          </Container>
        </Fragment>
      </Layout>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
