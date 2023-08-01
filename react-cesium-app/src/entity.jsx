import React, { Component } from 'react';
import * as Cesium from "cesium/Cesium";

class EntityDemo extends Component {
  viewer = null
  point = null
  line = null
  polygon = null
  componentDidMount() {
    this.viewer = new Cesium.Viewer("cesiumContainer");
    // 绘制点要素
    // 添加一个点要素
    this.point = this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883, 100000),
      point: {
        pixelSize: 10,
        color: Cesium.Color.RED
      }
    });

    // 添加一个线要素
    this.line = this.viewer.entities.add({
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
          -75.59777, 40.03883,
          -75.59877, 40.04883
        ]),
        width: 5,
        material: Cesium.Color.YELLOW
      }
    });
    // 添加一个面要素
    this.polygon = this.viewer.entities.add({
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          -74.59777, 40.03883,
          -74.59877, 40.04883,
          -74.58977, 40.04883
        ]),// 可以添加更多的点
        material: Cesium.Color.BLUE.withAlpha(0.5)
      }
    });
  }
  render() {
    return (
      <div >
        <div id="cesiumContainer" />
        <div style={{ position: 'fixed', right: 0, top: 0,display:'flex',width:'200px',justifyContent:'space-around' }}>
          <div style={{border:'1px solid blue'}} onClick={() => {
            this.viewer.zoomTo(this.point)
          }}> 点 </div>
          <div style={{border:'1px solid blue'}} onClick={() => {
            this.viewer.zoomTo(this.line)
          }}> 线 </div>
          <div style={{border:'1px solid blue'}} onClick={() => {
            this.viewer.zoomTo(this.polygon)
          }}> 面 </div>
        </div>
      </div>
    );
  }
}
export default EntityDemo;
