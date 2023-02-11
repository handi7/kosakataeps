import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Layout from "../components";

export default function Perbab() {
  const [numb, setNumb] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 3; i <= 60; i++) {
      arr.push(i);
    }
    setNumb(arr);
  }, []);

  return (
    <Layout>
      <Fragment>
        <Container>
          <div className="mb-5">
            <h5>Kosakata bab 3-60</h5>

            <Row>
              <Col sm={6}>
                {numb.map((item) => {
                  return (
                    item <= 30 && (
                      <div key={item} className="text-center my-3">
                        <button className="secondary__btn">BAB {item}</button>
                      </div>
                    )
                  );
                })}
              </Col>
              <Col sm={6}>
                {numb.map((item) => {
                  return (
                    item > 30 && (
                      <div key={item} className="text-center my-3">
                        <button className="secondary__btn">BAB {item}</button>
                      </div>
                    )
                  );
                })}
              </Col>
            </Row>
          </div>
        </Container>
      </Fragment>
    </Layout>
  );
}
