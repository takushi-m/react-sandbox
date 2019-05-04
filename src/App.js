import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import GoogleMapReact from 'google-map-react';

const key = 'your keys';

class App extends Component {
  static defaultProps = {
    center: {
      lat: 35.6888174,
      lng: 139.7007254
    },
    zoom: 17
  };

  render() {
    return (
      <div style={{height: '100vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </div>
    )
  }
}

export default App;
