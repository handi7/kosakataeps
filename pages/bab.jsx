import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

export default function Bab() {
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
                onClick={() => router.push(`/bab/${item}`)}
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
