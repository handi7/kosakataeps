import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { Col, Row } from "reactstrap";
import { API_URL } from "../../constants";

export default function Bab() {
  const router = useRouter();
  const { bab } = router.query;

  const [data, setData] = useState([]);

  const getKamusByBab = async (bab) => {
    try {
      if (bab > 2 && bab <= 60) {
        const res = await axios.get(`${API_URL}/words/${bab}`);
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPrev = () => {
    if (+bab > 3) {
      router.push(`/kosakata/${+bab - 1}`);
    }
  };

  const onNext = () => {
    if (+bab < 60) {
      router.push(`/kosakata/${+bab + 1}`);
    }
  };

  const Word = ({ word }) => {
    const words = word.split(",");
    return (
      <div>
        {words.map((item, idx) => {
          return (
            <span
              key={idx}
              className={`bg-transparent text-white px-2`}
              style={{ fontWeight: 600 }}
            >
              {words.length === idx + 1 ? item : `${item},`}
            </span>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    if (bab) {
      getKamusByBab(+bab);
    }
  }, [bab]);

  return (
    <div>
      <div className="d-flex justify-content-between my-4">
        <div>
          <h5 style={{ fontWeight: 600 }}>Kosakata Bab {bab}</h5>
          <span className="text-white">{data?.count} kata</span>
        </div>
        <span className="text-white">{bab}/60</span>
      </div>
      {/* <h5>Kosakata Bab {bab}</h5> */}

      <Row>
        {data?.data?.map((item, idx) => {
          return (
            <Col key={item?.id} md={12} lg={6}>
              <Row className="py-1">
                <Col xs={6}>
                  <Word word={`${idx + 1}. ${item?.kor}`} />
                </Col>
                <Col xs={6}>
                  <Word word={`: ${item?.ind}`} />
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>

      <div className="text-center text-white my-5">
        <button
          className="secondary__btn"
          onClick={() => router.push("/kosakata/3")}
        >
          <BsChevronDoubleLeft />
        </button>
        <button className="secondary__btn" onClick={onPrev}>
          <BsChevronLeft /> prev
        </button>

        <span style={{ fontWeight: 600 }}>Bab {bab} dari 60</span>

        <button className="secondary__btn" onClick={onNext}>
          next <BsChevronRight />
        </button>
        <button
          className="secondary__btn"
          onClick={() => router.push("/kosakata/60")}
        >
          <BsChevronDoubleRight />
        </button>
      </div>
    </div>
  );
}
