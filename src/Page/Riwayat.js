import React, { useEffect, useState } from "react";
import { Button, Card, Container, Accordion, Table, Row, Col } from "react-bootstrap";
import Navbarx from "../Component/Navbar";
import CRUDHandler from "../Handler/CRUDHandler";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactSpeedometer from "react-d3-speedometer";
import { Chart } from "react-google-charts";
import { perf } from "../Firebase";
const Riwayat = () => {
  const Trace = perf.trace("ews-monitor");
  Trace.start();
  const [getData, setGetData] = useState([]);
  const [setChild, setGetChild] = useState(null);
  const [dataGauge, setDataGauge] = useState([]);

  useEffect(() => {
    const ewsApp = CRUDHandler.getEws();
    ewsApp.on("value", (snapshot) => {
      const DataIsi = snapshot.child(setChild).val();
      const getData = [];
      for (let id in DataIsi) {
        getData.push(DataIsi[id]);
      }
      setGetData(getData);
    });
    return () => {
      ewsApp.off();
    };
  }, [setChild, dataGauge]);
  Trace.stop();
  return (
    <>
      <Navbarx />
      <Container>
        <Card fluid className="p-4 shadow" style={{ marginTop: "20px", background: "white" }}>
          <Container className="d-flex align-content-start justify-content-start position-relative ">
            <h1 className="fs-3 text">Ews Monitoring</h1>
          </Container>
          <Container className="d-flex align-content-end justify-content-end">
            <Button className="btn rounded-3 " style={{ margin: "10px 10px 10px 10px" }} onClick={() => setGetChild("flow-meter")}>
              Flow Meter
            </Button>
            <Button className="btn rounded-3 " style={{ margin: "10px 10px 10px 10px" }} onClick={() => setGetChild("panel-pompa")}>
              Panel Pompa
            </Button>
            <Button className="btn rounded-3 " style={{ margin: "10px 10px 10px 10px" }} onClick={() => setGetChild("pressure-solar")}>
              Pressure Solar
            </Button>
          </Container>
          <Container>
            {Object.keys(getData).map((item, index) => (
              <Accordion defaultActiveKey={index}>
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>{getData[item].nama}</Accordion.Header>
                  <Accordion.Body>
                    <Card className="border-2 border-primary p-3 shadow rounded-3 d-flex">
                      <Card.Title>{getData[item].nama}</Card.Title>
                      {setChild === "flow-meter" ? (
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
                      ) : null}
                      {setChild === "panel-pompa" ? (
                        <>
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
                      ) : (
                        ""
                      )}
                      {setChild === "pressure-solar" ? (
                        <>
                          <Container>
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
                      ) : (
                        ""
                      )}
                    </Card>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
          </Container>
        </Card>
      </Container>
    </>
  );
};

export default Riwayat;
