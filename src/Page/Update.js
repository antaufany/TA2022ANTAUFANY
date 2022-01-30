import React, { Component } from 'react'
import CRUDHandler from '../Handler/CRUDHandler';
import {Container, Form , Card, Button} from 'react-bootstrap'
export class Update extends Component {
   
    constructor(props) {
        super(props);
        this.onChangeLatitude = this.onChangeLatitude.bind(this)
        this.onChangeLongitude = this.onChangeLongitude.bind(this)
        this.onChangeKeterangan = this.onChangeKeterangan.bind(this)
        this.updateData = this.updateData.bind(this)

        this.state = {
            currentData:{
                key: null,
               nama: ''
            }
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const {getNama} = nextProps;
        if(prevState.currentData.key !== getNama.key){
            return{
                currentData: getNama,

            }
        }
        return prevState.currentData
    }
    componentDidMount() {
        this.setState({
            currentData: this.props.getNama,
        });
    };
    onChangeLatitude(e){
        const lat = e.target.value;
        this.setState(function(prevState){
            return{
                currentData: {
                    ...prevState.currnetData,
                    lat: lat,
                },
            };
        });
    };
    onChangeLongitude(e){
        const lon = e.target.value;
        this.setState(function(prevState){
            return{
                currentData: {
                    ...prevState.currentData,
                    lon: lon,
                }
            }
        });
    };
    onChangeKeterangan(e){
        const nama = e.target.value;
        this.setState(function(prevState){
            return{
                currentData: {
                    ...prevState.currentData,
                    nama: nama,
                },
            };
        });
    };
    updateData(){
        const timestamp = Date.now();
        
        const dataCoord ={
            nama: this.state.currentData.nama
        };
        const dataHistory ={
  
            nama: this.state.currentData.nama,
            kapan: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)
        };
        CRUDHandler.update(this.state.currentData.key, dataCoord)
        .then(() =>{
            CRUDHandler.historycal(dataHistory)
            this.setState({
                message: " UPDATE BERHASIL"
               
            });
            window.location.reload(false);
        })
        .catch((e) =>{
            console.log(e)
        });

    }

    render() {
        const { currentData } = this.state;
        return (
        <Container fluid>
            <Card>
                {currentData ? (
                <Card.Body>
                    <Form>
                    
                        
                          <Form.Group className="md-3">
                            <Form.Label style={{ color: '#000' }}>Keterangan</Form.Label>
                            <Form.Control type="text" defaultValue={currentData.nama} onChange={this.onChangeKeterangan}/>
                        </Form.Group>
                    </Form>
                    <Button onClick={this.updateData}>Save</Button>
                </Card.Body>
                ): ('') }
            </Card>
        </Container>
            
        )
    }
}

export default Update
