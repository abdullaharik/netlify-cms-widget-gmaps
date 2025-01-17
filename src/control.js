import React from 'react'
import Geosuggest from 'react-geosuggest'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'


export default class Control extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      defaultCenter: { lat: 37.857913, lng: 27.261015 },
      selected: {
        latitude: null,
        longitude: null
      }
    }
  }

  onSuggestSelect = (place) => {
    const {
      location: { lat, lng }
    } = place

    const { latitude, longitude } = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lng)
    }

    this.setState({
      selected: {
        latitude,
        longitude
      }
    })

    this.props.onChange({ latitude, longitude })
  }

  onSelectMarker = (mark) => {
    const { latitude, longitude } = {
      latitude: parseFloat(mark.latLng.lat()),
      longitude: parseFloat(mark.latLng.lng())
    }

    this.setState({
      selected: {
        latitude,
        longitude
      }
    })

    this.props.onChange({
      latitude,
      longitude
    })
  }

  render() {
    const {
      forID,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle,
      onChange
    } = this.props

    return (
      <div
        id={forID}
        className={classNameWrapper}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
      >
          <Geosuggest
            placeholder="Start typing!"
            location={new google.maps.LatLng(53.558572, 9.9278215)}
            onSuggestSelect={this.onSuggestSelect}
            radius={20}
          />

          <GoogleMaps
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            defaultCenter={
              this.state.defaultCenter
                ? this.state.defaultCenter
                : gooogleDefaultCenter
            }
            lat={this.state.selected.latitude}
            lng={this.state.selected.longitude}
            onClick={this.onSelectMarker}
            draggable={true}
          />
      </div>
    )
  }
}

const GoogleMaps = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={props.defaultCenter}
    center={
      (props.lat && props.lng && { lat: props.lat, lng: props.lng }) ||
      props.defaultCenter
    }
    onClick={props.onClick}
  >
    {props.lat && props.lng && <Marker position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
))
