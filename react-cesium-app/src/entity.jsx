import React, { Component } from 'react';
import * as Cesium from "cesium/Cesium";

class EntityDemo extends Component {
  viewer = null
  point = null
  line = null
  polygon = null
  componentDidMount() {
    this.viewer = new Cesium.Viewer("cesiumContainer");

    // Add an OpenStreetMaps layer
    // const imageryLayer = new Cesium.UrlTemplateImageryProvider({
    //   url: "https://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=28c739917d9fbe24ef611f24322a70fe"
    // });
    // this.viewer.scene.imageryLayers.add(imageryLayer);
    // // Add Cesium ion's default world imagery layer
    // const imageryLayer = Cesium.ImageryLayer.fromWorldImagery();
    // scene.imageryLayers.add(imageryLayer);
    // // Add a new transparent layer from Cesium ion
    // const imageryLayer = Cesium.ImageryLayer.fromProviderAsync(Cesium.IonImageryProvider.fromAssetId(3812));
    // imageryLayer.alpha = 0.5;
    // scene.imageryLayers.add(imageryLayer);

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

    /**添加事件 */
    this.addEvent();
    this.addLabel();
  }


  addEvent = () => {
    var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    handler.setInputAction((ev) => {
      alert('LEFT_CLICK')
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  /**添加文字 */
  addLabel = () => {
    var labels = this.viewer.scene.primitives.add(new Cesium.LabelCollection());
    var center = Cesium.Cartesian3.fromDegrees(-75.59777, 40.04883, 100000);
    labels.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(center);
    labels.add({
      position: new Cesium.Cartesian3(-75.59477, 40.05883, 100000),
      text: 'Center'
    });
  }
  render() {
    return (
      <div >
        <div id="cesiumContainer" />
        <div style={{ position: 'fixed', right: 0, top: 0, display: 'flex', width: '200px', justifyContent: 'space-around' }}>
          <div style={{ border: '1px solid blue' }} onClick={() => {
            this.viewer.zoomTo(this.point)
          }}> 点 </div>
          <div style={{ border: '1px solid blue' }} onClick={() => {
            this.viewer.zoomTo(this.line)
          }}> 线 </div>
          <div style={{ border: '1px solid blue' }} onClick={() => {
            this.viewer.zoomTo(this.polygon)
          }}> 面 </div>
        </div>
      </div>
    );
  }
}
export default EntityDemo;
