import React from "react";
import GoogleMapReact from "google-map-react";
import { BiMap } from "react-icons/bi";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function GoogleMap() {
  const defaultProps = {
    center: {
      lat: 22.701002,
      lng: 90.353455,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div className="col-9 border border-dark rounded p-3">
      <div className="row justify-content-center">
        <center>
          <h3>
            {" "}
            <BiMap></BiMap> Map
          </h3>
        </center>
        <hr></hr>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBJCcZbruBF5dhI76rhnn3jQCaPbLI23hE",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}
