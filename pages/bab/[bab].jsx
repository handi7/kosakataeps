import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { API_URL } from "../../constants";
import classes from "../../styles/bab.module.css";

export default function Bab() {
  const router = useRouter();
  const { bab } = router.query;

  const [data, setData] = useState([]);
  const [activeTab, setTab] = useState(1);
  const [selectedId, setSelected] = useState(0);

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
      router.push(`/bab/${+bab - 1}`);
    }
  };

  const onNext = () => {
    if (+bab < 60) {
      router.push(`/bab/${+bab + 1}`);
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

  const onSelect = (id) => {
    setSelected(id);
    setTimeout(() => {
      setSelected(0);
    }, 1200);
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

      <Nav tabs>
        <NavItem style={{ cursor: "pointer" }}>
          <NavLink
            className={`${activeTab === 1 ? "active" : ""}`}
            onClick={() => setTab(1)}
          >
            List
          </NavLink>
        </NavItem>
        <NavItem style={{ cursor: "pointer" }}>
          <NavLink
            className={`${activeTab === 2 ? "active" : ""}`}
            onClick={() => setTab(2)}
          >
            Guess & Check
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={1}>
          <Row>
            <Col sm="12" className="p-3">
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
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId={2}>
          <Row>
            <Col sm="12" className="p-3">
              <Row>
                {data?.data?.map((item) => {
                  return (
                    <Col
                      key={item?.id}
                      sm={6}
                      style={{ cursor: "pointer" }}
                      className="text-center p-2"
                      onClick={() => onSelect(item?.id)}
                    >
                      {selectedId === item?.id ? (
                        <div
                          className={`${classes.item_id} bg-primary text-white py-3`}
                        >
                          {item?.ind}
                        </div>
                      ) : (
                        <div className="bg-white py-3">{item?.kor}</div>
                      )}
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </TabPane>
      </TabContent>

      <div className="text-center text-white my-5">
        <button
          className="secondary__btn"
          onClick={() => router.push("/bab/3")}
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
          onClick={() => router.push("/bab/60")}
        >
          <BsChevronDoubleRight />
        </button>
      </div>
    </div>
  );
}
