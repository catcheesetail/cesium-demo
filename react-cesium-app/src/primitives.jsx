import React, { useEffect, useRef } from 'react';
import * as Cesium from 'cesium/Cesium';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiOWY2ZmExNC03YjkyLTRmYTMtODI2MS1jMDhjYjgyYzgwZDQiLCJpZCI6MTU2ODU3LCJpYXQiOjE2OTA0NjQ5MzV9.rkvMEdNWZfQrSH6KLZIiK2THO4OmNmG6XicpE3goWoo';

const Cesium3DTilesetComponent = ({ tilesetUrl = 'http://localhost:3001/jlhb/3dtiles/tileset.json' }) => {
  let viewerRef = useRef();
  useEffect(() => {
    Cesium.Ion.defaultAccessToken = token;

    addModel();
    // 清理函数
    return () => {
      viewerRef?.destroy();
    };
  }, []);

  const addModel = async () => {
    viewerRef = new Cesium.Viewer("cesiumContainer", {
      terrain: Cesium.Terrain.fromWorldTerrain(),
      // infobox: false
    });
    try {
      // A normal b3dm tileset containing photogrammetry
      const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2082198);
      viewerRef?.scene.primitives.add(tileset);
      viewerRef?.zoomTo(tileset);
    } catch (error) {
      console.log(`Error loading tileset: ${error}`);
    }
  }

  return (
    <div id="cesiumContainer" style={{ width: '100%', height: '500px' }}></div>
  );
};

export default Cesium3DTilesetComponent;
