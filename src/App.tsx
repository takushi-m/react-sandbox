import React from 'react';
import './App.css';

import GoogleMapBlock from './google-map-block'
const GOOGLE_MAPS_API_KEY = 'your key'

class MyMarker extends React.Component {
  render() {
    return (
      <div><span>my marker</span></div>
    )
  }
}

interface IItem {
  lat: number;
  lng: number;
}

interface IAppState {
  map: {
    center: any,
    zoom: number
  };
  itemList: IItem[]
}

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      map: {
        center: {
          lat: 35.688817,
          lng: 139.70182
        },
        zoom: 17
      },
      itemList: [
        {lat: 35.689913, lng:139.70182},
        {lat: 35.689737, lng:139.70039}
      ]
    };
  }
  render() {
    return (
      <div>
        <GoogleMapBlock
          apikey={GOOGLE_MAPS_API_KEY}
          center={this.state.map.center}
          zoom={this.state.map.zoom}
          markers={this.state.itemList}
          Marker={MyMarker}
        />
      </div>
    );
  }
}

export default App;
