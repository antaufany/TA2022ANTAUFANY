import React, { useEffect, useState } from "react";
import { Button, Card, Container, Accordion, Table, Row, Col } from "react-bootstrap";
import Navbarx from "../Component/Navbar";
import CRUDHandler from "../Handler/CRUDHandler";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactSpeedometer from "react-d3-speedometer";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { perf } from "../Firebase";
const Pressure = () => {
  const Tracer = perf.trace("panel-tracer");
  Tracer.start();
  const [getData, setGetData] = useState([]);
  const [dataGauge, setDataGauge] = useState([]);
  useEffect(() => {
    const ewsApp = CRUDHandler.getEws();
    ewsApp.on("value", (snapshot) => {
      const DataIsi = snapshot.child("panel-pompa").val();
      const getData = [];
      for (let id in DataIsi) {
        getData.push(DataIsi[id]);
      }
      setGetData(getData);
    });
    return () => {
      ewsApp.off();
    };
  }, [dataGauge]);
  Tracer.stop();

  return (
    <>
      <Navbarx />
      <Container>
        <Card fluid className="p-4 shadow" style={{ marginTop: "20px", background: "white" }}>
          <a href="/history">
            <Button className="h-70 w-40 m-2">
              <IoPhonePortraitOutline className="m-1" /> Menu EWS Monitoring
            </Button>
          </a>
          <Container className="d-flex align-content-end justify-content-end position-relative ">
            <h1 className="fs-3 text">EWS Panel Pompa Monitoring</h1>
          </Container>
          {Object.keys(getData).map((item, index) => (
            <Accordion defaultActiveKey={index}>
              <Accordion.Item eventKey={index}>
                <AccordionHeader> {getData[item].nama}</AccordionHeader>
                <AccordionBody>
                  <Card className="border-2 border-primary p-3 shadow rounded-3 d-flex">
                    <Card.Title>{getData[item].nama}</Card.Title>
                    <>
                      <Container className="align-items-start justify-form-content-right ">
                        <Table responsive striped bordered hover>
                          <thead>
                            <tr>
                              <th>Current R</th>
                              <th>Current S</th>
                              <th>Current T</th>
                              <th>Frequency</th>
                              <th>Power</th>
                              <th>Power Factor</th>
                              <th>Volt R</th>
                              <th>Volt S</th>
                              <th>Volt T</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{getData[item].currentR}</td>
                              <td>{getData[item].currentS}</td>
                              <td>{getData[item].currentT}</td>
                              <td>{getData[item].frequency}</td>
                              <td>{getData[item].power}</td>
                              <td>{getData[item].powerFactor}</td>
                              <td>{getData[item].voltR}</td>
                              <td>{getData[item].voltS}</td>
                              <td>{getData[item].voltT}</td>
                            </tr>
                          </tbody>
                        </Table>
                        {getData[item].led1 && getData[item].led2 && getData[item].led3 && getData[item].led4 && getData[item].led5 && getData[item].led6 ? (
                          <>
                            <Table responsive striped bordered hover>
                              <thead>
                                <tr>
                                  <th>{getData[item].led1.nama}</th>
                                  <th>{getData[item].led2.nama}</th>
                                  <th>{getData[item].led3.nama}</th>
                                  <th>{getData[item].led4.nama}</th>
                                  <th>{getData[item].led5.nama}</th>
                                  <th>{getData[item].led6.nama}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{+getData[item].led1.value}</td>
                                  <td>{+getData[item].led2.value}</td>
                                  <td>{+getData[item].led3.value}</td>
                                  <td>{+getData[item].led4.value}</td>
                                  <td>{+getData[item].led5.value}</td>
                                  <td>{+getData[item].led6.value}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </>
                        ) : (
                          ""
                        )}
                        {getData[item].relay1 || getData[item].relay2 ? (
                          <>
                            <Table responsive striped bordered hover>
                              <thead>
                                <tr>
                                  <th>{getData[item].relay1.nama}</th>
                                  <th>{getData[item].relay2.nama}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{+getData[item].relay1.trigger}</td>
                                  <td>{+getData[item].relay2.trigger}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </>
                        ) : (
                          ""
                        )}
                      </Container>
                      <Container>
                        <Row xs={"auto"} md={"auto"} lg={"auto"}>
                          <Col>
                            <p className="text-center">Current R</p>
                            <ReactSpeedometer width={200} height={200} maxValue={100} minValue={5} value={parseFloat(getData[item].currentR)} segments={5} segmentColors={["#B7D6ED", "#809FFF", "#BFCFFF", "#002DB3", "#0000FF"]} />
                          </Col>
                          <Col>
                            <p className="text-center">Current S</p>
                            <ReactSpeedometer width={200} height={200} maxValue={100} minValue={5} value={parseFloat(getData[item].currentS)} segments={5} segmentColors={["#B7D6ED", "#809FFF", "#BFCFFF", "#002DB3", "#0000FF"]} />
                          </Col>
                          <Col>
                            <p className="text-center">Current S</p>
                            <ReactSpeedometer width={200} height={200} maxValue={100} minValue={5} value={parseFloat(getData[item].currentT)} segments={5} segmentColors={["#B7D6ED", "#809FFF", "#BFCFFF", "#002DB3", "#0000FF"]} />
                          </Col>
                          <Col>
                            <p className="text-center">Volt R</p>
                            <ReactSpeedometer width={200} height={200} maxValue={300} minValue={100} value={parseFloat(getData[item].voltR)} segments={5} segmentColors={["#B7D6ED", "#809FFF", "#BFCFFF", "#002DB3", "#0000FF"]} />
                          </Col>
                          <Col>
                            <p className="text-center">Volt S</p>
                            <ReactSpeedometer width={200} height={200} maxValue={300} minValue={100} value={parseFloat(getData[item].voltS)} segments={5} segmentColors={["#B7D6ED", "#809FFF", "#BFCFFF", "#002DB3", "#0000FF"]} />
                          </Col>
                          <Col>
                            <p className="text-center">Volt T</p>
                            <ReactSpeedometer width={200} height={200} maxValue={300} minValue={100} value={parseFloat(getData[item].voltT)} segments={5} segmentColors={["#B7D6ED", "#809FFF", "#BFCFFF", "#002DB3", "#0000FF"]} />
                          </Col>
                        </Row>
                      </Container>
                    </>
                  </Card>
                </AccordionBody>
              </Accordion.Item>
            </Accordion>
          ))}
        </Card>
      </Container>
    </>
  );
};

export default Pressure;
