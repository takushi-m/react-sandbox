import React from 'react';
import './App.css';

import GoogleMapReact from 'google-map-react'
const key: string = 'your key';

interface Iprops {
  center: any;
  zoom: number;
}
class App extends React.Component<Iprops> {
  render() {
    return (
      <div style={{height: '100vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: key}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default App;
