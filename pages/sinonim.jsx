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
import { API_URL } from "../constants";

export default function Sinonim() {
  const router = useRouter();
  const page = router.query.page || 1;
  const pageSize = 30;

  const [data, setData] = useState([]);

  const getAntonim = async (page) => {
    try {
      const res = await axios.get(
        `${API_URL}/synonyms/?offset=${(page - 1) * pageSize}&limit=${pageSize}`
      );
      setData(res.data);
    } catch (error) {}
  };

  const onPrev = () => {
    if (+page > 1) {
      router.push(`/sinonim/?page=${+page - 1}`);
    }
  };

  const onNext = () => {
    if (+page < Math.ceil(data?.count / pageSize)) {
      router.push(`/sinonim/?page=${+page + 1}`);
    }
  };

  useEffect(() => {
    if (page) {
      getAntonim(+page);
    }
  }, [page]);

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

  return (
    <div>
      <div className="d-flex justify-content-between my-4">
        <div>
          <h5 style={{ fontWeight: 600 }}>비슷한 말(Sinonim)</h5>
          <span className="text-white">{data?.count} kata</span>
        </div>
        <span className="text-white">
          {page}/{Math.ceil(data?.count / pageSize)}
        </span>
      </div>

      <Row>
        {data?.data?.map((item) => {
          return (
            <Col key={item.id} lg={12} xl={6} className="p-1">
              <Row>
                <Col xs={1} className="py-1">
                  {/* <span className="text-white">{item?.id}.</span> */}
                  <Word word={`${item?.id}.`} />
                </Col>
                <Col xs={11} className="p-1">
                  <Word word={item.kor} />
                  <Word word={item.ind} />
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>

      <div className="text-center text-white my-5">
        <button
          className="secondary__btn"
          onClick={() => router.push("/sinonim")}
        >
          <BsChevronDoubleLeft />
        </button>
        <button className="secondary__btn" onClick={onPrev}>
          <BsChevronLeft /> prev
        </button>

        <span style={{ fontWeight: 600 }}>
          halaman {page} dari {Math.ceil(data?.count / pageSize)}
        </span>

        <button className="secondary__btn" onClick={onNext}>
          next <BsChevronRight />
        </button>
        <button
          className="secondary__btn"
          onClick={() =>
            router.push(`/sinonim/?page=${Math.ceil(data?.count / pageSize)}`)
          }
        >
          <BsChevronDoubleRight />
        </button>
      </div>
    </div>
  );
}
