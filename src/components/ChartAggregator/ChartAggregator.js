import React, { useEffect } from 'react';
import vegaEmbed from 'vega-embed'

import './ChartAggregator.css';


// Descending order
function compareCount(a, b) {
    if (b["count"] > a["count"]) {
      return 1;
    } else if (b["count"] < a["count"]){
      return -1;
    }
    return 0;
  }

// Compute repeat entry counts for available DBs
function aggregateData(rawData) {

    let dbEntryCount = {}

    // Update count for unique DB key, cycling through all the entries
    rawData.map((entry) => {
        let dbNames = Object.keys(entry["metadata"]["member_databases"])
        dbNames.map((db) => {
            db = db.toUpperCase()
            db in dbEntryCount ? dbEntryCount[db] = dbEntryCount[db] + 1 : dbEntryCount[db] = 1
        })  
    })

    // Transform the dictionary in a list of dictionaries to match Vega's input format
    let dbEntryCountList = []
    Object.keys(dbEntryCount).map((key) => {
        dbEntryCountList.push({"db": key, "count": dbEntryCount[key]})
    });

    // Sort based on count
    dbEntryCountList.sort(compareCount)

    return dbEntryCountList
}


// Vega specifications to produce the plot
function createChartSpecs(aggregatedData) {

    const axisProps = {
        "sort": false, 
        "axis": {
            "titleFont": "IBM Plex Sans", 
            "titleFontSize": 16, 
            "labelAngle": "0", 
            "labelFontSize": 14,
            "labelFont": "IBM Plex Sans",
            "titlePadding": 15,
            "labelAngle": -30
        }
    }

    let chartSpecs = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "",
        "data": {
          "values": aggregatedData
        },
        "mark": {"type": "bar", "cornerRadiusEnd": 4},
        "encoding": {
          "x": Object.assign({"field": "db", "title": "DB"}, axisProps),
          "y": Object.assign({"field": "count", "title": "#", "type": "quantitative"}, axisProps),
          "tooltip": {"field": "count", "type": "quantitative"}
        },
        "width": "container",
        "height": 500,
    }

    return chartSpecs
}

export default function ChartAggregator({interProData}) {

    useEffect(() => {
        const aggregatedData = aggregateData(interProData)
        vegaEmbed('#chart', createChartSpecs(aggregatedData), {"actions": false, "container": "#chart"}).catch(console.error);
      }, []);

    return (
        <div>
            <div id = "chart">
            </div>
        </div>
    );
  }
