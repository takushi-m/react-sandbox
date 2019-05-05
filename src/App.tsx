import React from 'react';
import './App.css';

import GoogleMapBlock from './google-map-block'
const GOOGLE_MAPS_API_KEY = 'your key'

interface IMyMarkerProps {
  name: string;
}

class MyMarker extends React.Component<IMyMarkerProps> {
  render() {
    return (
      <div><span>{this.props.name}</span></div>
    )
  }
}

interface IItemPopup {
  name: string;
}

class ItemPopup extends React.Component<IItemPopup> {
  render() {
    return (
      <p style={{fontWeight: 'bold', fontSize: '20px'}}>{this.props.name}</p>
    )
  }
}

interface IItem {
  lat: number;
  lng: number;
  name: string;
  cnt: number;
}

interface IAppState {
  map: {
    center: any,
    zoom: number
  };
  itemList: IItem[];
  hoverIndex: number;
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
        {lat: 35.689913, lng:139.70182, name: 'hotel1', cnt: 0},
        {lat: 35.689737, lng:139.70039, name: 'hotel2', cnt: 0}
      ],
      hoverIndex: -1
    };

    this.onChildClick = this.onChildClick.bind(this);
    this.onMarkerHover = this.onMarkerHover.bind(this);
  }

  onChildClick(key: any, childProps: any) {
    let itemList = this.state.itemList;
    itemList[key].cnt += 1
    this.setState({
      itemList
    })
  }

  onMarkerHover(key: any, childProps: any) {
    this.setState({hoverIndex: key});
  }

  render() {
    return (
      <div style={{height: '500px', width: '500px'}}>
        <GoogleMapBlock
          apikey={GOOGLE_MAPS_API_KEY}
          center={this.state.map.center}
          zoom={this.state.map.zoom}
          markers={this.state.itemList}
          Marker={MyMarker}
          onChildClick={this.onChildClick}
          onMarkerHover={this.onMarkerHover}
        />
        <ul>
          {this.state.itemList.map((item) =>
            <li>{item.name}[{item.cnt}]</li>
          )}
        </ul>
        {this.state.hoverIndex>=0? <ItemPopup name={this.state.itemList[this.state.hoverIndex].name} />:null}
      </div>
    );
  }
}

export default App;
