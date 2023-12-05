// 根据两个坐标点,获取Heading(朝向)

export function getHeading(pointA, pointB) {
  const lng_a = pointA.lng;
  const lat_a = pointA.lat;
  const lng_b = pointB.lng;
  const lat_b = pointB.lat;

  //以a点为原点建立局部坐标系（东方向为x轴,北方向为y轴,垂直于地面为z轴），得到一个局部坐标到世界坐标转换的变换矩阵
  var localToWorld_Matrix = Cesium.Transforms.eastNorthUpToFixedFrame(new Cesium.Cartesian3.fromDegrees(lng_a, lat_a));
  //求世界坐标到局部坐标的变换矩阵
  var worldToLocal_Matrix = Cesium.Matrix4.inverse(localToWorld_Matrix, new Cesium.Matrix4());
  //a点在局部坐标的位置，其实就是局部坐标原点
  var localPosition_A = Cesium.Matrix4.multiplyByPoint(worldToLocal_Matrix, new Cesium.Cartesian3.fromDegrees(lng_a, lat_a), new Cesium.Cartesian3());
  //B点在以A点为原点的局部的坐标位置
  var localPosition_B = Cesium.Matrix4.multiplyByPoint(worldToLocal_Matrix, new Cesium.Cartesian3.fromDegrees(lng_b, lat_b), new Cesium.Cartesian3());
  //弧度
  var angle = Math.atan2((localPosition_B.y - localPosition_A.y), (localPosition_B.x - localPosition_A.x))
  //角度
  var theta = angle * (180 / Math.PI);
  if (theta < 0) {
    theta = theta;
  }

  return theta;
}

//三维坐标转经纬度
export function getCoordByCartesian3(pos, viewer) {
  try {
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartesian3 = new Cesium.Cartesian3(pos.x, pos.y, pos.z);
    var cartographic = ellipsoid.cartesianToCartographic(cartesian3);
    var lat = Cesium.Math.toDegrees(cartographic.latitude);
    var lng = Cesium.Math.toDegrees(cartographic.longitude);

    return {
      lat: lat,
      lng: lng
    };
  } catch {
    return {
      lat: 0,
      lng: 0
    }
  }
}

/**
 * 创建cesium到容器中
 * 
 * @param {string} container 容器名称 #cesiumContainer
 * */
export function createCesiumToCntainer(container, timeLine = false, isWarGame = false) {
  let viewer;
  if (window.my_config.mapmode == 'online') {
    // var osm = new Cesium.OpenStreetMapImageryProvider({
    //   url: 'https://a.tile.openstreetmap.org/'
    // });
    // viewer = new Cesium.Viewer(container, {
    //   imageryProvider: osm,
    //   contextOptions: {
    //     webgl: {
    //       alpha: true,
    //       depth: true,
    //       stencil: true,
    //       antialias: true,
    //       premultipliedAlpha: true,
    //       preserveDrawingBuffer: true,
    //       failIfMajorPerformanceCaveat: true
    //     }
    //   },
    //   homeButton: false,
    //   selectionIndicator: true,
    //   animation: timeLine, //是否显示动画控件
    //   baseLayerPicker: false, //是否显示图层选择控件
    //   geocoder: false, //是否显示地名查找控件
    //   timeline: timeLine, //是否显示时间线控件
    //   sceneModePicker: false, //是否显示投影方式控件
    //   navigationHelpButton: false, //是否显示帮助信息控件
    //   infoBox: false, //是否显示点击要素之后显示的信息
    //   fullscreenButton: false,
    //   shouldAnimate: true, //动画播放
    //   is_terminateShape: false,
    // });
    //  加载google离线地图 end


    var globeProvider = new Cesium.UrlTemplateImageryProvider({
      url: `/mapFromG/globe/{z}/{x}/{y}.png`,
      maximumLevel: 6,
      subdomains: ["28", "29"],
    })

    viewer = new Cesium.Viewer(container, {
      imageryProvider: globeProvider,
      contextOptions: {
        webgl: {
          alpha: true,
          depth: true,
          stencil: true,
          antialias: true,
          premultipliedAlpha: true,
          //通过canvas.toDataURL()实现截图需要将该项设置为true
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: true
        }
      },
      selectionIndicator: true,
      homeButton: false,
      animation: timeLine, //是否显示动画控件
      baseLayerPicker: false, //是否显示图层选择控件
      geocoder: false, //是否显示地名查找控件
      timeline: timeLine, //是否显示时间线控件
      sceneModePicker: false, //是否显示投影方式控件
      navigationHelpButton: false, //是否显示帮助信息控件
      infoBox: false, //是否显示点击要素之后显示的信息
      fullscreenButton: false,
      shouldAnimate: true, //动画播放
    });

    if (isWarGame) {
      console.log("发生兵棋事件.....")
      // var wmtsImageryProvider1 = new Cesium.WebMapTileServiceImageryProvider({
      //   //图层名称，如：'tasmania'
      //   url: "/mapBqFromG/geoserver/smartcity/wms",
      //   layer: "smartcity:SWDTD_Group2020_New5",
      //   // layer: "smartcity:CZJMD_Group_2020_New1",
      //   // style: "",
      //   // format: "image/png",
      //   // tileMatrixSetID: "EPSG:4326",

      //   parameters: {
      //     service: 'WMS',
      //     transparent: true,
      //     format: "image/png",
      //     tileMatrixLabels: matrixIds,
      //     tilingScheme: new Cesium.GeographicTilingScheme({
      //       numberOfLevelZeroTilesX: 2,
      //       numberOfLevelZeroTilesY: 1,
      //     }),
      //   },
      //   subdomains: ['28', '29']

      // });
      // viewer.imageryLayers.addImageryProvider(
      //   new Cesium.WebMapServiceImageryProvider({
      //     url: "/mapBqFromG/smartcity/wms",
      //     // layers: "smartcity:SWDTD_Group2020_New5",
      //     layers: window.my_config.selectLayers,
      //     parameters: {
      //       service: 'WMS',
      //       transparent: true,
      //       format: "image/png",
      //       // tileMatrixLabels: matrixIds,
      //       // tilingScheme: new Cesium.GeographicTilingScheme({
      //       //   numberOfLevelZeroTilesX: 2,
      //       //   numberOfLevelZeroTilesY: 1,
      //       // }),
      //     },
      //     subdomains: ['28', '29']
      //   })
      // )
      // setTimeout(() => {
      //   viewer.imageryLayers.addImageryProvider(wmtsImageryProvider1);
      // }, 100)


    } else { // 正常内容

    }

  } else if (window.my_config.mapmode.match(/offline/g) != -1) {
    // 加载google离线地图 start
    var matrixIds = [
      "EPSG:4326:0",
      "EPSG:4326:1",
      "EPSG:4326:2",
      "EPSG:4326:3",
      "EPSG:4326:4",
      "EPSG:4326:5",
      "EPSG:4326:6",
      "EPSG:4326:7",
      "EPSG:4326:8",
      "EPSG:4326:9",
      "EPSG:4326:10",
      "EPSG:4326:11",
      "EPSG:4326:12",
      "EPSG:4326:13",
      "EPSG:4326:14",
      "EPSG:4326:15",
      "EPSG:4326:16",
      "EPSG:4326:17",
      "EPSG:4326:18",
      "EPSG:4326:19",
      "EPSG:4326:20",
      "EPSG:4326:21",
    ];
    let _url =
      window.my_config.mapmode == "offline" ?
      `${window.my_config.baseUrl}/geoserver/gwc/service/wmts` : //offline 
      "/mapFromG/geoserver/gwc/service/wmts"; //offline_dev
    // window.my_config.mapmode == "offline" ?
    // `${window.my_config.baseUrl}/geoserver/gwc/service/wmts` : //offline 
    // "http://localhost:8080/geoserver/gwc/service/wmts";  //offline_dev
    var wmtsImageryProvider =
      new Cesium.WebMapTileServiceImageryProvider({
        url: _url, //服务地址，如：'http://10.1.18.156:8080/geoserver/gwc/service/wmts'
        layer: "smartcity:Google_Map", //图层名称，如：'tasmania' GYTD_Group2020_New1
        // layer: "smartcity:bingqi11", //图层名称，如：'tasmania' GYTD_Group2020_New1
        style: "",
        format: "image/png",
        tileMatrixSetID: "EPSG:4326",
        tileMatrixLabels: matrixIds,
        tilingScheme: new Cesium.GeographicTilingScheme({
          //此处很重要，很重要。。。
          numberOfLevelZeroTilesX: 2,
          numberOfLevelZeroTilesY: 1,
        }),
      });
    viewer = new Cesium.Viewer(container, {
      imageryProvider: wmtsImageryProvider,
      contextOptions: {
        webgl: {
          alpha: true,
          depth: true,
          stencil: true,
          antialias: true,
          premultipliedAlpha: true,
          //通过canvas.toDataURL()实现截图需要将该项设置为true
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: true
        }
      },
      selectionIndicator: true,
      homeButton: false,
      animation: timeLine, //是否显示动画控件
      baseLayerPicker: false, //是否显示图层选择控件
      geocoder: false, //是否显示地名查找控件
      timeline: timeLine, //是否显示时间线控件
      sceneModePicker: false, //是否显示投影方式控件
      navigationHelpButton: false, //是否显示帮助信息控件
      infoBox: false, //是否显示点击要素之后显示的信息
      fullscreenButton: false,
      shouldAnimate: true, //动画播放
    })

    // var stages = viewer.scene.postProcessStages;
    // viewer.scene.brightness = viewer.scene.brightness || stages.add(Cesium.PostProcessStageLibrary.createBrightnessStage());
    // viewer.scene.brightness.enabled = true;
    // viewer.scene.brightness.uniforms.brightness = Number(1);
    try {
      // viewer.imageryLayers.addImageryProvider(
      //   new Cesium.WebMapTileServiceImageryProvider({
      //     url: _url, //服务地址，如：'http://10.1.18.156:8080/geoserver/gwc/service/wmts'
      //     layer: "smartcity:bingqi13", //图层名称，如：'tasmania' GYTD_Group2020_New1
      //     style: "",
      //     format: "image/png",
      //     tileMatrixSetID: "EPSG:4326",
      //     tileMatrixLabels: matrixIds,
      //     tilingScheme: new Cesium.GeographicTilingScheme({
      //       //此处很重要，很重要。。。
      //       numberOfLevelZeroTilesX: 2,
      //       numberOfLevelZeroTilesY: 1,
      //     }),
      //   })
      // )  

      // viewer.imageryLayers.addImageryProvider(
      //   new Cesium.WebMapTileServiceImageryProvider({
      //     url: _url, //服务地址，如：'http://10.1.18.156:8080/geoserver/gwc/service/wmts'
      //     layer: "smartcity:bingqi08_11_14", //图层名称，如：'tasmania' GYTD_Group2020_New1
      //     style: "",
      //     format: "image/png",
      //     tileMatrixSetID: "EPSG:4326",
      //     tileMatrixLabels: matrixIds,
      //     tilingScheme: new Cesium.GeographicTilingScheme({
      //       //此处很重要，很重要。。。
      //       numberOfLevelZeroTilesX: 2,
      //       numberOfLevelZeroTilesY: 1,
      //     }),
      //   })
      // )  //bingqi08_11_14
    } catch (error) {

    }

    //加载google离线地图 end
    // var globeProvider = new Cesium.UrlTemplateImageryProvider({
    //   url: `/mapFromG/globe/{z}/{x}/{y}.png`,
    //    maximumLevel: 6,
    //   subdomains: ["28", "29"],
    // })
    // globeProvider.readyPromise.then((status) => {
    //   if (status) {
    //     viewer = new Cesium.Viewer(container, {
    //       imageryProvider: globeProvider,
    //       contextOptions: {
    //         webgl: {
    //           alpha: true,
    //           depth: true,
    //           stencil: true,
    //           antialias: true,
    //           premultipliedAlpha: true,
    //           //通过canvas.toDataURL()实现截图需要将该项设置为true
    //           preserveDrawingBuffer: true,
    //           failIfMajorPerformanceCaveat: true
    //         }
    //       },
    //       selectionIndicator: true,
    //       homeButton: false,
    //       animation: timeLine, //是否显示动画控件
    //       baseLayerPicker: !0, //是否显示图层选择控件
    //       geocoder: false, //是否显示地名查找控件
    //       timeline: timeLine, //是否显示时间线控件
    //       sceneModePicker: false, //是否显示投影方式控件
    //       navigationHelpButton: false, //是否显示帮助信息控件
    //       infoBox: false, //是否显示点击要素之后显示的信息
    //       fullscreenButton: false,
    //       shouldAnimate: true, //动画播放
    //     });
    //   }
    // })



  };
  // 地形监测
  viewer.scene.globe.depthTestAgainstTerrain = false;
  // label清晰
  if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
    viewer.resolutionScale = window.devicePixelRatio;
  }
  // 清除默认双击事件
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(95.2122690747354, 11.630268806633334, 1200000)
    // destination: Cesium.Cartesian3.fromDegrees(114.3945285, 38.59025, 1000000)
  });
  // viewer.scene.screenSpaceCameraController.maximumZoomDistance = 320000000; //相机高度的最大值
  viewer.entities.removeAll();
  viewer.scene.fxaa = false;
  viewer.scene.postProcessStages.fxaa.enabled = false;
  viewer.scene.globe.maximumScreenSpaceError = 4 / 3;
  let layer0 = viewer.scene.imageryLayers.get(0);
  layer0.gamma = 1.1;
  viewer.scene.highDynamicRange = false;

  // if (isWarGame) {
  //   let _url =
  //     window.my_config.mapmode == "offline" ?
  //     `${window.my_config.baseUrl}/geoserver/gwc/service/wmts`
  //     // : "/mapBqFromG/geoserver/gwc/service/wmts";
  //     :
  //     "/mapFromG/geoserver/gwc/service/wmts";
  //   var wmtsImageryProvider1 = new Cesium.WebMapTileServiceImageryProvider({
  //     layer: "smartcity:SWDTD_Group2020_New5", //图层名称，如：'tasmania'
  //     url: _url,
  //     style: "",
  //     format: "image/png",
  //     tileMatrixSetID: "EPSG:4326",
  //     tileMatrixLabels: matrixIds,
  //     tilingScheme: new Cesium.GeographicTilingScheme({
  //       numberOfLevelZeroTilesX: 2,
  //       numberOfLevelZeroTilesY: 1,
  //     }),
  //   });
  //   viewer.scene.debugShowFramesPerSecond = true;
  //   viewer.imageryLayers.addImageryProvider(wmtsImageryProvider1);
  // }

  return viewer
}

/**
 * 通过code 去查询经纬度
 * 
 * @param {number} cur_hex
 * 
 * @returns {Array} [longitude,latitude]
 * 
 * */
// export function hex_to_coor(cur_hex, next_hex = null, percentage = 0){
//   let x_origin = 32743700
//   let y_origin = 8217969
//   // 计算除数和余数 y x 
//   // y, x = divmod(cur_hex, 100)
//   let y  = Math.floor(cur_hex/100)
//   let x = cur_hex % 100
//   let cur_x = 0
//   let cur_y = 0
//   if (next_hex){
//       let next_y = Math.floor(next_hex/100)
//       let next_x = next_hex % 100
//       // next_y, next_x = divmod(next_hex, 100)
//       if (next_x > x){
//           cur_x = x_origin + x * 200 + percentage * 200
//       }else if(next_x < x){
//           cur_x = x_origin + x * 200 - percentage * 200
//       }else{
//           cur_x = x_origin + x * 200
//       }

//       if (next_y > y){
//           cur_y = y_origin + y * 200 + percentage * 200
//       }else if(next_y < y){
//           cur_y = y_origin + y * 200 - percentage * 200
//       }else{
//           cur_y = y_origin + y * 200
//       }        
//   }else{
//       cur_x = x_origin + x * 200  //经度
//       cur_y = y_origin + y * 200   //纬度
//   }


//   function xy_to_coor(x, y){
//       let lonlat_coordinate = [] 
//       let L = 6381372 * Math.PI * 2
//       let W = L
//       let H = L / 2
//       let mill = 2.3
//       let lat = ((H / 2 - y) * 2 * mill) / (1.25 * H)
//           lat = ((Math.atan(Math.exp(lat)) - 0.25 * Math.PI) * 180) / (0.4 * Math.PI)
//       let lon = (x - W / 2) * 360 / W
//       // lonlat_coordinate.extend([round(lon, 7), round(lat, 7)])
//       lonlat_coordinate.push(lon.toFixed(7))
//       lonlat_coordinate.push(lat.toFixed(7))
//       return lonlat_coordinate
//   }
//   return xy_to_coor(cur_x, cur_y)
// }

export function hex_to_coor(code) {
  const mapPositon = [{
    startLongitude: 113.992317, // 经度
    startLatitude: 23.282504, // 纬度
    diffLongitude: 0.00179099999999721, // 经度
    diffLatitude: -0.00155099999999919, // 纬度
  }, ]


  let j = code % 100;
  let i = (code - j) / 100;

  let _tempPostion = []

  i % 2 == 0 ?
    _tempPostion.push(mapPositon[0].startLongitude + mapPositon[0].diffLongitude * j) :
    _tempPostion.push(mapPositon[0].startLongitude + mapPositon[0].diffLongitude * j + mapPositon[0].diffLongitude / 2)
  _tempPostion.push(mapPositon[0].startLatitude + mapPositon[0].diffLatitude * i)


  return _tempPostion

}


/**
 * 在cesium中绘制网格
 * */

export function DrawGrid(viewer) {

  var GridImagery = new Cesium.GridImageryProvider();
  var imageryLayers = viewer.imageryLayers;


  var GridImageryLayer = imageryLayers.addImageryProvider(GridImagery);



  function remove() {
    imageryLayers.remove(GridImageryLayer);
  }

  return remove
}

/**
 * 
 * 在cesium中添加比例尺
 */

export function scaleCesium(viewer) {
  viewer.extend(Cesium.viewerCesiumNavigationMixin, {
    enableCompass: false,
    enableDistanceLegend: true,
    enableZoomControls: false,
    enableCompassOuterRing: false
  })
}