import React, { useEffect, useState } from "react";
import DeckGL, { MapController } from "deck.gl";
import { renderLayers } from "../components/RenderLayers";
const Papa = require('papaparse');

// import { csv } from "d3-fetch";
// const DATA_URL = "./heatmap-data.csv";


const MapPage = ({viewState}) => { 
  const [data, setData] = useState({});

  //loadfdata
  useEffect(() => {
    /*
    const fetchData = async () => {
      // const result = await csv(DATA_URL);
      const points = result.map(function (d) {
        return { position: [+d.lng, +d.lat] };
      });
      setData(points);
    };

    fetchData();
    */
  }, []);

  React.useEffect(() => {
    Papa.parse('../45784.csv', {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function(results) {
          // setData(results.data);
          const points = results.data.map(function (d) {
            return { position: [+d.longitude, +d.latitude] };
          });
          console.log(points)
          setData(points);
        }
      });
  }, [])

  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    longitude: -3.2943888952729092,
    latitude: 53.63605986631115,
    zoom: 6,
    maxZoom: 16,
    // pitch: 65,
    bearing: 0
  });

  //resize
  useEffect(() => {
    const handleResize = () => {
      setViewport((v) => {
        return {
          ...v,
          width: window.innerWidth,
          height: window.innerHeight
        };
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App">
      <DeckGL
        layers={renderLayers({
          data: data
        })}
        controller={{ type: MapController, dragRotate: false }}
        initialViewState={viewport}
      />
      <div className="attribution">
        <a
          href="http://www.openstreetmap.org/about/"
          target="_blank"
          rel="noopener noreferrer"
        >
          © OpenStreetMap
        </a>
      </div>
    </div>
  );   
};
  
  
  export default MapPage;