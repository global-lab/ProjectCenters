import React, {Component, Fragment, useState} from 'react';
import {Map, Marker, TileLayer, Popup} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';
import WPI from './images/WPI_Inst.png'
import WPISmall from './images/WPI_Small.png'
import text from './images/text.png';
import {FaMapMarkedAlt, FaExternalLinkAlt} from "react-icons/fa";

import projectCenters from "./Components/IQPLocations";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


export default class App extends Component{
    handleClick = (link) => (e) => {
        if (link === ""){
        }
        else {
            window.open(link, "_blank");
        }
    }

    handleExternalClick = () => {
        window.open('https://global-lab.github.io/ProjectCenters/', '_blank')
    }

  render() {
    return (
        <Fragment>
            <div className="Header">
                <img src={text} alt="WIN"/>
            </div>
            <div className="WinLogo">
                <img src={WPI} alt="WIN"/>
            </div>
            <div className="WPISmall">
                <img src={WPISmall} alt="WIN"/>
            </div>
            <div id="Externallink" onClick={this.handleExternalClick}>
                <FaExternalLinkAlt size={24}/>
            </div>

          <Map style={{ height: "100vh", width: "100%" }} className="mapStyle" center={[0, 0]} zoom={3}>
            <TileLayer
                attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
                url={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'}
            />
              {projectCenters.map((center, k) => {
                  let position = [center["coordinates"][0], center["coordinates"][1]]
                  return (
                      <Marker
                          key={k}
                          onMouseOver={(e) => {
                              e.target.openPopup();
                          }}
                          onMouseOut={(e) => {
                              e.target.closePopup();
                          }}
                          onClick={this.handleClick(center.link)}
                          position={position}
                      >
                          <Popup> {center.name} </Popup>
                      </Marker>
                  )
              })
              }
          </Map>
        </Fragment>
    )
  }

}
