import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from './components/DataTable/DataTable';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Spinner } from 'react-bootstrap';

import './App.css';
import ChartAggregator from './components/ChartAggregator/ChartAggregator';
import logo from './assets/logo.png'

// Get current JSON page based on URL updated with current cursor
async function getPage(url) {

  let res = await fetch(url)
  let data = await res.json()

  return [data, data['next']]
}

// Given the cursor-based pagination, get all the pages until the cursor is null
async function fetchData() {

  /* 
    Here we check if we've already fetched the data. 
    InterPro updates every 2 months apparently, so no need to refetch the data every time the App renders 
    A button is available for a forced update of the data anyway.
  */

  let interProData = JSON.parse(localStorage.getItem("interProData"))

  if (!interProData) {

    interProData = []
    let url = "https://www.ebi.ac.uk/interpro/api/entry/InterPro/?type=repeat"

    while (url != null) {

      // Get the data for the current and the next cursor
      let [data, nextUrl] = await getPage(url)

      // Concatenate the results
      interProData = interProData.concat(data["results"])

      // Update new url based on new cursor
      url = nextUrl
    }

  }

  return interProData

}

// Clear storage for new versions
function checkAppVersion(){
  console.log(process.env.REACT_APP_VERSION)
  if (localStorage.getItem("embl-app-version") === null || localStorage.getItem("embl-app-version") === undefined || localStorage.getItem("embl-app-version") !== process.env.REACT_APP_VERSION){
    localStorage.clear()
    localStorage.setItem("embl-app-version", process.env.REACT_APP_VERSION)
  }
}

function App() {

  const [interProData, setInterProData] = useState([])

  useEffect(() => {
    const setData = async () => {

      checkAppVersion();

      let data = await fetchData();
      setInterProData(data)
      
      localStorage.setItem("interProData", JSON.stringify(data))
    };
    setData();
  }, [])

  return (
      <div className="App">
      <Row>
        <h1 style = {{fontWeight: 700, textAlign: "center"}}> <span><img className = "logo" src = {logo}></img></span> &nbsp;Repeat Entries </h1>
      </Row>

      {interProData.length != 0 ?
      <Row className='tasks'>
        <Col lg={6} >
          <div className='task-col'>
            <div className="task-title">
              Chart Aggregation
            </div>
            {
              // Rendering the chart once the data has been loaded
              interProData.length > 0 &&
              <ChartAggregator interProData={interProData} />
            }
          </div>
        </Col>

        <Col lg={6}>
          <div className='task-col'>
            <div className="task-title">
              Data Table
            </div>
            {
              // Rendering the table once the data has been loaded
              interProData.length > 0 &&
              <DataTable interProData={interProData} />
            }
          </div>
        </Col>
      </Row>
      
      :
      
      <div style = {{width: "100%", textAlign:'center'}}>
              <Spinner/>
      </div>    
      }
    </div>
  );
}

export default App;
