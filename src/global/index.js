import './element-variables.scss'
import Vue from 'vue';
import {
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Timeline,
    TimelineItem,
    Link,
    Divider,
    Image,
    Calendar,
    Backtop,
    PageHeader,
    CascaderPanel,
    Loading,
    MessageBox,
    Message,
    Notification,
    Empty,
    Drawer,
    Popconfirm,
    Descriptions,
    DescriptionsItem,

} from 'element-ui'

const components = [
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Timeline,
    TimelineItem,
    Link,
    Divider,
    Image,
    Calendar,
    Backtop,
    PageHeader,
    CascaderPanel,
    Empty,
    Drawer,
    Popconfirm,
    Descriptions,
    DescriptionsItem,
    Breadcrumb,
    BreadcrumbItem

]
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;

Vue.prototype.$message = function (msg) {
    //根据msg对象中的type类型判断消息提示的类型
    let msgObj = {
        message: msg.message ? msg.message : msg,
        duration: 1200
    }
    let msgType = msg.type || ""
    switch (msgType) {
        case 'success':
            return Message.success(msgObj);
            break;

        case 'warning':
            return Message.warning(msgObj);
            break;

        case 'error':
            return Message.error(msgObj);
            break;

        default:
            return Message(msgObj);
    }
}
// console.log(Message)


export default function (app) {
    for (let component of components) {
        app.component(component.name, component)
    }
}


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
// 改变数据格式
export function changeArrayToObject(pram) {
    let _result = {}
    pram.forEach((item) => {
        if (!_result[item._source.m_id]) {
            _result[item._source.m_id] = [];
        }
        _result[item._source.m_id].push(item._source);
    });
    return _result
}
// 或取图片地址
export function getImgUrlByType(entityType, _side) {
    
    let result = {
            img_url: "",
            scale: 0.9
        },
        side = "red";
    
    if (_side == 1) {
        side = "red"
    } else if (_side == 2) {
        side = "blue";
    } else {
        side = _side;
    }
    if (side != 'red' && side != 'blue') side = "red";
    var img_url = "";
    var scale = 0.8;

    if (entityType["m_kind"] == 1 &&
        entityType["m_domain"] == 1) {
        switch (entityType["m_category"]) {
            case 30:
                // Airport
                img_url = "sea-type/" + side + "/1-1-30.png";
                break;
            case 1:
                // 坦克图片 缺少坦克图片
                img_url = "sea-type/" + side + "/1-1-4.png";
                break;
            case 4:
                // DF21D
                img_url = "sea-type/" + side + "/1-1-4.png";
                break;
            case 31:
                // AN/FPS
                img_url = "sea-type/" + side + "/1-1-31.png";
                break;
            default:
                console.log("--------------------------")
                img_url = "sea-type/" + side + "/1-hangmu.png";
                console.log("新添加的实体", entityType)
                console.log("--------------------------")
                break;
        }
    } else if (entityType["m_kind"] == 1 &&
        entityType["m_domain"] == 2) {
        switch (entityType["m_category"]) {
            case 1:
                // J16, F/A-18E/F
                img_url = "sea-type/" + side + "/1-2-1.png";
                break;
            case 2:
                // JH7B
                img_url = "sea-type/" + side + "/1-2-2.png";
                break;
            case 3:

                // img_url = "sea-type/" + side + "/1-2-3.png";
                img_url = "sea-type/" + side + "/1-2-2.png";

                break;
            case 4:

                // img_url = "sea-type/" + side + "/1-2-3.png";
                img_url = "sea-type/" + side + "/1-2-2.png";

                break;
            case 5:
                // J16
                img_url = "sea-type/" + side + "/1-2-5.png";
                break;
            case 6:
                // EA18G
                img_url = "sea-type/" + side + "/1-2-6.png";
                break;
            case 8:
                // KJ500, E2D
                img_url = "sea-type/" + side + "/1-2-8.png";
                break;
            case 22:
                // SH-60B
                img_url = "sea-type/" + side + "/1-2-22.png";
                break;
            case 50:
                // SH-60B   无人机
                img_url = "sea-type/" + side + "/1-2-22.png";
                break;
            default:
                img_url = "sea-type/" + side + "/1-hangmu.png";
                console.log("--------------------------")
                console.log("新添加的实体", entityType)
                console.log("--------------------------")
                break;
        }
    } else if (entityType["m_kind"] == 1 &&
        entityType["m_domain"] == 3) {
        scale = 1.1;
        switch (entityType["m_category"]) {
            case 1:
                // CVNNimitz
                img_url = "sea-type/" + side + "/1-3-1.png";
                break;
            case 3:
                // Ticonderoga
                img_url = "sea-type/" + side + "/1-3-3.png";
                break;
            case 4:
                // 052D, ArleighBurkeFlightIIA
                img_url = "sea-type/" + side + "/1-3-4.png";
                break;
            case 5:
                // 052D, ArleighBurkeFlightIIA  船
                img_url = "sea-type/" + side + "/1-3-6.png";
                break;
            case 6:
                // 054A, PerryFFG
                img_url = "sea-type/" + side + "/1-3-4.png";
                break;
                // case 8:
                //     // J16
                //     img_url = "sea-type/red/1-2-1.png";
                //     break;
            default:
                console.log("--------------------------")
                img_url = "sea-type/" + side + "/1-hangmu.png";
                console.log("新添加的实体", entityType)
                console.log("--------------------------")
                break;
        }
    } else if (entityType["m_kind"] == 1 &&
        entityType["m_domain"] == 5) {
        switch (entityType["m_category"]) {
            case 2:
                // JB8A
                img_url = "sea-type/" + side + "/1-5-2.png";
                break;
            default:
                console.log("--------------------------")
                img_url = "sea-type/" + side + "/1-hangmu.png";
                console.log("新添加的实体", entityType)
                console.log("--------------------------")

                break;
        }
    } else if (entityType["m_kind"] == 1 &&
        entityType["m_domain"] == 4) {
        switch (entityType["m_category"]) {
            case 3:
                // SSN774
                img_url = "sea-type/" + side + "/1-4-3.png";
                scale = 1;
                break;
            default:
                console.log("--------------------------")
                console.log("新添加的实体", entityType)
                img_url = "sea-type/" + side + "/1-hangmu.png";
                console.log("--------------------------")
                break;
        }
    } else if (entityType["m_kind"] == 2 &&
        entityType["m_domain"] == 6) {
        switch (entityType["m_category"]) {
            case 1:
                // 12,18,AGM158C,BGM109
                img_url = "sea-type/" + side + "/2-6-1.png";
                scale = 0.6;
                break;
            default:
                console.log("--------------------------")
                console.log("新添加的实体", entityType)
                img_url = "sea-type/" + side + "/1-hangmu.png";
                console.log("--------------------------")
                break;
        }
    } else if (entityType["m_kind"] == 2 &&
        entityType["m_domain"] == 10) {
        switch (entityType["m_category"]) {
            case 2:
                // DF21D
                img_url = "sea-type/" + side + "/2-10-2.png";
                break;
            default:
                console.log("--------------------------")
                console.log("新添加的实体", entityType)
                img_url = "sea-type/" + side + "/1-hangmu.png";
                console.log("--------------------------")
                break;
        }
    } else if (entityType["m_kind"] == 2 &&
        entityType["m_domain"] == 1) {
        switch (entityType["m_category"]) {
            case 1:
                // HHQ-9, RIM-161A-SM-3MR
                img_url = "sea-type/" + side + "/2-1-1.png";
                scale = 0.6;
                break;
            case 2:
                // AIM120
                img_url = "sea-type/" + side + "/2-1-2.png";
                break;
            default:
                console.log("--------------------------")
                console.log("新添加的实体", entityType)
                img_url = "sea-type/" + side + "/1-hangmu.png";
                console.log("--------------------------")
                break;
        }
    }
    result.img_url = img_url;
    result.scale = scale;
    
    // console.log("........")
    // console.log(img_url)
    // console.log(result)
    // console.log("获得图片")
    return result
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
// 获取威胁图片
export function getThreatImgUrl(threat) {

    let img_url = "";
    if (threat > 0 && threat <= 3) {
        img_url = "orientation/grade_red_1.png";
    } else if (threat > 3 && threat <= 7) {
        img_url = "orientation/grade_red_2.png";
    } else {
        img_url = "orientation/grade_red_3.png";
    }
    return img_url;
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

/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/**
 * num 小于0，左缩进num*2个空格； 大于0，右缩进num*2个空格。
 * @param {string} str 代码
 * @param {number} num 缩进次数
 * @param {number} len 【可选】缩进单位，空格数
 */
 export function indent(str, num, len = 2) {
    if (num === 0) return str
    const isLeft = num < 0; const result = []; let reg; let
      spaces = ''
    if (isLeft) {
      num *= -1
      reg = new RegExp(`(^\\s{0,${num * len}})`, 'g')
    } else {
      for (let i = 0; i < num * len; i++) spaces += ' '
    }
  
    str.split('\n').forEach(line => {
      line = isLeft ? line.replace(reg, '') : spaces + line
      result.push(line)
    })
    return result.join('\n')
  }
  
  // 首字母大小
  export function titleCase(str) {
    return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
  }
  
  // 下划转驼峰
  export function camelCase(str) {
    return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase())
  }
  
  export function isNumberStr(str) {
    return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
  }
  
  export const exportDefault = 'export default '
  
  export const beautifierConf = {
    html: {
      indent_size: '2',
      indent_char: ' ',
      max_preserve_newlines: '-1',
      preserve_newlines: false,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: 'separate',
      brace_style: 'end-expand',
      space_before_conditional: true,
      unescape_strings: false,
      jslint_happy: false,
      end_with_newline: true,
      wrap_line_length: '110',
      indent_inner_html: true,
      comma_first: false,
      e4x: true,
      indent_empty_lines: true
    },
    js: {
      indent_size: '2',
      indent_char: ' ',
      max_preserve_newlines: '-1',
      preserve_newlines: false,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: 'normal',
      brace_style: 'end-expand',
      space_before_conditional: true,
      unescape_strings: false,
      jslint_happy: true,
      end_with_newline: true,
      wrap_line_length: '110',
      indent_inner_html: true,
      comma_first: false,
      e4x: true,
      indent_empty_lines: true
    }
  }
  
  function stringify(obj) {
    return JSON.stringify(obj, (key, val) => {
      if (typeof val === 'function') {
        return `${val}`
      }
      return val
    })
  }
  
  function parse(str) {
    JSON.parse(str, (k, v) => {
      if (v.indexOf && v.indexOf('function') > -1) {
        return eval(`(${v})`)
      }
      return v
    })
  }
  
  export function jsonClone(obj) {
    return parse(stringify(obj))
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
      if (obj.global) { flags.push('g') }
      if (obj.multiline) { flags.push('m') }
      if (obj.ignoreCase) { flags.push('i') }
  
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
  