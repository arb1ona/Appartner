/*global google*/
import React from "react";
import PropTypes from "prop-types";
import mapStyles from "./mapStyles";
import { ButtonCheckMore } from "../ButtonCheckMore";
const MapCard = (picture, onClick) => {
  return (
    <div>
      <img style={{ width: "13rem", height: "10rem" }} src={picture} />
      <br />
      <ButtonCheckMore onClick={onClick} />
    </div>
  );
};
class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      isModalShown: false,
    };
  }
  //use componentWillReceiveProps instead of componentDidUpdate
  componentWillReceiveProps(nextProps) {
    const { activeProperty } = nextProps;
    const { index } = activeProperty;

    this.hideAll();

    this.showInfoWindow(index);
  }
  // https://facebook.github.io/react/docs/
  // https://cdnjs.com/libraries/react/

  showInfoWindow(index) {
    const { markers } = this.state;
    markers[index] && markers[index].infoWindow.open(this.map, markers[index]);
  }

  hideAll() {
    const { markers } = this.state;
    markers.forEach((marker) => {
      marker.infoWindow.close();
    });
  }
  // close() {
  //   const { markers } = this.state;
  //   markers.forEach(marker => {
  //     marker.infoWindow.close();
  //   })
  // }
  handleModalOpen() {
    this.setState({ isModalShown: true });
  }
  handleModalOpen() {
    this.setState({ isModalShown: false });
  }
  componentDidMount() {
    const { properties, activeProperty, options } = this.props;
    const { latitude, longitude } = activeProperty;

    this.map = new google.maps.Map(this.map, {
      options: {
        disableDefaultUI: true,
        zoomControl: true,
        styles: mapStyles,
      },
      center: { lat: latitude, lng: longitude },
      mapTypeControl: true,
      zoom: 14,
    });

    this.createMarkers(properties);
  }

  createMarkers(properties) {
    const { markers } = this.state;
    const { setActiveProperty, activeProperty } = this.props;
    const activePropertyIndex = activeProperty.index;

    properties.map((property) => {
      const { address, index, latitude, longitude, city, picture } = property;
      this.marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: this.map,
        icon: {
          url: "https://svgshare.com/i/QBj.svg",
          scaledSize: new google.maps.Size(50, 40),
          origin: new google.maps.Point(0, 0),
        },
        animation: google.maps.Animation.DROP,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: <MapCard picture={picture} onClick={this.handleModalOpen} />,
      });

      this.marker.infoWindow = infoWindow;

      this.marker.addListener(
        "click",
        function () {
          //hide all other info windows on click
          this.hideAll();
          // set active property ono the state
          setActiveProperty(property, true);
        }.bind(this)
      ); // important to bind this

      // push this marker to the markers array on the state
      markers.push(this.marker);

      //show active property info window
      // this.showInfoWindow(activePropertyIndex);
    });
  }

  render() {
    return (
      <div className="mapContainer">
        <div id="map" ref={(el) => (this.map = el)}></div>
      </div>
    );
  }
}

GoogleMap.propTypes = {
  properties: PropTypes.array.isRequired,
  activeProperty: PropTypes.object.isRequired,
  setActiveProperty: PropTypes.func.isRequired,
};

export default GoogleMap;
