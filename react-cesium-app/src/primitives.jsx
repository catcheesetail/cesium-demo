import React, { useEffect, useRef } from 'react';
import * as Cesium from 'cesium/Cesium';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiOWY2ZmExNC03YjkyLTRmYTMtODI2MS1jMDhjYjgyYzgwZDQiLCJpZCI6MTU2ODU3LCJpYXQiOjE2OTA0NjQ5MzV9.rkvMEdNWZfQrSH6KLZIiK2THO4OmNmG6XicpE3goWoo';

const Cesium3DTilesetComponent = () => {
  let viewerRef = useRef();
  let tileset2 = useRef();
  useEffect(() => {
    Cesium.Ion.defaultAccessToken = token;

    init();

    // 清理函数
    return () => {
      viewerRef?.destroy();
    };
  }, []);

  const init = async () => {
    viewerRef = new Cesium.Viewer("cesiumContainer", {
      // terrain: Cesium.Terrain.fromWorldTerrain(),
      // infobox: false
    });
    // try {
    //   const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2082198);
    //   viewerRef?.scene.primitives.add(tileset);
    //   viewerRef?.zoomTo(tileset);
    // } catch (error) {
    //   console.log(`Error loading tileset: ${error}`);
    // }

    // tileset2 = new Cesium.Cesium3DTileset({
    //   url: '/jlhb/3dtiles/tileset.json',
    // });

    const tileset2 = await Cesium.Cesium3DTileset.fromUrl("http://localhost:3000/jlhb/3dtiles/tileset.json");
    viewerRef.scene.primitives.add(tileset2);
    // Set the camera to view the newly added tileset
    viewerRef.camera.viewBoundingSphere(tileset2.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
  }

  return (
    <div>
      <div onClick={() => {
        viewerRef?.zoomTo(tileset2);
      }}>url model</div>
      <div id="cesiumContainer" style={{ width: '100%', height: '100%' }}></div>
    </div>

  );
};

export default Cesium3DTilesetComponent;
