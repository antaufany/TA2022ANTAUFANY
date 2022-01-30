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
const Pressure = () => {
  const [getData, setGetData] = useState([]);
  const [dataGauge, setDataGauge] = useState([]);
  useEffect(() => {
    const ewsApp = CRUDHandler.getEws();
    ewsApp.on("value", (snapshot) => {
      const DataIsi = snapshot.child("pressure-solar").val();
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
            <h1 className="fs-3 text">EWS Pressure Solar Monitoring</h1>
          </Container>

          {Object.keys(getData).map((item, index) => (
            <Accordion defaultActiveKey={index}>
              <Accordion.Item eventKey={index}>
                <AccordionHeader>{getData[item].nama}</AccordionHeader>
                <AccordionBody>
                  <Card className="border-2 border-primary p-3 shadow rounded-3 d-flex">
                    <Card.Title>{getData[item].nama}</Card.Title>
                    <>
                      <Container className="align-items-start justify-form-content-right ">
                        <Table responsive striped bordered hover>
                          <thead>
                            <tr>
                              <th>Current</th>
                              <th>Pressure Bar</th>
                              <th>Pressure Psi</th>
                              <th>Voltage</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{getData[item].current}</td>
                              <td>{getData[item].pressureBar}</td>
                              <td>{getData[item].pressurePsi}</td>
                              <td>{getData[item].voltage}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Container>
                      <Container fluid className="d-flex justify-content-center align-items-center">
                        <Row xs={"auto"} md={"auto"} lg={"auto"}>
                          <Col>
                            <p className="text-center">Pressure Bar</p>
                            <ReactSpeedometer width={200} height={200} maxValue={10} minValue={0} value={parseFloat(getData[item].pressureBar)} segments={5} segmentColors={["#B7D6ED", "#809FFF", "#BFCFFF", "#002DB3", "#0000FF"]} />
                          </Col>
                          <Col>
                            <p className="text-center">Pressure Psi</p>
                            <ReactSpeedometer width={200} height={200} maxValue={200} minValue={0} value={parseFloat(getData[item].pressurePsi)} segments={5} segmentColors={["#B7D6ED", "#809FFF", "#BFCFFF", "#002DB3", "#0000FF"]} />
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
