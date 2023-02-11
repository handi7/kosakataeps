import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Layout from "../components";

export default function Perbab() {
  const [numb, setNumb] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let arr = [];
    for (let i = 3; i <= 60; i++) {
      arr.push(i);
    }
    setNumb(arr);
  }, []);

  return (
    <div className="mb-5">
      <h5 className="my-4">Kosakata</h5>

      <Row>
        {numb?.map((item) => {
          return (
            <Col key={item} xs={6} sm={4} lg={3} className="mb-3">
              <button
                className="primary__btn w-100"
                onClick={() => router.push(`/kosakata/${item}`)}
              >
                BAB {item}
              </button>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
