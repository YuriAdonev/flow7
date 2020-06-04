import React, { useState, useEffect } from 'react';

import CanvasJSReact from '../../../assets/canvasjs.react';
import Spinner from "../../spinner/spinner";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJSReact.CanvasJS.addCultureInfo("ru",
  {
    months: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]
  });

const DeviceChartAng = ({ loading, responseData, baseOptions, timeZone }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!responseData.attributes) {
      return;
    }
    const itemData = [];
    responseData.attributes.data.forEach(it => {
      itemData.push({
        x: new Date(it.at - timeZone),
        y: it.v
      })
    });
    setChartData(itemData);
  }, [responseData]);

  const options = {
    data: [{
      xValueFormatString: "HH:mm:ss",
      type: "stepLine",
      // type: "area",
      color: '#F9D30A',
      // fillOpacity: .2,
      lineColor: '#F9D30A',
      lineThickness: 2,
      markerType: "circle",
      markerSize: 0,
      dataPoints: chartData
    }]
  };

  return (
    <div className="device-details-history-item__chart">
      {loading ? <Spinner/> : <CanvasJSChart options = {{...baseOptions, ...options}}/>}
    </div>
  )
};

export default DeviceChartAng;
