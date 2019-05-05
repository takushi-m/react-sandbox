import React from 'react'
import GoogleMapReact from 'google-map-react'

class Marker extends React.Component {
  render() {
    return (
      <div><span>test marker</span></div>
    )
  }
}

const MarkerDesc = {
  size: {width: 62, height: 60},
  origin: {x: 15 / 62, y: 1},
  withText: true
}

interface IGoogleMapBlockProps {
  apikey: string;
  center: any;
  zoom?: number;
  markers?: any[];
  markerDesc?: any;
  Marker?: any;

  onChildClick?: (key: any, childProps: any) => void
  onMarkerHover?: (key: any, childProps: any) => void
}

const DEFAULT_ZOOM = 17;

class GoogleMapBlock extends React.Component<IGoogleMapBlockProps> {
  _onChildClick = (key: any, childProps: any) => {
    if (this.props.onChildClick) {
      this.props.onChildClick(key, childProps);
    }
  }

  _onChildMouseEnter = (key: any, childProps: any) => {
    if (this.props.onMarkerHover) {
      this.props.onMarkerHover(key, childProps);
    }
  }

  _onChildMouseLeave = () => {
    if (this.props.onMarkerHover) {
      this.props.onMarkerHover(-1, {});
    }
  }

  render() {
    const Markers = this.props.markers &&
      this.props.markers.map((marker, index) =>
        React.createElement(
          marker.Marker || this.props.Marker || Marker,
          {
            key: index,
            ...marker,
            ...marker.markerDesc || this.props.markerDesc || MarkerDesc
          }
        )
      );
    return (
      <React.Fragment>
        <GoogleMapReact
          bootstrapURLKeys={{key: this.props.apikey}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom || DEFAULT_ZOOM}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
        >
          {Markers}
        </GoogleMapReact>
      </React.Fragment>
    );
  }
}

export default GoogleMapBlock;
