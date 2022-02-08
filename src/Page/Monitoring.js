import React, { useState, useEffect } from "react";
import { Container, Dropdown, Row, Col, Card, Table } from "react-bootstrap";
import Navbarx from "../Component/Navbar";
import CRUDHandler from "../Handler/CRUDHandler";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { CSVExport, Search } from "react-bootstrap-table2-toolkit";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { AiFillPrinter } from "react-icons/ai";
import { perf } from "../Firebase";
import ReactDatatable from "@ashvin27/react-datatable";

const Monitoring = () => {
  const Tracer = perf.trace("Monitoring");
  Tracer.start();
  const [DataSet, setDataSet] = useState("");
  const [DataKey, setDataKey] = useState("");
  const [currentIndex, setCurrentIndex] = useState("");
  const [currentIndex2, setCurrentIndex2] = useState("");
  const [data, setData] = useState([]);
  const [arrayan] = useState([]);
  const { ExportCSVButton } = CSVExport;
  const { SearchBar } = Search;

  const settDataEdit = (index) => {
    const dataBind = CRUDHandler.getMonitor();
    dataBind.on("value", (snapshot) => {
      const DataBinning = snapshot.child("LokasiDebit").child(index).child("Submitted").val();
      const currentIndex = [];
      for (let id in DataBinning) {
        currentIndex.push(DataBinning[id]);
      }
      setCurrentIndex(currentIndex);
      console.log(currentIndex);
    });
  };
  const settingDataEdit = (index) => {
    const dataBind = CRUDHandler.getMonitor();
    dataBind.on("value", (snapshot) => {
      const DataBinning = snapshot.child("LokasiQuality").child(index).child("Submitted").val();
      const currentIndex2 = [];

      for (let id in DataBinning) {
        currentIndex2.push(DataBinning[id]);
      }
      setCurrentIndex2(currentIndex2);

      console.log(currentIndex2);
    });
  };

  useEffect(() => {
    const enumerate = CRUDHandler.getLocation();

    enumerate.on("value", (snapshot) => {
      const dataSnip = snapshot.child("LokasiDebit").val();
      const dataSnip2 = snapshot.child("LokasiQuality").val();
      const DataSet = [];
      const DataKey = [];
      for (let id in dataSnip) {
        DataSet.push(dataSnip[id]);
      }
      for (let id in dataSnip2) {
        DataKey.push(dataSnip2[id]);
      }

      setDataSet(DataSet);
      setDataKey(DataKey);
    });
  }, []);

  const columns = [
    {
      key: "date",
      text: "Tanggal",
      sortable: true,
    },
    {
      key: "sumur",
      text: "Sumur",
      sortable: true,
    },
    {
      key: "time",
      text: "Waktu",
      sortable: true,
    },
    {
      key: "temperature",
      text: "Suhu (°C)",
      sortable: true,
    },
    {
      key: "ph",
      text: "PH (pH)",
      sortable: true,
    },
    {
      key: "tds",
      text: "TDS (ppm)",
      sortable: true,
    },
    {
      key: "orp",
      text: "ORP (mV)",
      sortable: true,
    },
    {
      key: "klorin",
      text: "FreeChlorine (ppm)",
      sortable: true,
    },
    {
      key: "submitter",
      text: "Submitter",
      sortable: true,
    },
  ];
  const defaultSort = [
    {
      key: "date",
      order: "asc",
    },
  ];

  const columns2 = [
    {
      key: "date",
      text: "Tanggal",
      sortable: true,
    },
    {
      key: "pipa",
      text: "Pipa",
      sortable: true,
    },
    {
      key: "time",
      text: "Waktu",
      sortable: true,
    },
    {
      key: "temperature",
      text: "Suhu (°C)",
      sortable: true,
    },
    {
      key: "flowrate",
      text: "Flowrate (m^3/h)",
      sortable: true,
    },
    {
      key: "fss",
      text: "FSS (m/s)",
      sortable: true,
    },
    {
      key: "velocity",
      text: "Velocity (m/s)",
      sortable: true,
    },
    {
      key: "flowestimasi",
      text: "Flowestimasi (m^3)",
      sortable: true,
    },
    {
      key: "dynamicpressure",
      text: "DynamicPressure",
      sortable: true,
    },
    {
      key: "submitter",
      text: "Submitter",
      sortable: true,
    },
  ];
  const defaultSort2 = [
    {
      key: "date",
      order: "asc",
    },
    {
      key: "pipa",
      order: "asc",
    },
    {
      key: "time",
      order: "asc",
    },
    {
      key: "temperature",
      order: "asc",
    },
    {
      key: "flowrate",
      order: "asc",
    },
    {
      key: "fss",
      order: "asc",
    },
    {
      key: "velocity",
      order: "asc",
    },
    {
      key: "flowestimasi",
      order: "asc",
    },
    {
      key: "submitter",
      text: "Submitter",
      sortable: true,
    },
  ];
  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    show_filter: true,
    show_pagination: true,
    filename: "Data_Monitoring",
    button: {
      excel: true,
      print: true,
      csv: true,
    },
  };
  Tracer.stop();
  return (
    <>
      <Navbarx />
      <Container>
        <Card className="p-4 shadow" style={{ marginTop: "20px", background: "white" }}>
          <Container className="d-flex align-content-start justify-content-start position-relative ">
            <h1 className="fs-3 text">Portable Monitoring</h1>
          </Container>
          <Container fluid className="d-flex align-content-end justify-content-end">
            <Dropdown fluid>
              <Dropdown.Toggle variant="primary" id="dropdown-basic" className="m-1">
                Lokasi Debit
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.keys(DataSet).map((item) => (
                  <Dropdown.Item key={item} onClick={() => settDataEdit(DataSet[item].nama)}>
                    {DataSet[item].nama}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Container>
          {currentIndex ? <ReactDatatable config={config} records={currentIndex} columns={columns2} /> : null}

          <Container fluid className="d-flex align-content-end justify-content-end ">
            <Dropdown fluid>
              <Dropdown.Toggle variant="primary" id="dropdown-basic" className="m-1 align-self-end">
                Lokasi Quality
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.keys(DataKey).map((item) => (
                  <Dropdown.Item key={item} onClick={() => settingDataEdit(DataKey[item].nama)}>
                    {DataKey[item].nama}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Container>

          {currentIndex2 ? <ReactDatatable config={config} records={currentIndex2} columns={columns} /> : null}
        </Card>
      </Container>
    </>
  );
};

export default Monitoring;
