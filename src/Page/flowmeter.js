import React, { useEffect, useState } from "react";
import { Button, Card, Container, Accordion, Table, Row, Col } from "react-bootstrap";
import Navbarx from "../Component/Navbar";
import CRUDHandler from "../Handler/CRUDHandler";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactSpeedometer from "react-d3-speedometer";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { perf } from "../Firebase";
const Flowmeter = () => {
  const Tracer = perf.trace("trace-flow");
  Tracer.start();
  const [getData, setGetData] = useState([]);
  const [dataGauge, setDataGauge] = useState([]);
  useEffect(() => {
    const ewsApp = CRUDHandler.getEws();
    ewsApp.on("value", (snapshot) => {
      const DataIsi = snapshot.child("flow-meter").val();
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
              <IoPhonePortraitOutline className="m-1" />
              Menu EWS Monitoring
            </Button>
          </a>
          <Container className="d-flex align-content-end justify-content-end position-relative ">
            <h1 className="fs-3 text">EWS Flow Meter Monitoring</h1>
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
                              <th>Energy Flow</th>
                              <th>FlowRate</th>
                              <th>Fluid Sound Speed</th>
                              <th>Negative Acc</th>
                              <th>Positive Acc</th>
                              <th>Temp Inlet</th>
                              <th>Temp Outlet</th>
                              <th>Total Air</th>
                              <th>Velocity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{getData[item].energyFlow} GJ/h</td>
                              <td>{getData[item].flowRate} m3/h</td>
                              <td>{getData[item].fluidSoundSpeed} m/s</td>
                              <td>{getData[item].negativeAcc}</td>
                              <td>{getData[item].positiveAcc}</td>
                              <td>{getData[item].tempInlet} °C</td>
                              <td>{getData[item].tempOutlet} °C</td>
                              <td>{getData[item].totalAir} m3</td>
                              <td>{getData[item].velocity} m/s</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Container>
                      <Container fluid>
                        <Row xs={"auto"} md={"auto"} lg={"auto"}>
                          <Col>
                            <p className="text-center">Energy Flow</p>
                            <ReactSpeedometer width={200} height={200} maxValue={300} minValue={0} value={parseFloat(getData[item].energyFlow)} segments={5} segmentColors={["#B7D6ED", "#809FFF", "#BFCFFF", "#002DB3", "#0000FF"]} />
                          </Col>
                          <Col>
                            <p className="text-center">Fluid Sound Speed</p>
                            <ReactSpeedometer
                              width={200}
                              height={200}
                              maxValue={4000}
                              minValue={100}
                              value={parseFloat(getData[item].fluidSoundSpeed)}
                              segments={5}
                              segmentColors={["#B7D6ED", "#809FFF", "#BFCFFF", "#002DB3", "#0000FF"]}
                              forceRender={false}
                            />
                          </Col>
                          <Col>
                            <p className="text-center">Flowrate</p>
                            <ReactSpeedometer width={200} height={200} maxValue={300} minValue={0} value={parseFloat(getData[item].flowRate)} segments={5} segmentColors={["#B7D6ED", "#809FFF", "#BFCFFF", "#002DB3", "#0000FF"]} />
                          </Col>
                          <Col>
                            <p className="text-center">Velocity</p>
                            <ReactSpeedometer width={200} height={200} maxValue={300} minValue={0} value={parseFloat(getData[item].velocity)} segments={5} segmentColors={["#B7D6ED", "#809FFF", "#BFCFFF", "#002DB3", "#0000FF"]} />
                          </Col>
                          <Col>
                            <p className="text-center">Temp Inlet</p>
                            <ReactSpeedometer width={200} height={200} maxValue={75} minValue={0} value={parseFloat(getData[item].tempInlet)} segments={5} segmentColors={["#B7D6ED", "#809FFF", "#BFCFFF", "#002DB3", "#0000FF"]} />
                          </Col>
                          <Col>
                            <p className="text-center">Temp Outlet</p>
                            <ReactSpeedometer width={200} height={200} maxValue={75} minValue={0} value={parseFloat(getData[item].tempOutlet)} segments={5} segmentColors={["#B7D6ED", "#809FFF", "#BFCFFF", "#002DB3", "#0000FF"]} />
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

export default Flowmeter;
