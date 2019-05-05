import React from 'react';
import './App.css';

import GoogleMapBlock from './google-map-block'
const GOOGLE_MAPS_API_KEY = 'your key'


interface IItem {
  lat: number;
  lng: number;
  name: string;
  cnt: number;
  Marker?: any;
  markerDesc?: any;
}

class MyMarker extends React.Component<IItem> {
  render() {
    return (
      <div><span>{this.props.name}</span></div>
    )
  }
}

class MyMarker2 extends React.Component<IItem> {
  render() {
    const style = {
      margin: '3px',
      fontSize: '20px',
      backgroundColor: 'black',
      color: 'white'
    }
    return (
      <div><span style={style}>{this.props.name}</span></div>
    )
  }
}

class ItemPopup extends React.Component<IItem> {
  render() {
    return (
      <p style={{fontWeight: 'bold', fontSize: '20px'}}>{this.props.name}</p>
    )
  }
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
        {lat: 35.689913, lng:139.70182, name: 'hotel1', cnt: 0, Marker: MyMarker2},
        {lat: 35.689737, lng:139.70039, name: 'hotel2', cnt: 0, markerDesc: {size: {width: 150, height: 150}}}
      ],
      hoverIndex: -1
    };

    this.onChildClick = this.onChildClick.bind(this);
    this.onMarkerHover = this.onMarkerHover.bind(this);
    this.search = this.search.bind(this);
  }

  search() {
    const item: IItem = {
      lat: this.state.map.center.lat + Math.random()/1000,
      lng: this.state.map.center.lng + Math.random()/1000,
      name: 'hotel'+(this.state.itemList.length+1),
      cnt: 0
    };
    let itemList = this.state.itemList;
    itemList.push(item);
    this.setState({
      itemList
    });
  }

  onChildClick(key: any, childProps: any) {
    let itemList = this.state.itemList;
    itemList[key].cnt += 1
    this.setState({
      itemList
    })
  }

  onMarkerHover(key: any, childProps: any) {
    this.setState({
      hoverIndex: key
    });
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
          {this.state.itemList.map((item, index) =>
            <li key={index}>{item.name}[{item.cnt}]</li>
          )}
        </ul>
        {this.state.hoverIndex>=0? <ItemPopup {...this.state.itemList[this.state.hoverIndex]} />:null}
        <button onClick={this.search}>追加</button>
      </div>
    );
  }
}

export default App;
