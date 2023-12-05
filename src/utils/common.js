/**
 *  getUUID   生成唯一ID
 *  changeDataSting 转时间格式
 *  saveDatatoJson   保存并下载数据
 *  saveToFile   保存截图
 *  getColor_255  获取颜色值
 *  dataURLtoBlob  将URL 转换BOlb
 *  equalTime    平分时间段 
 *  timeToSecond  时间转秒数
 *  changeTime8   把国际时间转换成东八区时间
 *  Debounce   节流
 *  uuid  获取唯一的id
 *  deepClone  深拷贝对象
 *  getHeading  根据两个坐标点,获取Heading(朝向
 *  getCoordByCartesian3  三维坐标转经纬度
 *  countCircle  画圆
 *  countCircle_turf  画圆
 *  countArc_turf  画弧
 *  getPosition  得到全部数据六边形的中心点位置坐标
 *  distanceByCartesian3  计算两点之间距离
 *  distanceByCoordinate  计算两点之间距离，经纬度坐标
 *  distanceByCoordinateArray  计算距离，经纬度坐标
 *  distanceByCartesian3Array 计算距离，经纬度坐标
 *  EllipsoidDistanceByCartographic 计算两点之椭球距离
 *  EllipsoidDistanceByCartesian3  计算两点之椭球距离
 *  EllipsoidDistanceByCoordinate 计算两点之椭球距离，经纬度坐标
 *  EllipsoidDistanceByCartesian3Array 计算椭球距离
 *  EllipsoidDistanceByCoordinateArray 计算椭球距离
 *  EllipsoidDistanceByCartographicArray 计算椭球距离
 *  getSurfaceDistance  计算地表距离
 *  getSurfaceDistanceArray 计算地表距离
 *  MergeCoordinatesArray  合并坐标数组   [[lon, lat], [lon1, lat1], ...] => [lon, lat, lon1, lat1, ...]
 *  CreateLineMaterial
 *  CreatePolygonMaterial
 *  formatLatitude
 *  formatLongitude
 * 
 */

// import {
//     Cartesian3,
//     EllipsoidGeodesic,
//     Cartographic,
//     sampleTerrainMostDetailed,
//     Color,
//     PolylineGlowMaterialProperty,
//     PolylineOutlineMaterialProperty,
//     ColorMaterialProperty,
//     PolylineDashMaterialProperty
// } from 'cesium/Source/Cesium';
import * as turf from '@turf/turf'
const mapPositon = [{
    startLongitude: 113.992317, // 经度
    startLatitude: 23.282504, // 纬度
    diffLongitude: 0.00179099999999721, // 经度
    diffLatitude: -0.00155099999999919, // 纬度
}, ]
export function getUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
/**
 * 目的是转时间格式
 * @pram  时间格式转变成 '2022-03-11T06:34:12.263Z' 1ftrqujt7
 *  type: 1   由2022-03-11T06:34:12.263Z  -----> 1ftrqujt7
 *  type: 2   由1ftrqujt7  ---------> 1646980452263
 *  type: 3   由 2022-03-11T06:34:12.263Z   -----> 1646980452263
 *  type: 4   由2022-03-11T06:34:12.263Z  -----> 14:34:12
 *  type: 5   由1646980452263 -----> 1ftrqujt7
 */
export function changeDataSting(pram = {
    time: '2022-03-11T06:34:12.263Z',
    type: 1

}) {
    if (!pram) return;
    try {
        if (pram.type == 1) {
            return ((new Date(pram.time)).getTime()).toString(32)
        } else if (pram.type == 2) {
            return parseInt(pram.time, 32)
        } else if (pram.type == 3) {
            return (new Date(pram.time)).getTime()
        } else if (pram.type == 5) {
            let _iso = new Date(pram.time).toISOString();
            return ((new Date(_iso)).getTime()).toString(32)
        }
    } catch (e) {
        console.log("changeDataSting  参数有误")
    }

}
/**
 * 目的是保存并下载数据 保存json 数据格式
 *  data  是要保存的数据
 *  filename  是文件名字
 */

export function saveDatatoJson(data, filename) {
    if (!data) {
        console.error('Console.save: No data')
        return;
    }
    if (!filename) filename = 'console.json'
    if (typeof data === "object") {
        data = JSON.stringify(data, undefined, 4)
    }
    var blob = new Blob([data], {
            type: 'text/json'
        }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

/**
 *  保存截图
 * @param {
 * 
 * } pram 
 * @param {*} getpramFromParent 
 * @returns 
 */
// 保存截图
export function saveToFile(scene, systime) {
    let canvas = scene.canvas;
    let image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    let link = document.createElement("a");
    let blob = dataURLtoBlob(image);
    let objurl = URL.createObjectURL(blob);
    link.download = "scene_" + systime + "_.png";
    link.href = objurl;
    link.click();
}
export function changeData(pram, getpramFromParent) {
    let _allData = {},
        jsonData = [];
    jsonData.push({
        id: "document",
        version: "1.0",
    });
    _allData = changeArrayToObject(pram)


    /***拿到其中一类分析 */
    Object.keys(_allData).forEach((item0, index) => {
        let oneEn = {},
            img_url = "red";
        img_url = getImgUrlByType(_allData[item0][0].m_EntityType, _allData[item0][0].m_Side)
        oneEn.availability = getpramFromParent.start + "/" + getpramFromParent.end,
            oneEn.id = item0;

        oneEn.billboard = {
            eyeOffset: {
                cartesian: [0.0, 0.0, 0.0],
            },
            horizontalOrigin: "CENTER",
            image: require(`@/assets/${img_url}`),

            pixelOffset: {
                cartesian2: [0.0, 0.0],
            },
            scale: 0.8333333333333334,

            show: true,
            verticalOrigin: "CENTER",
            rotation: Cesium.Math.toRadians(-45.0),
        };
        /** 旋转角度 */
        //  oneEn.rotation = 8;
        /** 修改标签*/

        oneEn.label = {
            font: "bold 10pt Segoe UI Semibold",
            horizontalOrigin: "BOTTOM",
            fillColor: [{

                rgba: getColor_255(_allData[item0][0].m_Side),
            }, ],
            outlineColor: {
                rgba: getColor_255(_allData[item0][0].m_Side),
            },
            pixelOffset: {
                cartesian2: [0, 12],
            },
            scale: 1.0,
            style: "FILL",
            show: true,
            // text: _allData[item0][0].m_EntityName,
            text: _allData[item0][0].m_EntityName,
            verticalOrigin: "CENTER",

        };

        /** 经纬度坐标 */
        oneEn.position = {
            interpolationAlgorithm: "LAGRANGE",
            interpolationDegree: 1,
            epoch: getpramFromParent.start,
            cartographicDegrees: [],
        };

        _allData[item0].forEach((item1, index1) => {
            if (index1 == 0) {
                oneEn.position.cartographicDegrees.push(
                    0,
                    Number(item1.m_Position.longitude),
                    Number(item1.m_Position.latitude),
                    Number(item1.m_Position.height)
                );
            } else {
                oneEn.position.cartographicDegrees.push(
                    Number((Number(item1.simul_time) / 1000).toFixed(3)),
                    Number(item1.m_Position.longitude),
                    Number(item1.m_Position.latitude),
                    Number(item1.m_Position.height)
                );
            }
        });

        jsonData.push(oneEn);
    });

    console.log(jsonData);
    console.log("数据转接完成......");
    return jsonData;
}


//  获取颜色值
export function getColor_255(pram) {
    if (pram == 1) { // 红色
        return [255, 0, 0, 200]
    } else if (pram == 2) { // 蓝色
        return [0, 0, 255, 200]
    } else { // 白色
        return [236, 245, 255, 200] // 白色
    }
}
export function getColor(pram) {

    if (pram == 1) { // 红色
        return [255, 0, 0, 1]
    } else if (pram == 2) { // 蓝色
        return [0, 0, 255, 1]
    } else { // 白色
        return [236, 245, 255, 1] // 白色
    }
}
/**
 * 将URL 转换BOlb
 * @param {*} dataurl 
 * @returns 
 */
export function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime,
    });
}
/**
 * 平分时间段 
 * @param {*} timeStart 
 * @param {*} timeEnd 
 * @returns []
 */
export function equalTime(timeStart, timeEnd) {
    // try
    let _result = [],
        total =
        Number(Date.parse(timeEnd)) - Number(Date.parse(timeStart)),
        _equl = Number(window.my_config.replayRequestCount);
    /**
     * 测试灵活判断数据
     * 一小时分五分
     * 
     */
    if (!_equl || _equl <= 1) {
        /**  判断是从否从配置中获取还是从系统判断 */

        _equl = (parseInt(total / (1000 * 60 * 12)) + 1) * 10 > 60 ?
            60 :
            (parseInt(total / (1000 * 60 * 10)) + 1) * 10;

        if (parseInt(total / (1000 * 60)) < 10) {
            _equl = (parseInt(total / (1000 * 60)) + 1)
        }

    }

    (!_equl) && (_equl = 5) // 防止 _equl 为NAN 状态



    let equalValue = parseInt(total / _equl);
    for (let i = 0; i < _equl; i++) {
        i == _equl - 1 ?
            _result.push(Date.parse(timeEnd)) :
            _result.push(Date.parse(timeStart) + i * equalValue);
    }

    return _result.map((item) => new Date(item).toISOString());
}
/**
 * 时间转秒数
 * @param {*} time 
 * @returns 
 */
export function timeToSecond(time) {
    var temp = time.split(":");
    let t = 0,
        res = 0;
    for (let i = temp.length - 1; i >= 0; i--) {
        if (t == 0) {
            res = temp[i] * 1;
            t++;
        } else if (t == 1) {
            res += temp[i] * 60 * 1;
            t++;
        } else if (t == 3) {
            res += temp[i] * 3600 * 1;
        }
    }
    return res;
}
/**
 * 把国际时间转换成东八区时间
 * @param {*} time 
 * @returns 
 */

export function changeTime8(time) {
    if (str) {
        if (str.indexOf(":") !== -1) {
            return this.formatIso(str);
        } else {
            var time = str;
            const h = parseInt(time / 3600);
            const minute = parseInt((time / 60) % 60);
            const second = Math.ceil(time % 60);
            const hours = h < 10 ? "0" + h : h;
            const formatSecond = second > 59 ? 59 : second;
            var str = `${hours > 0 ? `${hours}:` : ""}${
                            minute < 10 ? "0" + minute : minute
                        }:${
                            formatSecond < 10
                                ? "0" + formatSecond
                                : formatSecond
                        }`;
            return str;
        }
    }
}

function swap(A, i, j) {
    const t = A[i];
    A[i] = A[j];
    A[j] = t;
}


/**
 *
 * @param {*} A  数组
 * @param {*} p  起始下标
 * @param {*} r  结束下标 + 1
 */
function divide(A, p, r) {
    const x = A[r - 1];
    let i = p - 1;

    for (let j = p; j < r - 1; j++) {
        if (A[j] <= x) {
            i++;
            swap(A, i, j);
        }
    }

    swap(A, i + 1, r - 1);

    return i + 1;
}

/**
 * 
 * @param {*} A  数组
 * @param {*} p  起始下标
 * @param {*} r  结束下标 + 1
 */
export function qsort(A, p = 0, r) {
    r = r || A.length;

    if (p < r - 1) {
        const q = divide(A, p, r);
        qsort(A, p, q);
        qsort(A, q + 1, r);
    }

    return A;
}
/**
 *  节流  
 * @param {*} fn 
 * @param {*} t 
 * @returns 
 */
export function Debounce(fn, t) {
    const delay = t || 500
    let timer
    return function () {
        const args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        const context = this
        timer = setTimeout(() => {
            timer = null
            fn.apply(context, args)
        }, delay)
    }
}

/**
 * 
 * @param {*} res 
 * @param {*} type   1 转变成变化的单位
 * @returns 
 */
export function adopeSize(res, type = 1) {
    let docEl = document.documentElement,
        clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1920);
    if (type == 1) {
        return res * fontSize;
    } else {
        return 100 * res
    }
}


/**
 * 
 * @returns  '9ad3a8b9-5ed3-415a-87b1-d400208d85ca' 
 * 获取唯一的id
 */

function uuid() {
    var lut = [];
    for (var i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + i.toString(16);
    }
    var d0 = Math.random() * 0xffffffff | 0;
    var d1 = Math.random() * 0xffffffff | 0;
    var d2 = Math.random() * 0xffffffff | 0;
    var d3 = Math.random() * 0xffffffff | 0;
    return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
}



// 深拷贝对象
export function deepClone(obj) {
    const _toString = Object.prototype.toString

    // null, undefined, non-object, function
    if (!obj || typeof obj !== 'object') {
        return obj
    }

    // DOM Node
    if (obj.nodeType && 'cloneNode' in obj) {
        return obj.cloneNode(true)
    }

    // Date
    if (_toString.call(obj) === '[object Date]') {
        return new Date(obj.getTime())
    }

    // RegExp
    if (_toString.call(obj) === '[object RegExp]') {
        const flags = []
        if (obj.global) {
            flags.push('g')
        }
        if (obj.multiline) {
            flags.push('m')
        }
        if (obj.ignoreCase) {
            flags.push('i')
        }

        return new RegExp(obj.source, flags.join(''))
    }

    const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

    for (const key in obj) {
        result[key] = deepClone(obj[key])
    }

    return result
}

const toStr = Function.prototype.call.bind(Object.prototype.toString)
export function isObjectObject(t) {
    return toStr(t) === '[object Object]'
}
export function isObjectArray(t) {
    return toStr(t) === '[object Array]'
}
export function isObjectNull(t) {
    return toStr(t) === '[object Null]'
}
export function isObjectUnde(t) {
    return toStr(t) === '[object Undefined]'
}

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
        var latitude = Cesium.Math.toDegrees(cartographic.latitude);
        var longitude = Cesium.Math.toDegrees(cartographic.longitude);

        return {
            latitude: latitude,
            longitude: longitude,
            height: 0
        };
    } catch {
        return {
            latitude: 0,
            longitude: 0,
            height: 0
        }
    }
}





/**
 * 
 * @param {*} t  // t：中心点经纬度坐标[92.24187876763331,11.900309162139353] 
 * @param {*} e  // e：半径 15 默认 千米
 * @param {*} i  // i： 圆上点的个数，默认15个，建议73个
 * @returns  [
    [
        92.24187876763331,
        12.214719511581183
    ],
    [
        92.46927060437717,
        12.122539321031212
    ],
]
 */

export function countCircle(e, t, i) {
    for (
        var r = t * 1000 / 6378137,
            n = [e[0], e[1]],
            o = [numberToRadius(n[1]), numberToRadius(n[0])],
            s = ((i = i || 15), []),
            a = 0; a < i; a++
    ) {
        var u = (2 * Math.PI * a) / i;
        var h = Math.asin(
            Math.sin(o[0]) * Math.cos(r) +
            Math.cos(o[0]) * Math.sin(r) * Math.cos(u)
        );
        var c =
            o[1] +
            Math.atan2(
                Math.sin(u) * Math.sin(r) * Math.cos(o[0]),
                Math.cos(r) - Math.sin(o[0]) * Math.sin(h)
            );
        s.push([numberToDegree(c), numberToDegree(h)]);
    }
    s.push(s[0])
    return s;
};

function numberToRadius(t) {
    return (t * Math.PI) / 180;
};

function numberToDegree(t) {
    return (180 * t) / Math.PI;
};

/**
 * 
 * @param {*} center   中心 [92.24187876763331,11.900309162139353]
 * @param {*} radius   半径 15 默认 千米
 * @param {*} options  {
 * steps ：70 分多少个点
 * 
 * }
 * @returns   [
        92.24187876763331,
        12.214719511581183
    ],
    [
        92.46927060437717,
        12.122539321031212
    ], 
 */

export function countCircle_turf(
    center = [92.24187876763331, 11.900309162139353],
    radius = 25,
    options = {
        steps: 70,
        units: 'kilometers',
        properties: {
            foo: 'bar'
        }
    }) {
    let circle;
    circle = turf.circle(center, radius, options)
    return circle.geometry.coordinates
}
/**
 * 
 * @param {*} center  中心 [92.24187876763331,11.900309162139353]
 * @param {*} radius  半径 15 默认 千米
 * @param {*} bearing1  开始角度
 * @param {*} bearing2   结束角度
 * @param {*} options   选线
 * @returns 
 */

export function countArc_turf(
    center = [92.24187876763331, 11.900309162139353],
    radius = 25,
    bearing1 = 0,
    bearing2 = 100,
    options = {
        steps: 90,
        units: 'kilometers',
        properties: {
            foo: 'bar'
        }
    }
) {
    let arc = turf.lineArc(center, radius, bearing1, bearing2, options);
    return arc.geometry.coordinates

}


/**
 * 
 * @returns 得到全部数据六边形的中心点位置坐标
 */
export function getPosition() {
    let getData = {}
    let getIndex = 0
    for (let i = 0; i < 100; i++) { //纬度
        for (let j = 0; j < 100; j++) { // 经度
            let _tempPostion = {}
            getIndex = i * 100 + j
            // 经度
            i % 2 == 0 ?
                _tempPostion.Longitude = mapPositon[0].startLongitude + mapPositon[0].diffLongitude * j :
                _tempPostion.Longitude = mapPositon[0].startLongitude + mapPositon[0].diffLongitude * j + mapPositon[0].diffLongitude / 2;
            // 纬度
            _tempPostion.Latitude = mapPositon[0].startLatitude + mapPositon[0].diffLatitude * i

            getData[getIndex] = _tempPostion
        }
    }
    return getData

}


// 
/**
 * 给实体添加原始数据数据信息内容
 * @param {*} pram_object // 当前的全部实体内容信息
 * @param {*} pram  一帧的全部数据信息
 * @returns 
 */
export function getItemDetailSource(pram_object, pram) {
    let allMap = {}
    try {

        if (pram._source.engine_obs && Array.isArray(pram._source.engine_obs.operators)) {
            pram._source.engine_obs.operators.forEach((item) => {
                allMap['' + item.obj_id] = item
                if (item.passenger_ids.length > 0) {
                    item.passenger_ids.forEach((item1) => {
                        allMap['' + item1] = item
                    })
                }
            })
        }

        pram_object = pram_object.map((item) => {
            item.allDataSource = allMap['' + item.m_id]
            return item
        })

        return pram_object
    } catch (error) {
        console.log(error)
    }

}
/**
 * 
 * @param {*} pram_item 单独实体具体信息内容
 * @param {*} allMapPositon  地图六变形所有中心点位置 
 * @returns  对pram_item添加myChangePostion属性信息内容
 */

export function changePositonToComputer(pram_item, allMapPositon) {
    let allDataSource = pram_item.allDataSource;
    let allPositonMessage = {
        startPositon: '',
        endPostion: '',
        percentage: '', // 百分比
        startLongitude: '', // 经度
        startLatitude: '', //纬度
        endLongitude: '', // 经度
        endLatitude: '', //纬度 //百分比 
    }
    let data = {
        latitude: '',
        longitude: '',
        height: 0,
    }
    // 预先定义位置内容
    allPositonMessage.startPositon = allDataSource.cur_hex || null //开始位置
    allPositonMessage.endPostion = allDataSource.move_path.length > 0 ?
        allDataSource.move_path[0] :
        allPositonMessage.startPositon; //结束位置

    allPositonMessage.percentage = allDataSource.cur_pos // 百分比
    // 获取位置信息
    if (allPositonMessage.startPositon == allPositonMessage.endPostion) {
        allPositonMessage.startLongitude = allMapPositon[allPositonMessage.startPositon].Longitude;
        allPositonMessage.startLatitude = allMapPositon[allPositonMessage.startPositon].Latitude;
        allPositonMessage.endLongitude = allMapPositon[allPositonMessage.startPositon].Longitude;
        allPositonMessage.endLatitude = allMapPositon[allPositonMessage.startPositon].Latitude;
        // 返回位置
        data.longitude = allPositonMessage.startLongitude;
        data.latitude = allPositonMessage.startLatitude

    } else {
        allPositonMessage.startLongitude = allMapPositon[allPositonMessage.startPositon].Longitude;
        allPositonMessage.startLatitude = allMapPositon[allPositonMessage.startPositon].Latitude;
        allPositonMessage.endLongitude = allMapPositon[allPositonMessage.endPostion].Longitude;
        allPositonMessage.endLatitude = allMapPositon[allPositonMessage.endPostion].Latitude;


        // 获取距离位置
        let from = turf.point([allPositonMessage.startLongitude, allPositonMessage.startLatitude]);
        let to = turf.point([allPositonMessage.endLongitude, allPositonMessage.endLatitude]);
        let options = {
            units: 'miles'
        };
        let distance = (turf.distance(from, to, options)) * Number(allPositonMessage.percentage);
        // 获取角度
        let bearing = turf.bearing(from, to);
        // 获取位置
        let destination = turf.destination(from, distance, bearing, options);


        data.longitude = destination.geometry.coordinates[0]
        data.latitude = destination.geometry.coordinates[1]
    }
    pram_item.myChangePostion = data
    console.log(pram_item)
    // 1.0 先拿到位置信息

    return pram_item

}
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
    if (!(coordinates.length)) {
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
    if (!(cartesian3.length)) {
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
    if (!(cartesian3.length)) {
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
    if (!(coordinate.length)) {
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
    if (!(cartographic.length)) {
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
    if (resolvingPower) {
        count = Math.floor(count / resolvingPower);
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

    return new Promise((resolve) => {
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
    if (!(cartesian3s.length)) {
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
export function MergeCoordinatesArray(coordinates) {
    if (!coordinates.length) {
        return [];
    }
    let arr = [];
    coordinates.forEach(item => {
        arr.push(item[0], item[1]);
    });
    return arr;
}


export function CreateLineMaterial(options) {
    if (!options) {
        return Color.WHITE;
    }
    if (typeof (options) == 'string') {
        options = JSON.parse(options);
    }
    let property = options.property;
    if (options.type == 0) { // 只设置了颜色
        if (property.dashLength) {
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
export function CreatePolygonMaterial(options) {
    if (!options) {
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


export function formatLatitude(num) {
    let str = ''
    let latitude = num.toFixed(4)
    const temp = latitude.split('.')
    let temp2 = temp[0] + '°' + temp[1].slice(0, 2) + '′' + temp[1].slice(2, 4) + '″'

    if (latitude > 0) {
        str = '北纬' + temp2
    } else {
        str = '南纬' + temp2.slice(1)
    }
    return str
}

export function formatLongitude(num) {
    let str = ''
    let latitude = num.toFixed(4)
    const temp = latitude.split('.')
    let temp2 = temp[0] + '°' + temp[1].slice(0, 2) + '′' + temp[1].slice(2, 4) + '″'

    if (latitude > 0) {
        str = '东经' + temp2
    } else {
        str = '西经' + temp2.slice(1)
    }
    return str
}

//火焰特效
export class FireEffect {
    constructor(viewer) {
        this.viewer = viewer
        this.viewModel = {
            emissionRate: 5,
            gravity: 0.0, //设置重力参数
            minimumParticleLife: 1,
            maximumParticleLife: 6,
            minimumSpeed: 1.0, //粒子发射的最小速度
            maximumSpeed: 4.0, //粒子发射的最大速度
            startScale: 0.0,
            endScale: 10.0,
            particleSize: 25.0,
        }
        this.emitterModelMatrix = new Cesium.Matrix4()
        this.translation = new Cesium.Cartesian3()
        this.rotation = new Cesium.Quaternion()
        this.hpr = new Cesium.HeadingPitchRoll()
        this.trs = new Cesium.TranslationRotationScale()
        this.scene = this.viewer.scene
        this.particleSystem = ''
        this.entity = this.viewer.entities.add({
            //选择粒子放置的坐标
            position: Cesium.Cartesian3.fromDegrees(
                116.34485552299206,
                39.99754814959118
            ),
        });
        this.init();
    }

    init() {
        const _this = this
        this.viewer.clock.shouldAnimate = true;
        this.viewer.scene.globe.depthTestAgainstTerrain = false;
        this.viewer.trackedEntity = this.entity;
        var particleSystem = this.scene.primitives.add(
            new Cesium.ParticleSystem({
                image: require('@/assets/fire.png'), //生成所需粒子的图片路径
                //粒子在生命周期开始时的颜色
                startColor: new Cesium.Color(1, 1, 1, 1),
                //粒子在生命周期结束时的颜色
                endColor: new Cesium.Color(0.5, 0, 0, 0),
                //粒子在生命周期开始时初始比例
                startScale: _this.viewModel.startScale,
                //粒子在生命周期结束时比例
                endScale: _this.viewModel.endScale,
                //粒子发射的最小速度
                minimumParticleLife: _this.viewModel.minimumParticleLife,
                //粒子发射的最大速度
                maximumParticleLife: _this.viewModel.maximumParticleLife,
                //粒子质量的最小界限
                minimumSpeed: _this.viewModel.minimumSpeed,
                //粒子质量的最大界限
                maximumSpeed: _this.viewModel.maximumSpeed,
                //以像素为单位缩放粒子图像尺寸
                imageSize: new Cesium.Cartesian2(
                    _this.viewModel.particleSize,
                    _this.viewModel.particleSize
                ),
                //每秒发射的粒子数
                emissionRate: _this.viewModel.emissionRate,
                //粒子系统发射粒子的时间（秒）
                lifetime: 16.0,
                //粒子系统是否应该在完成时循环其爆发
                loop: true,
                //设置粒子的大小是否以米或像素为单位
                sizeInMeters: true,
                //系统的粒子发射器
                emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(45.0)), //BoxEmitter 盒形发射器，ConeEmitter 锥形发射器，SphereEmitter 球形发射器，CircleEmitter圆形发射器
            })
        );
        this.particleSystem = particleSystem;
        this.preUpdateEvent()
    }

    //场景渲染事件
    preUpdateEvent() {
        let _this = this;
        this.viewer.scene.preUpdate.addEventListener(function (scene, time) {
            //发射器地理位置
            _this.particleSystem.modelMatrix = _this.computeModelMatrix(_this.entity, time);
            //发射器局部位置
            _this.particleSystem.emitterModelMatrix = _this.computeEmitterModelMatrix();
            // 将发射器旋转
            if (_this.viewModel.spin) {
                _this.viewModel.heading += 1.0;
                _this.viewModel.pitch += 1.0;
                _this.viewModel.roll += 1.0;
            }
        });
    }

    computeModelMatrix(entity, time) {
        return entity.computeModelMatrix(time, new Cesium.Matrix4());
    }

    computeEmitterModelMatrix() {
        this.hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, this.hpr);
        this.trs.translation = Cesium.Cartesian3.fromElements(
            -4.0,
            0.0,
            1.4,
            this.translation
        );
        this.trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(this.hpr, this.rotation);

        return Cesium.Matrix4.fromTranslationRotationScale(
            this.trs,
            this.emitterModelMatrix
        );
    }

    removeEvent() {
        this.viewer.scene.preUpdate.removeEventListener(this.preUpdateEvent, this);
        this.emitterModelMatrix = undefined;
        this.translation = undefined;
        this.rotation = undefined;
        this.hpr = undefined;
        this.trs = undefined;
    }

    //移除粒子特效
    remove() {
        () => {
            return this.removeEvent()
        }; //清除事件
        this.viewer.scene.primitives.remove(this.particleSystem); //删除粒子对象
        this.viewer.entities.remove(this.entity); //删除entity
    }

}



;
(function (console) {
    console.save = function (data, filename) {
        if (!data) {
            console.error('Console.save: No data')
            return;
        }
        if (!filename) filename = 'console.json'
        if (typeof data === "object") {
            data = JSON.stringify(data, undefined, 4)
        }
        var blob = new Blob([data], {
                type: 'text/json'
            }),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a')
        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console);

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// playground: stackblitz.com/edit/countup-typescript
var CountUp = /** @class */ (function () {
    function CountUp(target, endVal, options) {
        var _this = this;
        this.endVal = endVal;
        this.options = options;
        this.version = '2.1.0';
        this.defaults = {
            startVal: 0,
            decimalPlaces: 0,
            duration: 2,
            useEasing: true,
            useGrouping: true,
            smartEasingThreshold: 999,
            smartEasingAmount: 333,
            separator: ',',
            decimal: '.',
            prefix: '',
            suffix: '',
            enableScrollSpy: false,
            scrollSpyDelay: 200,
        };
        this.finalEndVal = null; // for smart easing
        this.useEasing = true;
        this.countDown = false;
        this.error = '';
        this.startVal = 0;
        this.paused = true;
        this.count = function (timestamp) {
            if (!_this.startTime) {
                _this.startTime = timestamp;
            }
            var progress = timestamp - _this.startTime;
            _this.remaining = _this.duration - progress;
            // to ease or not to ease
            if (_this.useEasing) {
                if (_this.countDown) {
                    _this.frameVal = _this.startVal - _this.easingFn(progress, 0, _this.startVal - _this.endVal, _this.duration);
                } else {
                    _this.frameVal = _this.easingFn(progress, _this.startVal, _this.endVal - _this.startVal, _this.duration);
                }
            } else {
                if (_this.countDown) {
                    _this.frameVal = _this.startVal - ((_this.startVal - _this.endVal) * (progress / _this.duration));
                } else {
                    _this.frameVal = _this.startVal + (_this.endVal - _this.startVal) * (progress / _this.duration);
                }
            }
            // don't go past endVal since progress can exceed duration in the last frame
            if (_this.countDown) {
                _this.frameVal = (_this.frameVal < _this.endVal) ? _this.endVal : _this.frameVal;
            } else {
                _this.frameVal = (_this.frameVal > _this.endVal) ? _this.endVal : _this.frameVal;
            }
            // decimal
            _this.frameVal = Number(_this.frameVal.toFixed(_this.options.decimalPlaces));
            // format and print value
            _this.printValue(_this.frameVal);
            // whether to continue
            if (progress < _this.duration) {
                _this.rAF = requestAnimationFrame(_this.count);
            } else if (_this.finalEndVal !== null) {
                // smart easing
                _this.update(_this.finalEndVal);
            } else {
                if (_this.callback) {
                    _this.callback();
                }
            }
        };
        // default format and easing functions
        this.formatNumber = function (num) {
            var neg = (num < 0) ? '-' : '';
            var result, x1, x2, x3;
            result = Math.abs(num).toFixed(_this.options.decimalPlaces);
            result += '';
            var x = result.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? _this.options.decimal + x[1] : '';
            if (_this.options.useGrouping) {
                x3 = '';
                for (var i = 0, len = x1.length; i < len; ++i) {
                    if (i !== 0 && (i % 3) === 0) {
                        x3 = _this.options.separator + x3;
                    }
                    x3 = x1[len - i - 1] + x3;
                }
                x1 = x3;
            }
            // optional numeral substitution
            if (_this.options.numerals && _this.options.numerals.length) {
                x1 = x1.replace(/[0-9]/g, function (w) {
                    return _this.options.numerals[+w];
                });
                x2 = x2.replace(/[0-9]/g, function (w) {
                    return _this.options.numerals[+w];
                });
            }
            return neg + _this.options.prefix + x1 + x2 + _this.options.suffix;
        };
        this.easeOutExpo = function (t, b, c, d) {
            return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
        };
        this.options = __assign(__assign({}, this.defaults), options);
        this.formattingFn = (this.options.formattingFn) ?
            this.options.formattingFn : this.formatNumber;
        this.easingFn = (this.options.easingFn) ?
            this.options.easingFn : this.easeOutExpo;
        this.startVal = this.validateValue(this.options.startVal);
        this.frameVal = this.startVal;
        this.endVal = this.validateValue(endVal);
        this.options.decimalPlaces = Math.max(0 || this.options.decimalPlaces);
        this.resetDuration();
        this.options.separator = String(this.options.separator);
        this.useEasing = this.options.useEasing;
        if (this.options.separator === '') {
            this.options.useGrouping = false;
        }
        this.el = (typeof target === 'string') ? document.getElementById(target) : target;
        if (this.el) {
            this.printValue(this.startVal);
        } else {
            this.error = '[CountUp] target is null or undefined';
        }
        // scroll spy
        if (window !== undefined && this.options.enableScrollSpy) {
            if (!this.error) {
                // set up global array of onscroll functions
                window['onScrollFns'] = window['onScrollFns'] || [];
                window['onScrollFns'].push(function () {
                    return _this.handleScroll(_this);
                });
                window.onscroll = function () {
                    window['onScrollFns'].forEach(function (fn) {
                        return fn();
                    });
                };
                this.handleScroll(this);
            } else {
                console.error(this.error, target);
            }
        }
    }
    CountUp.prototype.handleScroll = function (self) {
        if (!self || !window)
            return;
        var bottomOfScroll = window.innerHeight + window.scrollY;
        var bottomOfEl = self.el.offsetTop + self.el.offsetHeight;
        if (bottomOfEl < bottomOfScroll && bottomOfEl > window.scrollY && self.paused) {
            // in view
            self.paused = false;
            setTimeout(function () {
                return self.start();
            }, self.options.scrollSpyDelay);
        } else if (window.scrollY > bottomOfEl && !self.paused) {
            // scrolled past
            self.reset();
        }
    };
    // determines where easing starts and whether to count down or up
    CountUp.prototype.determineDirectionAndSmartEasing = function () {
        var end = (this.finalEndVal) ? this.finalEndVal : this.endVal;
        this.countDown = (this.startVal > end);
        var animateAmount = end - this.startVal;
        if (Math.abs(animateAmount) > this.options.smartEasingThreshold) {
            this.finalEndVal = end;
            var up = (this.countDown) ? 1 : -1;
            this.endVal = end + (up * this.options.smartEasingAmount);
            this.duration = this.duration / 2;
        } else {
            this.endVal = end;
            this.finalEndVal = null;
        }
        if (this.finalEndVal) {
            this.useEasing = false;
        } else {
            this.useEasing = this.options.useEasing;
        }
    };
    // start animation
    CountUp.prototype.start = function (callback) {
        if (this.error) {
            return;
        }
        this.callback = callback;
        if (this.duration > 0) {
            this.determineDirectionAndSmartEasing();
            this.paused = false;
            this.rAF = requestAnimationFrame(this.count);
        } else {
            this.printValue(this.endVal);
        }
    };
    // pause/resume animation
    CountUp.prototype.pauseResume = function () {
        if (!this.paused) {
            cancelAnimationFrame(this.rAF);
        } else {
            this.startTime = null;
            this.duration = this.remaining;
            this.startVal = this.frameVal;
            this.determineDirectionAndSmartEasing();
            this.rAF = requestAnimationFrame(this.count);
        }
        this.paused = !this.paused;
    };
    // reset to startVal so animation can be run again
    CountUp.prototype.reset = function () {
        cancelAnimationFrame(this.rAF);
        this.paused = true;
        this.resetDuration();
        this.startVal = this.validateValue(this.options.startVal);
        this.frameVal = this.startVal;
        this.printValue(this.startVal);
    };
    // pass a new endVal and start animation
    CountUp.prototype.update = function (newEndVal) {
        cancelAnimationFrame(this.rAF);
        this.startTime = null;
        this.endVal = this.validateValue(newEndVal);
        if (this.endVal === this.frameVal) {
            return;
        }
        this.startVal = this.frameVal;
        if (!this.finalEndVal) {
            this.resetDuration();
        }
        this.finalEndVal = null;
        this.determineDirectionAndSmartEasing();
        this.rAF = requestAnimationFrame(this.count);
    };
    CountUp.prototype.printValue = function (val) {
        var result = this.formattingFn(val);
        if (this.el.tagName === 'INPUT') {
            var input = this.el;
            input.value = result;
        } else if (this.el.tagName === 'text' || this.el.tagName === 'tspan') {
            this.el.textContent = result;
        } else {
            this.el.innerHTML = result;
        }
    };
    CountUp.prototype.ensureNumber = function (n) {
        return (typeof n === 'number' && !isNaN(n));
    };
    CountUp.prototype.validateValue = function (value) {
        var newValue = Number(value);
        if (!this.ensureNumber(newValue)) {
            this.error = "[CountUp] invalid start or end value: ".concat(value);
            return null;
        } else {
            return newValue;
        }
    };
    CountUp.prototype.resetDuration = function () {
        this.startTime = null;
        this.duration = Number(this.options.duration) * 1000;
        this.remaining = this.duration;
    };
    return CountUp;
}());

export default {
    CountUp,
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