/* eslint-disable no-const-assign */
import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, ToggleButton, Modal, Row, Col } from "react-bootstrap";
import Navbarx from "../Component/Navbar";
import CRUDHandler from "../Handler/CRUDHandler";
import "bootstrap/dist/css/bootstrap.min.css";
import { perf } from "../Firebase";

const AddData = () => {
  const Tracer = perf.trace("add-data");
  Tracer.start();
  const [getAlat, setGetAlat] = useState(null);
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
  });
  const [listData, setListData] = useState(null);
  const [setChild, setChildData] = useState("");
  const [key, getKey] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const getAll = CRUDHandler.getEws().orderByKey();
    getAll.on("value", (snapshot) => {
      const allData = snapshot.child(getAlat).val();
      const listData = [];
      listData.push(allData);
      setListData(listData);
      const x = Object.keys(Object.assign({}, ...listData));
      getKey(x);
    });
  }, [getAlat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    CRUDHandler.create(getAlat, setChild, formData);
  };
  Tracer.stop();
  return (
    <>
      <Navbarx />
      <Container>
        <Card fluid className="p-4 shadow" style={{ marginTop: "20px", background: "white" }}>
          <Card.Header>
            <h1 className="fs-3 text">ADD Data Location EWS</h1>
          </Card.Header>
          <Container className="align-items-center justify-content-center d-flex">
            <Button style={{ margin: "10px 10px 10px 10px" }} onClick={() => setGetAlat("flow-meter")}>
              Flow meter
            </Button>
            <Button style={{ margin: "10px 10px 10px 10px" }} onClick={() => setGetAlat("panel-pompa")}>
              Panel Pompa
            </Button>
            <Button style={{ margin: "10px 10px 10px 10px" }} onClick={() => setGetAlat("pressure-solar")}>
              Pressure Solar
            </Button>
          </Container>
          <Row xs={1} md={2} xl={"auto"} xxl={"auto"} className="justify-content-center align-items-center d-flex">
            {key
              ? key.map((item) => (
                  <>
                    <Col>
                      <ToggleButton key={item} type="radio" variant={item % 2 ? "outline-success" : "outline-danger"} name="radio" onClick={(e) => setChildData(item)} style={{ margin: "10px 10px 10px 10px" }}>
                        {item}
                      </ToggleButton>
                    </Col>
                  </>
                ))
              : null}
          </Row>

          <Container className="justify-content-center align-items-center d-flex">
            <Card className="p-3 h-50 w-50">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label className="text-black font-monospace size-2">Latitude</Form.Label>
                  <Form.Control type="text" onChange={(e) => setFormData({ ...formData, latitude: e.target.value })} value={formData.latitude} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="text-black font-monospace size-2">Longitude</Form.Label>
                  <Form.Control type="text" onChange={(e) => setFormData({ ...formData, longitude: e.target.value })} value={formData.longitude} />
                </Form.Group>
                <Modal show={isOpen} onHide={isOpen}>
                  <Modal.Header closeButton onClick={() => setIsOpen(false)}>
                    <Modal.Title>{getAlat}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>{setChild}</p>
                    <p>Latitude : {formData.latitude}</p>
                    <p>Longitude : {formData.longitude}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={() => setIsOpen(false, window.location.reload(false))}>
                      Save changes
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Button type="submit" value="submit" onClick={() => setIsOpen(true)}>
                  Submit
                </Button>
              </Form>
            </Card>
          </Container>
        </Card>
      </Container>
    </>
  );
};

export default AddData;
