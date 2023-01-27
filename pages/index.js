import { Fragment } from "react";
import Layout from "../components";
import { Col, Container, Row, Spinner } from "reactstrap";
import { useSelector } from "react-redux";

export default function Home() {
  const data = useSelector((state) => state.words);

  const Item = ({ word }) => {
    return (
      <div>
        <span className="bg-transparent text-white py-5 px-2">{word}</span>
      </div>
    );
  };

  return (
    <Layout>
      <Fragment>
        <Container>
          <div>
            {data?.loading ? (
              <div
                style={{ minHeight: "100vh" }}
                className={
                  "d-flex flext-column justify-content-center align-items-center"
                }
              >
                <div>
                  <Spinner color="light" />
                </div>
                <div>
                  <span className="text-white">Sedang mencari. . .</span>
                </div>
              </div>
            ) : data?.words?.length > 0 ? (
              data?.words?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="bg-transparent border shadow rounded p-2 my-1"
                  >
                    {item?.kor ? (
                      <>
                        <Item word={item?.kor} />
                        <Item word={item?.ind} />
                      </>
                    ) : (
                      <Row className="bg-transparent">
                        <Col md={6} className="bg-transparent text-center">
                          <Item word={item?.kor1} />
                          <Item word={item?.ind1} />
                        </Col>
                        <Col md={6} className="bg-transparent text-center">
                          <Item word={item?.kor2} />
                          <Item word={item?.ind2} />
                        </Col>
                      </Row>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center mt-5">
                <h4>
                  Kumpulan kosakata dari standard rext book tahun 2015 EPS TOPIK
                </h4>
                <p>hasil pencarian akan ditampilkan di sini.</p>
              </div>
            )}
          </div>
        </Container>
      </Fragment>
    </Layout>
  );
}
