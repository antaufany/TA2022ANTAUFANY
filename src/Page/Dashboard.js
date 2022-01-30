import React from 'react'
import './Dashboard.css'
import Navbarx from '../Component/Navbar';
import MapContainer from '../Component/MapContainer';

import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap';
const Dashboard = () => {


        return (
           <>
          <Navbarx />
          <MapContainer/>
            </>
            

        );
}
    

export default Dashboard;