import React, { useEffect, useRef, useState } from 'react';
import * as Cesium from 'cesium/Cesium';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiOWY2ZmExNC03YjkyLTRmYTMtODI2MS1jMDhjYjgyYzgwZDQiLCJpZCI6MTU2ODU3LCJpYXQiOjE2OTA0NjQ5MzV9.rkvMEdNWZfQrSH6KLZIiK2THO4OmNmG6XicpE3goWoo';

const prefixUrl = "http://localhost:3002/安信厂区分层3Dtiles以及分层GLTF/安信厂区分层Dtiles";
const ModelList={
  1:'',
  2:'',
  3:'',
  4:'',
  5:''
}

let viewerRef=null;
const ClassifyCesium3DTilesetComponent = () => {
  // let viewerRef = useRef();
  let tileset2 = useRef();
  let tileset3 = useRef();
  let tileset4 = useRef();
  let tileset5 = useRef();
  let tileset6 = useRef();
  let tileset7 = useRef();
  let tileset8 = useRef();
  let tileset9 = useRef();
  let tileset10 = useRef();
  let tileset11 = useRef();
  let tileset12 = useRef();
  const [showClassfy, setShowClassfy] = useState(false);

  useEffect(() => {
    Cesium.Ion.defaultAccessToken = token;

    init();

    // 清理函数
    return () => {
      viewerRef?.destroy();
    };
  }, []);


  const addEvent = () => {
    var handler = new Cesium.ScreenSpaceEventHandler(viewerRef.scene.canvas);
    handler.setInputAction((ev) => {
      // 获取当前坐标系标准
      let ellipsoid = viewerRef.scene.globe.ellipsoid;
      let feature = viewerRef.scene.pick(ev.position);
      //通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标
      let cartesian = viewerRef.camera.pickEllipsoid(ev.position, ellipsoid);
      if (cartesian) {
        //将笛卡尔坐标转换为地理坐标
        let cartographic = ellipsoid.cartesianToCartographic(cartesian);
        // console.log(cartographic)
        //将弧度转为度的十进制度表示
        const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
        const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
        // 获取相机的 Cartographic 的高度以米表示, 相机高度
        let alti_String = (viewerRef.camera.positionCartographic.height / 100).toFixed(2);
        console.log(longitudeString, latitudeString, alti_String);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  const init = async () => {
    viewerRef = new Cesium.Viewer("cesiumContainer", {
      // terrain: Cesium.Terrain.fromWorldTerrain(),
      // infobox: false
    });
    console.log(Cesium, Cesium.Viewer)
    addEvent();
    
    const url2 = `${prefixUrl}/100车间06厂/tileset.json`;
    tileset2 = await Cesium.Cesium3DTileset.fromUrl(url2);
    viewerRef.scene.primitives.add(tileset2);

    const url3 = `${prefixUrl}/100车间11厂/tileset.json`;
    tileset3 = await Cesium.Cesium3DTileset.fromUrl(url3);
    viewerRef.scene.primitives.add(tileset3);

    const url4 = `${prefixUrl}/100车间20厂/tileset.json`;
    tileset4 = await Cesium.Cesium3DTileset.fromUrl(url4);
    viewerRef.scene.primitives.add(tileset4);

    const url5 = `${prefixUrl}/200车间/tileset.json`;
    tileset5 = await Cesium.Cesium3DTileset.fromUrl(url5);
    viewerRef.scene.primitives.add(tileset5);

    const url6 = `${prefixUrl}/300车间/tileset.json`;
    tileset6 = await Cesium.Cesium3DTileset.fromUrl(url6);
    viewerRef.scene.primitives.add(tileset6);

    const url7 = `${prefixUrl}/400车间401工段/tileset.json`;
    tileset7 = await Cesium.Cesium3DTileset.fromUrl(url7);
    viewerRef.scene.primitives.add(tileset7);

    const url8 = `${prefixUrl}/400车间402工段/tileset.json`;
    tileset8 = await Cesium.Cesium3DTileset.fromUrl(url8);
    viewerRef.scene.primitives.add(tileset8);

    const url9 = `${prefixUrl}/404工段常压小工段/tileset.json`;
    tileset9 = await Cesium.Cesium3DTileset.fromUrl(url9);
    viewerRef.scene.primitives.add(tileset9);

    const url10 = `${prefixUrl}/404工段氢溴酸小工段/tileset.json`;
    tileset10 = await Cesium.Cesium3DTileset.fromUrl(url10);
    viewerRef.scene.primitives.add(tileset10);

    // const url11 = `${prefixUrl}/404工段精馏小工段/tileset.json`;
    // tileset10 = await Cesium.Cesium3DTileset.fromUrl(url11);
    // viewerRef.scene.primitives.add(tileset11);

    const url12 = `${prefixUrl}/厂区地形2/tileset.json`;
    tileset12 = await Cesium.Cesium3DTileset.fromUrl(url12);
    viewerRef.scene.primitives.add(tileset12);
    // Set the camera to view the newly added tileset
    viewerRef.camera.viewBoundingSphere(tileset12.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
  }

  const tileset2Fn = () => {
    tileset2.show = false;
    const position = Cesium.Cartesian3.fromDegrees(117.22941990841197, 36.744506889528004, 3.26);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(
      Cesium.Math.toRadians(90),
      Cesium.Math.toRadians(0),
      Cesium.Math.toRadians(0)
    ));
    // 加载 glTF 模型
    const modelEntity = viewerRef?.entities?.add({
      name: '100车间06厂',
      position: position,
      orientation,
      model: {
        uri: 'http://localhost:3002/安信厂区分层3Dtiles以及分层GLTF/安信厂区分层Dtiles/100车间06厂/tileset.gltf', // glTF 模型的路径
        // minimumPixelSize: 100, // 控制模型在屏幕上的最小显示大小
      },
    });
    viewerRef?.zoomTo(modelEntity)
  }

  const tileset3Fn = () => {
    tileset3.show = false;
    const position = Cesium.Cartesian3.fromDegrees(117.22941990841197, 36.744506889528004, 3.26);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(
      Cesium.Math.toRadians(90),
      Cesium.Math.toRadians(0),
      Cesium.Math.toRadians(0)
    ));
    // 加载 glTF 模型
    const modelEntity = viewerRef.entities.add({
      name: '100车间11厂',
      position: position,
      orientation,
      model: {
        uri: 'http://localhost:3002/安信厂区分层3Dtiles以及分层GLTF/安信厂区分层Dtiles/100车间11厂/tileset.gltf', // glTF 模型的路径
        // minimumPixelSize: 100, // 控制模型在屏幕上的最小显示大小
      },
    });
    viewerRef.zoomTo(modelEntity)
  }

  const tileset4Fn = () => {
    tileset3.show = false;
    const position = Cesium.Cartesian3.fromDegrees(117.22941990841197, 36.744506889528004, 3.26);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(
      Cesium.Math.toRadians(90),
      Cesium.Math.toRadians(0),
      Cesium.Math.toRadians(0)
    ));
    // 加载 glTF 模型
    const modelEntity = viewerRef.entities.add({
      name: '100车间20厂',
      position: position,
      orientation,
      model: {
        uri: 'http://localhost:3002/安信厂区分层3Dtiles以及分层GLTF/安信厂区分层Dtiles/100车间20厂/tileset.gltf', // glTF 模型的路径
        // minimumPixelSize: 100, // 控制模型在屏幕上的最小显示大小
      },
    });
    viewerRef.zoomTo(modelEntity)
  }

  const tileset5Fn = () => {
    tileset5.show = false;
    const position = Cesium.Cartesian3.fromDegrees(117.22942465486587, 36.74658395402344, 1.27);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, new Cesium.HeadingPitchRoll(
      Cesium.Math.toRadians(90),
      Cesium.Math.toRadians(0),
      Cesium.Math.toRadians(0)
    ));

    // 加载 glTF 模型
    const modelEntity = viewerRef?.entities?.add({
      name: '200车间',
      position: position,
      orientation,
      model: {
        uri: 'http://localhost:3002/安信厂区分层3Dtiles以及分层GLTF/安信厂区分层Dtiles/200车间/tileset.gltf', // glTF 模型的路径
        // minimumPixelSize: 100, // 控制模型在屏幕上的最小显示大小
      },
    });
    viewerRef?.zoomTo(modelEntity)
  }

  return (
    <div>
      <button onClick={() => {
        setShowClassfy(true)
      }}>
        分层
      </button>
      {showClassfy && <>
        <button onClick={() => {
          tileset2Fn();
        }}>100车间06厂 分层</button>
        <button onClick={() => {
          tileset3Fn();
        }}>100车间11厂</button>
        <button onClick={() => {
          tileset4Fn();
        }}>100车间20厂</button>
        <button onClick={() => {
          setTimeout(()=>{
            tileset5Fn();
          },100)
        }}>200车间</button>
        <button onClick={() => {
          tileset12.show = false;
        }}>厂区地形2</button>
      </>}
      <div id="cesiumContainer" style={{ width: '100%', height: '100%' }}></div>
    </div>

  );
};

export default ClassifyCesium3DTilesetComponent;
