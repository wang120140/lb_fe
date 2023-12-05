import {
  Cartesian3, EllipsoidGeodesic, Cartographic, sampleTerrainMostDetailed,
  Color, PolylineGlowMaterialProperty, PolylineOutlineMaterialProperty, ColorMaterialProperty, PolylineDashMaterialProperty
} from 'cesium/Source/Cesium';


/**
 * 计算两点之间距离
 * 如果带高程，计算的是空间距离
 * 不带高程，计算的是水平距离
 * @param {Cartesian3} start 开始
 * @param {Cartesian3} end 结束
 * @returns {Number} 长度，单位米
 */
export function distanceByCartesian3(start, end) {
  return Cartesian3.distance(start, end);
}
/**
 * 计算两点之间距离，经纬度坐标
 * 如果带高程，计算的是空间距离
 * 不带高程，计算的是水平距离
 * @param {Coordinate} start 开始
 * @param {Coordinate} end 结束
 * Coordinate: {longitude, latitude, height}
 * @returns {Number} 长度，单位米
 */
export function distanceByCoordinate(start, end) {
  return distanceByCartesian3(
    Cartesian3.fromDegrees(start.longitude, start.latitude, start.height || 0),
    Cartesian3.fromDegrees(end.longitude, end.latitude, start.height || 0)
  );
}

/**
 * 计算距离，经纬度坐标
 * 如果带高程，计算的是空间距离
 * 不带高程，计算的是水平距离
 * @param {Array{Coordinate}}} 坐标对象 
 * Coordinate: {longitude, latitude, height}
 * @returns {Number} 长度，单位米
 */
export function distanceByCoordinateArray(coordinates) {
  if (!(coordinates?.length)) {
    return 0;
  }
  let distance = 0;
  for (let i = 0, len = coordinates.length - 1; i < len; i++) {
    distance += distanceByCoordinate(coordinates[i], coordinates[i + 1]);
  }
  return distance;
}

/**
 * 计算距离，经纬度坐标
 * 如果带高程，计算的是空间距离
 * 不带高程，计算的是水平距离
 * @param {Array{Cartesian3}} 笛卡尔积数组
 * @returns {Number} 长度，单位米
 */
export function distanceByCartesian3Array(cartesian3) {
  if (!(cartesian3?.length)) {
    return 0;
  }
  let distance = 0;
  for (let i = 0, len = cartesian3.length - 1; i < len; i++) {
    distance += distanceByCartesian3(cartesian3[i], cartesian3[i + 1]);
  }
  return distance;
}


/**
 * 计算两点之椭球距离
 * @param {Cartographic} start 开始
 * @param {Cartographic} end 结束
 * @returns {Number} 长度，单位米
 */
export function EllipsoidDistanceByCartographic(start, end) {
  let geodesic = new EllipsoidGeodesic(start, end);
  return geodesic.surfaceDistance;
}

/**
 * 计算两点之椭球距离
 * @param {Cartesian3} start 开始
 * @param {Cartesian3} end 结束
 * @returns {Number} 长度，单位米
 */
export function EllipsoidDistanceByCartesian3(start, end) {
  // Cartesian3 转 Cartographic
  let s = Cartographic.fromCartesian(start);
  let e = Cartographic.fromCartesian(end);
  return EllipsoidDistanceByCartographic(s, e);
}
/**
 * 计算两点之椭球距离，经纬度坐标
 * @param {Coordinate} start 开始
 * @param {Coordinate} end 结束
 * Coordinate: {longitude, latitude, height}
 * @returns {Number} 长度，单位米
 */
export function EllipsoidDistanceByCoordinate(start, end) {
  // Cartesian3 转 Cartographic
  let s = Cartographic.fromDegrees(start.longitude, start.latitude, start.height);
  let e = Cartographic.fromDegrees(end.longitude, end.latitude, end.height);
  return EllipsoidDistanceByCartographic(s, e);
}


/**
 * 计算椭球距离
 * @param {Cartesian3} cartesian3 笛卡尔积数组
 * @returns {Number} 长度，单位米
 */
export function EllipsoidDistanceByCartesian3Array(cartesian3) {
  if (!(cartesian3?.length)) {
    return 0;
  }
  let distance = 0;
  for (let i = 0, len = cartesian3.length - 1; i < len; i++) {
    distance += EllipsoidDistanceByCartesian3(cartesian3[i], cartesian3[i + 1]);
  }
  return distance;
}

/**
 * 计算椭球距离
 * @param {Coordinate} coordinate 坐标数组
 * Coordinate: {longitude, latitude, height}
 * @returns {Number} 长度，单位米
 */
export function EllipsoidDistanceByCoordinateArray(coordinate) {
  if (!(coordinate?.length)) {
    return 0;
  }
  let distance = 0;
  for (let i = 0, len = coordinate.length - 1; i < len; i++) {
    distance += EllipsoidDistanceByCoordinate(coordinate[i], coordinate[i + 1]);
  }
  return distance;
}

/**
 * 计算椭球距离
 * @param {Cartographic} cartographic 坐标数组
 * Coordinate: {x, y, z}
 * @returns {Number} 长度，单位米
 */
export function EllipsoidDistanceByCartographicArray(cartographic) {
  if (!(cartographic?.length)) {
    return 0;
  }
  let distance = 0;
  for (let i = 0, len = cartographic.length - 1; i < len; i++) {
    distance += EllipsoidDistanceByCoordinate(cartographic[i], cartographic[i + 1]);
  }
  return distance;
}

/**
 * 计算地表距离
 * @param {TerrainProvider} terrainProvider 高程属性，一般采用 viewer.terrainProvider
 * @param {Cartesian3} startPosition 开始位置
 * @param {Cartesian3} endPosition  结束位置
 * @param {Number} resolvingPower  高程数据的分辨率，默认自动计算
 */
export function getSurfaceDistance(terrainProvider, startPosition, endPosition, resolvingPower) {
  let linearDistance = Cartesian3.distance(startPosition, endPosition);
  //高度采样
  let count = Math.floor(linearDistance);
  if (resolvingPower){
    count = Math.floor(count / resolvingPower) ;
  } else {
    //100米之内的精确到厘米
    if (linearDistance < 100) {
      count *= 100;
      //5000米之内的精确到分米
    } else if (linearDistance < 5000) {
      count *= 10;
    }
  }
  let positions = [];
  let startCartographic = Cartographic.fromCartesian(startPosition);
  let endCartographic = Cartographic.fromCartesian(endPosition);
  positions.push(startCartographic);
  for (let i = 1; i < count; i++) {
    let cart = Cartesian3.lerp(startPosition, endPosition, i / count, new Cartesian3());
    positions.push(Cartographic.fromCartesian(cart));
  }
  positions.push(endCartographic);

  return new Promise((resolve)=>{
    sampleTerrainMostDetailed(
      terrainProvider,
      positions
    ).then(updatedPositions => {
  
      let surfaceDistance = 0;
      for (let i = 0, len = updatedPositions.length; i < len; i++) {
        if (i == updatedPositions.length - 1) continue;
        surfaceDistance += Cartesian3.distance(
          Cartesian3.fromRadians(
            updatedPositions[i].longitude,
            updatedPositions[i].latitude,
            updatedPositions[i].height
          ),
          Cartesian3.fromRadians(
            updatedPositions[i + 1].longitude,
            updatedPositions[i + 1].latitude,
            updatedPositions[i + 1].height
          )
        );
      }
  
      resolve(surfaceDistance);
  
    });
  });
}

/**
 * 计算地表距离
 * @param {TerrainProvider} terrainProvider 高程属性，一般采用 viewer.terrainProvider
 * @param {Array{Cartesian3}} cartesian3s 坐标数组
 * @returns {Number} 长度，单位米
 */
export function getSurfaceDistanceArray(terrainProvider, cartesian3s) {
  if (!(cartesian3s?.length)) {
    return 0;
  }
  let tasks = [];
  for (let i = 0, len = cartesian3s.length - 1; i < len; i++) {
    tasks.push(getSurfaceDistance(terrainProvider, cartesian3s[i], cartesian3s[i + 1]));
  }
  return Promise.all(tasks).then(res => {
    return sum(res);
  });
}

function sum(arr) {
  var s = 0;
  for (var i = arr.length - 1; i >= 0; i--) {
    s += arr[i];
  }
  return s;
}

/**
 * 合并坐标数组
 * [[lon, lat], [lon1, lat1], ...] => [lon, lat, lon1, lat1, ...]
 * @param {Coordinates} coordinates 坐标数组
 */
export function MergeCoordinatesArray(coordinates){
  if (!coordinates?.length){
    return [];
  }
  let arr = [];
  coordinates.forEach(item=>{
    arr.push(item[0], item[1]);
  });
  return arr;
}


export function CreateLineMaterial(options){
  if (!options) {
    return Color.WHITE;
  }
  if (typeof (options) == 'string') {
    options = JSON.parse(options);
  }
  let property = options.property;
  if (options.type == 0) { // 只设置了颜色
    if (property.dashLength){
      return new PolylineDashMaterialProperty(property); // 虚线
    } else if (property.color) {
      return new ColorMaterialProperty(property.color);
    } else {
      return new ColorMaterialProperty(Color.WHITE);
    }
  }

  if (options.type == 1) { // 发光
    return new PolylineGlowMaterialProperty(property);
  }
  if (options.type == 2) {
    return new PolylineOutlineMaterialProperty(property);
  }
}
export function CreatePolygonMaterial(options){
  if (!options){
    return Color.WHITE;
  }
  if (typeof (options) == 'string') {
    options = JSON.parse(options);
  }
  return {
    color: new ColorMaterialProperty(options.color),
    borderColor: new ColorMaterialProperty(options.borderColor),
  };
}

export default {
  distanceByCartesian3,
  distanceByCoordinate,
  distanceByCoordinateArray,
  distanceByCartesian3Array,
  EllipsoidDistanceByCartographic,
  EllipsoidDistanceByCartesian3,
  EllipsoidDistanceByCoordinate,
  EllipsoidDistanceByCartesian3Array,
  EllipsoidDistanceByCoordinateArray,
  EllipsoidDistanceByCartographicArray,
  CreateLineMaterial,
  CreatePolygonMaterial
};