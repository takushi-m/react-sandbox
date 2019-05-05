import React from 'react'
import GoogleMapReact from 'google-map-react'

class Marker extends React.Component {
  render() {
    return (
      <div><span style={{backgroundColor: 'white'}}>test</span></div>
    )
  }
}

const MarkerDesc = {
  size: {width: 62, height: 60},
  origin: {x: 15 / 62, y: 1},
  withText: true,
  // image: require('icons/map_icons/map_icon_text_red.svg')
  // imageClass: 'map_icon_text_red'
}

interface IGoogleMapBlockProps {
  apikey: string;
  center: any;
  zoom?: number;
  markers?: any[];
  markerDesc?: any;
  Marker?: any;
}

const DEFAULT_ZOOM = 17;

class GoogleMapBlock extends React.Component<IGoogleMapBlockProps> {
  render() {
    const Markers = this.props.markers &&
      this.props.markers.map((marker, index) =>
        React.createElement(
          this.props.Marker || Marker,
          {
            key: index,
            ...marker,
            ...this.props.markerDesc || MarkerDesc
          }
        )
      );
    return (
      <div style={{height: '500px', width: '500px'}}>
        <GoogleMapReact
          bootstrapURLKeys={{key: this.props.apikey}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom || DEFAULT_ZOOM}
        >
          {Markers}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMapBlock;
