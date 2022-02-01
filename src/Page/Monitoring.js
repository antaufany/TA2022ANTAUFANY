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
      dataField: "id.no",
      text: "Nomor",
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1;
      },
      sort: true,
    },
    {
      dataField: "date",
      text: "Tanggal",
      sort: true,
    },
    {
      dataField: "sumur",
      text: "Sumur",
      sort: true,
    },
    {
      dataField: "time",
      text: "Waktu",
      sort: true,
    },
    {
      dataField: "temperature",
      text: "Suhu (°C)",
      sort: true,
    },
    {
      dataField: "ph",
      text: "PH (pH)",
      sort: true,
    },
    {
      dataField: "tds",
      text: "TDS (ppm)",
      sort: true,
    },
    {
      dataField: "orp",
      text: "ORP (mV)",
      sort: true,
    },
    {
      dataField: "klorin",
      text: "FreeChlorine (ppm)",
      sort: true,
    },
    {
      dataField: "submitter",
      text: "Submitter",
      sort: true,
    },
  ];
  const defaultSort = [
    {
      dataField: "date",
      order: "asc",
    },
  ];

  const columns2 = [
    {
      dataField: "id.no",
      text: "Nomor",
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1;
      },
      sort: true,
    },
    {
      dataField: "date",
      text: "Tanggal",
      sort: true,
    },
    {
      dataField: "pipa",
      text: "Pipa",
      sort: true,
    },
    {
      dataField: "time",
      text: "Waktu",
      sort: true,
    },
    {
      dataField: "temperature",
      text: "Suhu (°C)",
      sort: true,
    },
    {
      dataField: "flowrate",
      text: "Flowrate (m^3/h)",
      sort: true,
    },
    {
      dataField: "fss",
      text: "FSS (m/s)",
      sort: true,
    },
    {
      dataField: "velocity",
      text: "Velocity (m/s)",
      sort: true,
    },
    {
      dataField: "flowestimasi",
      text: "Flowestimasi (m^3)",
      sort: true,
    },
    {
      dataField: "dynamicpressure",
      text: "DynamicPressure",
      sort: true,
    },
    {
      dataField: "submitter",
      text: "Submitter",
      sort: true,
    },
  ];
  const defaultSort2 = [
    {
      dataField: "date",
      order: "asc",
    },
    {
      dataField: "pipa",
      order: "asc",
    },
    {
      dataField: "time",
      order: "asc",
    },
    {
      dataField: "temperature",
      order: "asc",
    },
    {
      dataField: "flowrate",
      order: "asc",
    },
    {
      dataField: "fss",
      order: "asc",
    },
    {
      dataField: "velocity",
      order: "asc",
    },
    {
      dataField: "flowestimasi",
      order: "asc",
    },
    {
      dataField: "submitter",
      text: "Submitter",
      sort: true,
    },
  ];
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
          {currentIndex ? (
            <ToolkitProvider bootstrap4 keyField="id.no" data={currentIndex} columns={columns2} defaultSorted={defaultSort2} search exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
              {(props) => (
                <div>
                  <Container fluid className="d-flex p-3 align-content-between justify-content-between">
                    <SearchBar {...props.searchProps} />
                    <ExportCSVButton {...props.csvProps} className="btn btn-primary align-self-end">
                      <AiFillPrinter />
                      Export Data Csv
                    </ExportCSVButton>
                  </Container>
                  <hr />
                  <BootstrapTable {...props.baseProps} filter={filterFactory()} pagination={paginationFactory()} />
                </div>
              )}
            </ToolkitProvider>
          ) : null}

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

          {currentIndex2 ? (
            <ToolkitProvider bootstrap4 keyField="id.no" data={currentIndex2} columns={columns} defaultSorted={defaultSort} search exportCSV>
              {(props) => (
                <div>
                  <Container fluid className="d-flex p-3 align-content-between justify-content-between">
                    <SearchBar {...props.searchProps} />
                    <ExportCSVButton {...props.csvProps} className="btn btn-primary align-self-end">
                      <AiFillPrinter />
                      Export Data Csv
                    </ExportCSVButton>
                  </Container>
                  <hr />
                  <BootstrapTable {...props.baseProps} filter={filterFactory()} pagination={paginationFactory()} />
                </div>
              )}
            </ToolkitProvider>
          ) : null}
        </Card>
      </Container>
    </>
  );
};

export default Monitoring;
