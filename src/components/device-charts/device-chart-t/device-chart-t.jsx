import React, { useState, useEffect } from 'react';

import CanvasJSReact from '../../../assets/canvasjs.react';
import Spinner from "../../spinner/spinner";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJSReact.CanvasJS.addCultureInfo("ru",
  {
    months: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]
  });

const DeviceChartT = ({ loading, responseData, baseOptions, timeZone }) => {
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
      // type: "stepLine",
      type: "column",
      color: '#FBC4B8',
      // fillOpacity: .2,
      lineColor: '#FBC4B8',
      lineThickness: 1,
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

export default DeviceChartT;
