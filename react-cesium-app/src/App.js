import React, { Component } from 'react';
import * as Cesium  from "cesium/Cesium";
 
class App extends Component {
  componentDidMount() {
		const viewer = new Cesium.Viewer("cesiumContainer");
	}
  render() {
    return (
      <div id="cesiumContainer" />
    );
  }
}
export default App;
