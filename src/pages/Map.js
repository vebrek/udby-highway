import React, { useEffect, useState } from "react";
import DeckGL, { MapController } from "deck.gl";
import { renderLayers } from "../components/RenderLayers";
const Papa = require('papaparse');

const MapPage = () => { 
  const [data, setData] = useState({});

  React.useEffect(() => {
    Papa.parse('../45784.csv', {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function(results) {
          const points = results.data.map(function (d) {
            return { 
              type: 'Feature',
              properties: {
                itemId: d.seq,
              },
              geometry: {
                type: 'Point',
                "coordinates": [
                  d.longitude,
                  d.latitude,
                ]
              },
              weight: d.age
            };
          });
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
    minZoom: 2,
    maxZoom: 16,
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
        getTooltip={({object}) => object && `${object.name}\n${object.address}`}
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