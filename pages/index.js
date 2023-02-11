import { Fragment, useEffect } from "react";
import Layout from "../components";
import { Col, Container, Row, Spinner } from "reactstrap";
import { useSelector } from "react-redux";
import Image from "next/image";
import GoogleAdsense from "next-google-ads";
import Adsense from "../components/Adsense";

export default function Home() {
  const data = useSelector((state) => state.words);
  const search = useSelector((state) => state.search);

  const Item = ({ word }) => {
    const words = word.split(",");
    return (
      <div>
        {words.map((item, idx) => {
          const isMatch = item
            .toLowerCase()
            .startsWith(search?.word.toLowerCase());
          return (
            <span
              key={idx}
              className={`bg-transparent text-${
                isMatch ? "warning" : "white"
              } font-weight-bold px-2`}
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
      {data?.loading ? (
        <div
          className={
            "d-flex flext-column justify-content-center align-items-center mt-5 pt-5"
          }
        >
          <Spinner color="light" />
          <span className="text-white">Sedang mencari. . .</span>
        </div>
      ) : search?.word ? (
        data?.words?.length > 0 ? (
          <div>
            <p>
              Hasil pencarian {search?.type} dengan kata kunci &quot;
              {search?.word}&quot;.
            </p>

            <Row>
              {data?.words?.map((item, idx) => {
                return item?.kor ? (
                  <Col key={idx} xs={12} sm={6} lg={4} className="p-1">
                    <div className="border rounded p-2">
                      <Item word={item?.kor} />
                      <Item word={item?.ind} />
                    </div>
                  </Col>
                ) : (
                  <Col key={idx} lg={12} xl={6} className="bg-transparent">
                    <Row className="border rounded p-2 my-2 mx-1">
                      {/* <div className="border rounded"> */}
                      <Col xs={6} className="bg-transparent text-center">
                        <Item word={item?.kor1} />
                        <Item word={item?.ind1} />
                      </Col>
                      <Col xs={6} className="bg-transparent text-center">
                        <Item word={item?.kor2} />
                        <Item word={item?.ind2} />
                      </Col>
                      {/* </div> */}
                    </Row>
                  </Col>
                );

                {
                  /* {(idx + 1) % 10 === 0 ? (
                            <Adsense
                              adClient="ca-pub-2941796843013407"
                              adSlot="5327133669"
                            />
                          ) : null} */
                }
              })}
            </Row>
          </div>
        ) : (
          <div className="text-center">
            <p>
              Tidak ditemukan hasil pencarian dengan kata kunci &quot;
              {search?.word}&quot;.
            </p>
          </div>
        )
      ) : (
        <div className="text-center mt-5">
          <h4>
            Kumpulan kosakata dari standard text book tahun 2015 EPS TOPIK
          </h4>
          <p>hasil pencarian akan ditampilkan di sini.</p>

          {/* <GoogleAdsense
                  client="ca-pub-2941796843013407"
                  slot="5327133669"
                  responsive="true"
                /> */}

          <Adsense adClient="ca-pub-2941796843013407" adSlot="5327133669" />

          <div className="mt-5 pt-5">
            <h5>Tersedia juga dalam bentuk android app.</h5>
            <div>
              <Image src="/brand.png" width={50} height={50} alt="brand" />
            </div>
            <a
              rel="noreferrer"
              href="https://play.google.com/store/apps/details?id=com.handev.krid15"
              target="_blank"
            >
              Download disini.
            </a>
          </div>

          <GoogleAdsense
            client="ca-pub-2941796843013407"
            slot="5327133669"
            responsive="true"
          />
        </div>
      )}
    </div>
  );
}
