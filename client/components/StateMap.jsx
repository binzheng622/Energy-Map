import React from 'react';
import { useDispatch } from 'react-redux';
import { updateHover } from '../reducers/stateReducer.js';
import { MapContainer, Polygon } from 'react-leaflet';
import StateCoordinate from '../assets/stateCoordinates.js';
import 'leaflet/dist/leaflet.css';

const StateMap = () => {
  const dispatch = useDispatch();

  const fetchData = (state) => {
    fetch(`/data/${state}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(updateHover(data));
      })
      .catch((error) => console.log(error));
  };

  return (
    <MapContainer
      center={[40.63463151377654, -97.89969605983609]}
      zoom={4}
      style={{
        width: '70%',
        height: '50vh',
        borderRadius: '1em',
      }}
      attributionControl={false}
    >
      {StateCoordinate.features.map((state) => {
        const coordinates = state.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ]);

        return (
          <Polygon
            pathOptions={{
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              color: 'white',
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 5,
                  color: '#666',
                });
                fetchData(state.properties.name);
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillColor: '#FD8D3C',
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: 'white',
                });
              },
            }}
          ></Polygon>
        );
      })}
    </MapContainer>
  );
};

export default StateMap;
