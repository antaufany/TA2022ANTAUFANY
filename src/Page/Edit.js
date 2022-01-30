import React,{useState, useEffect} from 'react'
import {Container, Card,Button, Row, Col, Table} from 'react-bootstrap'
import Navbarx from '../Component/Navbar'
import CRUDHandler from '../Handler/CRUDHandler'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const Edit = () => {
    const [getAlat,setGetAlat ] = useState(null)
    const [getKota, setGetKota] = useState('')
    const [nomor, setNomor] = useState('')

    
    useEffect(() => {
        const Alat = CRUDHandler.getLocation()
      
        Alat.on('value', snapshot =>{
            const Data = snapshot.child(getAlat).val()
            const getKota = []
   
            for(let id in Data) {
                getKota.push(Data[id])
            }
            setGetKota(getKota)
       
           
            
        })   
    
    }, [getAlat]);

    const columns = [{
        dataField: 'id.no' ,
        text: 'Nomor', 
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return rowIndex + 1;
        },
        sort: true
      }, {
        dataField: 'nama',
        text: 'Nama',
        sort: true
      }, {
        dataField: 'latitude',
        text: 'Langitude',
        sort: true
      }, {
        dataField: 'longitude',
        text: 'Longitude'
      }
    ];
    const defaultSort = [{
        dataField: 'id.no',
        order: 'asc'
    },{
        dataField: 'nama',
        order: 'asc'
    },{
        dataField: 'latitude',
        order: 'asc'
    },{
        dataField: 'longitude',
        order: 'asc'
    }]
    
    
    return (
        <>
       <Navbarx/>
       <Container>
       <Card className="p-4 shadow" style={{ marginTop: '20px' , background: 'white'}}>
           <Container className="d-flex align-content-start justify-content-start position-relative ">
           <h1 className="fs-3 text">Data Lokasi Portable</h1>    
           </Container>
           <Container className="d-flex align-content-end justify-content-end">
           <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px', width: '150px', height: '40px',margin: '5px 10px 10px 10px' }}  onClick={() => setGetAlat('LokasiDebit')}>Debit</Button>
           <Button className='btn rounded-3 ' style={{ margin: '10px 10px 10px 10px', width: '150px', height: '40px',margin: '5px 10px 10px 10px'}}  onClick={() => setGetAlat('LokasiQuality')}>Quality</Button>
           </Container>
      
           <BootstrapTable bootstrap4 keyField='id.no'  data={ getKota } columns={ columns } defaultSorted={defaultSort} pagination={ paginationFactory() } /> 
                
                     </Card>
                   
       </Container>
       </>
    )
}

export default Edit
