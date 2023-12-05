import { canvasIamge, aiCanvasIamge } from '@/global/commonClass.js'
import { hex_to_coor } from '@/utils/CesiumTools.js'
import { getHeading, getCoordByCartesian3 } from '@/utils/CesiumTools.js'
export const mapDataMixin = {
    data() {
        return {
            num_data: -100,
            movePathEntity: [],
            movePath: {},
            shieldMove: [],
            longitude: 0,
            latitude: 0,
            aiPredictionOperator: {
                1: [],
                2: [],
                3: [],
                4: []
            },
            selectEntityId: ''
        };
    },
    methods: {
        /**
         * @param {
         *  cityList //夺控点list
         * }
         * */

        createorUpdateCity(cityList, viewer) {
            if (!cityList) {
                return;
            }
            cityList.forEach(item => {
                let entity = viewer.entities.getById(item.longitude + '_' + item.latitude);
                let img_url;
                if (item.name.substring(0, 2) == '主要') {
                    img_url = `${item.flag}_01.png`
                } else {
                    img_url = `${item.flag}_02.png`
                }

                if (entity == null || entity == undefined) {
                    viewer.entities.add({
                        id: item.longitude + '_' + item.latitude,
                        position: Cesium.Cartesian3.fromDegrees(item.longitude, item.latitude, 0),
                        billboard: {
                            show: true, // default
                            image: require(`@/assets/flags/${img_url}`),
                            scale: 0.7, // default: 1.0
                            pixelOffset: new Cesium.Cartesian2(32 * 0.7, -32 * 0.7),
                        },
                    })
                } else {
                    entity.position = Cesium.Cartesian3.fromDegrees(item.longitude, item.latitude, 0);
                    entity.billboard.image = require(`@/assets/flags/${img_url}`);
                }
            })
        },
        // 调整初始状态
        setInitialStatus(viewer, map_center) {
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(map_center.longitude, map_center.latitude, 12000),
                duration: 2,
            });
            viewer.scene.screenSpaceCameraController.minimumZoomDistance = 2700;//相机的高度的最小值
            // viewer.scene.screenSpaceCameraController.maximumZoomDistance = 12000;  //相机高度的最大值
            viewer.scene.screenSpaceCameraController._minimumZoomRate = 30000; // 设置相机缩小时的速率
            viewer.scene.screenSpaceCameraController._maximumZoomRate = 5906376272000 //设置相机放大时的速率
        },
        modelCreate(obj, viewer) {
            if (obj.obj_list) {
                this.createOrUpdateModel(obj.obj_list, obj.engine_obs, viewer);
                if (obj.blue_detect_list) {
                    this.createOrUpdateModel(obj.blue_detect_list, obj.engine_obs, viewer);
                }
                if (obj.red_detect_list) {
                    this.createOrUpdateModel(obj.red_detect_list, obj.engine_obs, viewer);
                }
            }
        },
        createOrUpdateModel(modelList, engine_obs, viewer) {
            if (!modelList) { return; }
            var that = this, color, m_side, m_id, rotation;

            modelList.forEach(item => {
                if (item.m_Side === 1) {
                    color = Cesium.Color.fromCssColorString('#621f23');
                    m_side = "red";
                } else {
                    color = Cesium.Color.fromCssColorString('#1a3556');
                    m_side = "blue";
                }
                m_id = item["m_id"]
                if (m_id === 0) {
                    m_id = 't0';
                }


                var entity = viewer?.entities?.getById(m_id);
                rotation = Cesium.Math.toRadians(360);
                if (!entity) {
                    let img_url, image, missile = false, obj_d;
                    let img_rs = that.getImgUrl(item.m_EntityType, m_side);


                    var scale = img_rs.scale;
                    var label_text = item.m_EntityName;
                    obj_d = engine_obs.operators.find(i => i.obj_id == item.m_id);
                    if (!obj_d) {
                        missile = true;
                        return;
                        obj_d = engine_obs.passengers.find(i => i.obj_id == item.m_id)
                    }
                    this.num_data--

                    let left_text = ''
                    switch (obj_d.armor) {
                        case 0:
                            left_text = '无'
                            break;
                        case 1:
                            left_text = '轻'
                            break;
                        case 2:
                            left_text = '中'
                            break;
                        case 3:
                            left_text = '重'
                            break;
                        case 4:
                            left_text = '复'
                            break;
                        default:
                            left_text = '无'
                    }
                    let obj = {
                        side: item.m_Side, // 必须传的参数 1 代表红方  2 代表蓝方
                        entryModel: obj_d.obj_id, // 必须传的参数 00058
                        upState: obj_d.keep == 1 ? '压' : '',//"测", //传的参数  是右上角的信息
                        entryName: obj_d.name,
                        downState1: left_text,
                        downState2: obj_d.weapon_unfold_state == 1 ? '开' : '关',//"右",
                        entryNum: obj_d.unioining_role == undefined ? -1 : obj_d.unioining_role,
                        blood: obj_d.blood, // 0 代表 0% 4  代表100%
                        maxBlood: obj_d.max_blood, // 最大血量
                        img: img_rs.img_url
                    }
                    let img = new canvasIamge(obj);
                    img_url = img.canvas;
                    // var bodyEle = document.body;
                    // bodyEle.appendChild(img_url)
                    var scale = '0.7';

                    let position = Cesium.Cartesian3.fromDegrees(item.m_Position.longitude, item.m_Position.latitude, item.m_Position.height);
                    entity = viewer.entities.add({
                        id: m_id,
                        sideStr: m_side,
                        name: label_text,
                        side: item.m_Side,
                        canvas_img: img,
                        label: {
                            show: true,
                            text: label_text,
                            font: 'normal 13px MicroSoft YaHei', // 15pt monospace
                            scale: 1,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            fillColor: Cesium.Color.fromCssColorString('#ffffff'),
                            outlineColor: Cesium.Color.fromCssColorString('#ffffff'),
                            outlineWidth: 1,
                            pixelOffset: new Cesium.Cartesian2(0, 48), //偏移量
                            showBackground: true,
                            backgroundColor: color,
                            eyeOffset: new Cesium.Cartesian3(0, 0, this.num_data),
                        },
                        position: position,
                        billboard: {
                            id: label_text,
                            show: true, // default
                            image: img_url,
                            scale: scale, // default: 1.0
                            description: label_text,
                            rotation: rotation,
                            stRotation: rotation,
                            color: Cesium.Color.WHITE,
                            eyeOffset: new Cesium.Cartesian3(0, 0, this.num_data),
                            scaleByDistance: new Cesium.NearFarScalar(2700, 1, 12000, 0.5)
                        }
                    })
                } else {
                    let missile = false;
                    let obj_d = engine_obs.operators.find(i => i.obj_id == item.m_id)
                    if (obj_d == undefined) {
                        missile = true;
                        obj_d = engine_obs.passengers.find(i => i.obj_id == item.m_id)
                        return;

                    }
                    let left_text = ''
                    switch (obj_d.armor) {
                        case 0:
                            left_text = '无'
                            break;
                        case 1:
                            left_text = '轻'
                            break;
                        case 2:
                            left_text = '中'
                            break;
                        case 3:
                            left_text = '重'
                            break;
                        case 4:
                            left_text = '复'
                            break;
                        default:
                            left_text = '无'
                    }

                    let image = entity.canvas_img;
                    let obj = {
                        side: item.m_Side, // 必须传的参数 1 代表红方  2 代表蓝方
                        entryModel: obj_d.obj_id, // 必须传的参数 00058
                        upState: obj_d.keep == 1 ? '压' : '',//"测", //传的参数  是右上角的信息
                        entryName: obj_d.name,
                        downState1: left_text,
                        downState2: obj_d.weapon_unfold_state == 1 ? '开' : '关',//"右",
                        entryNum: obj_d.unioining_role == undefined ? -1 : obj_d.unioining_role,
                        blood: obj_d.blood, // 0 代表 0% 4  代表100%
                        maxBlood: obj_d.max_blood, // 最大血量
                        img: image.getValue('img')
                    }
                    if (image.getValue('blood') !== obj_d.blood) {
                        // 更新血量
                        let image = new canvasIamge(obj)
                        var img_url = image.canvas
                        entity.canvas_img = image;
                        entity.billboard.image = img_url;
                    }
                    image.updataDraw(obj);
                    var img_url = image.canvas;
                    let text_t = this.getstatusStr(obj_d, missile)
                    // entity.label.text = text_t;
                    if (text_t !== '') {
                        entity.label.text = entity.label.text.getValue().split('\n')[0] + '\n' + text_t;
                        entity.label.pixelOffset = new Cesium.Cartesian2(0, 55); //偏移量
                    } else {
                        entity.label.text = entity.label.text.getValue().split('\n')[0];
                        entity.label.pixelOffset = new Cesium.Cartesian2(0, 48); //偏移量
                    }
                    let property = Cesium.Cartesian3.fromDegrees(item["m_Position"]["longitude"], item["m_Position"]["latitude"], item["m_Position"]["height"]);
                    entity.position = property;
                    entity.billboard.rotation = rotation
                }
            })
        },
        getImgUrl(entityType, side) {
            // 获取模型图片
            var that = this
            var result = {
                img_url: "",
                scale: 0.9
            };
            var img_url = "";
            var scale = 0.8;
            if (entityType["m_kind"] == 1 &&
                entityType["m_domain"] == 1) {
                switch (parseInt(entityType["m_category"])) {
                    case 30:
                        // Airport
                        img_url = "bqsea_type/" + side + "/1-1-30.png";
                        break;
                    case 4:
                        // DF21D
                        img_url = "bqsea_type/" + side + "/2-0.png";
                        break;
                    case 31:
                        // AN/FPS
                        img_url = "bqsea_type/" + side + "/1-1-31.png";
                        break;
                    case 34:
                        // 暂时添加
                        img_url = "bqsea_type/" + side + "/1-1-31.png";
                        break;
                    case 1:
                        // 坦克
                        img_url = "bqsea_type/" + side + "/0-0.png"
                        break;
                    case 2:
                        // 战车
                        img_url = "bqsea_type/" + side + "/1-0.png"
                        break;
                    case 41:
                        // 步兵
                        img_url = "bqsea_type/" + side + "/2-0.png"
                        break;
                    default:
                        img_url = "";
                        break;
                }
            } else if (entityType["m_kind"] == 1 &&
                entityType["m_domain"] == 2) {
                switch (parseInt(entityType["m_category"])) {
                    case 1:
                        // J16, F/A-18E/F
                        img_url = "bqsea_type/" + side + "/6-0.png";
                        break;
                    case 2:
                        // JH7B
                        img_url = "bqsea_type/" + side + "/7-0.png";
                        break;
                    case 3:
                        // img_url = "bqsea_type/" + side + "/1-2-3.png";
                        img_url = "bqsea_type/" + side + "/1-2-2.png";

                        break;
                    case 4:
                        // img_url = "bqsea_type/" + side + "/1-2-3.png";
                        img_url = "bqsea_type/" + side + "/1-2-2.png";

                        break;
                    case 5:
                        // J16
                        img_url = "bqsea_type/" + side + "/1-2-5.png";
                        break;
                    case 6:
                        // EA18G
                        img_url = "bqsea_type/" + side + "/1-2-6.png";
                        break;
                    case 7:
                        // 暂时添加
                        img_url = "bqsea_type/" + side + "/5-0.png";
                        break;
                    case 8:
                        // KJ500, E2D
                        img_url = "bqsea_type/" + side + "/1-2-8.png";
                        break;
                    case 22:
                        // SH-60B
                        img_url = "bqsea_type/" + side + "/1-2-22.png";
                        break;
                    case 50:
                        img_url = "bqsea_type/" + side + "/1-2-50.png";
                        break;
                    default:
                        img_url = "";
                        break;
                }
            } else if (entityType["m_kind"] == 1 &&
                entityType["m_domain"] == 3) {
                scale = 1.1;
                switch (parseInt(entityType["m_category"])) {
                    case 1:
                        // CVNNimitz
                        img_url = "bqsea_type/" + side + "/1-3-1.png";
                        break;
                    case 2:
                        // 暂时添加
                        img_url = "bqsea_type/" + side + "/1-3-1.png";
                        break;
                    case 3:
                        // Ticonderoga
                        img_url = "bqsea_type/" + side + "/1-3-3.png";
                        break;
                    case 4:
                        // 052D, ArleighBurkeFlightIIA
                        img_url = "bqsea_type/" + side + "/1-3-4.png";
                        break;
                    case 5:
                        img_url = "bqsea_type/" + side + "/1-3-4.png";
                        break;
                    case 6:
                        // 054A, PerryFFG
                        img_url = "bqsea_type/" + side + "/1-3-4.png";
                        break;
                    // case 8:
                    //     // J16
                    //     img_url = "bqsea_type/red/1-2-1.png";
                    //     break;
                    default:
                        img_url = "";
                        break;
                }
            } else if (entityType["m_kind"] == 1 &&
                entityType["m_domain"] == 5) {
                switch (parseInt(entityType["m_category"])) {
                    case 2:
                        // JB8A
                        img_url = "bqsea_type/" + side + "/1-5-2.png";
                        break;
                    default:
                        img_url = "";
                        break;
                }
            } else if (entityType["m_kind"] == 1 &&
                entityType["m_domain"] == 4) {
                switch (parseInt(entityType["m_category"])) {
                    case 3:
                        // SSN774
                        img_url = "bqsea_type/" + side + "/1-4-3.png";
                        scale = 1;
                        break;
                    default:
                        img_url = "";
                        break;
                }
            } else if (entityType["m_kind"] == 2 &&
                entityType["m_domain"] == 6) {
                switch (parseInt(entityType["m_category"])) {
                    case 1:
                        // 12,18,AGM158C,BGM109
                        img_url = "bqsea_type/" + side + "/2-6-1.png";
                        scale = 0.6;
                        break;
                    default:
                        img_url = "";
                        break;
                }
            } else if (entityType["m_kind"] == 2 &&
                entityType["m_domain"] == 10) {
                switch (parseInt(entityType["m_category"])) {
                    case 2:
                        // DF21D
                        img_url = "bqsea_type/" + side + "/2-10-2.png";
                        break;
                    default:
                        img_url = "";
                        break;
                }
            } else if (entityType["m_kind"] == 2 &&
                entityType["m_domain"] == 1) {
                switch (parseInt(entityType["m_category"])) {
                    case 1:
                        // HHQ-9, RIM-161A-SM-3MR
                        img_url = "bqsea_type/" + side + "/2-1-1.png";
                        scale = 0.6;
                        break;
                    case 2:
                        // AIM120
                        img_url = "bqsea_type/" + side + "/2-1-2.png";
                        break;
                    default:
                        img_url = "";
                        break;
                }
            }
            if (img_url == "") {
                img_url = "3-0.png";
                scale = 0.6;
            }
            result.img_url = img_url;
            result.scale = scale;
            return result;
        },
        getstatusStr(obj, missile) {
            // if(obj.move_state){}
            let resText = '';
            switch (obj.move_state) {
                case 0:
                    resText = ''
                    break;
                case 1:
                    resText = '[行军]'
                    break;
                case 2:
                    resText = '[一级冲锋]'
                    break;
                case 3:
                    resText = '[二级冲锋]'
                    break;
                case 4:
                    resText = '[掩蔽]'
                    break;
                default:
                    resText = '[半速]'
            }
            if (obj.tire !== 0) {
                resText += `[疲劳：${obj.keep_remain_time}]`
            }
            if (obj.get_on_remain_time !== 0) {
                resText += `[上车：${obj.get_on_remain_time}]`
            }
            if (obj.get_off_remain_time !== 0) {
                resText += `[下车：${obj.get_off_remain_time}]`
            }
            if (obj.weapon_cool_time !== 0) {
                resText += `[冷却：${obj.weapon_cool_time}]`
            }
            if (missile) {
                resText += `[存活：${obj.alive_remain_time}]`
            }
            return resText

        },
        // 删除模型实现
        removeItem(newValue, oldValue, engine_obs, viewer) {
            if (oldValue != null || oldValue != undefined) {
                for (var i = 0; i < oldValue.length; i++) {
                    var id;
                    if (oldValue[i]["m_id"] !== undefined && oldValue[i]["m_id"] !== "") {
                        id = oldValue[i]["m_id"]
                    } else {
                        id = oldValue[i]["m_TargetID"]
                    }
                    if (id === undefined || id === null) {
                        return
                    }

                    let obj_d = engine_obs.operators.find(item => item.obj_id == id)
                    if (!obj_d) {
                        var entity = viewer.entities.getById(id);
                        if (entity) {
                            console.log('刪除算子1');
                            console.log(id, '删除算子并清空路径');
                            this.createOrUpdatePath({
                                type: 0,
                                id: id
                            }, viewer)
                            viewer.entities.remove(entity);
                        }
                        // return
                    }
                    var isExit = newValue.some(item => {
                        if (item.m_id !== undefined && item.m_id !== "") {
                            return item.m_id === id
                        }
                    })
                    if (!isExit) {
                        if (id === 0) {
                            id = 't0'
                        }
                        console.log(id, '删除算子并清空路径');
                        this.createOrUpdatePath({
                            type: 0,
                            id: id
                        }, viewer)
                        var entity = viewer.entities.getById(id);
                        console.log('刪除算子2');
                        viewer.entities.remove(entity)
                        // 删除算子轨迹
                    }
                }
            }
        },
        // 填写一些操作方法
        initCesium(viewer) {
            var that = this;
            var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
            // 左键按下事件
            handler.setInputAction(function (event) {
                let entities_list = viewer.scene.drillPick(event.position); //实体组
                
                entities_list = entities_list.filter(item => item.id.canvas_img != undefined) //算子组
                let uList_a = document.getElementsByClassName('ulList_canvas')
                if (uList_a.length > 0) {
                    uList_a[0].remove()
                }
                if (entities_list.length == 1) {
                    that.num_data--;
                    that.selectEntityId = entities_list[0].id.id
                    console.log(that.selectEntityId);
                    let s_id = entities_list[0].id.id
                    if (s_id == 0 || s_id == '0') {
                        s_id = 't0'
                    }
                    let entity = viewer.entities.getById(s_id)//获取实体
                    entity.billboard.eyeOffset = new Cesium.Cartesian3(0, 0, that.num_data)//层级
                    entity.label.eyeOffset = new Cesium.Cartesian3(0, 0, that.num_data)//层级
                }
                if (entities_list.length > 1) {

                    if (entities_list.length > 0) {
                        let uList = document.createElement('ul');
                        uList.className = 'ulList_canvas'
                        uList.style.position = 'fixed'
                        uList.style.top = event.position.y + 'px'
                        uList.style.left = event.position.x + 'px'
                        uList.style.padding = '10px'
                        uList.style.zIndex = '999'
                        uList.style.listStyle = 'none'
                        uList.style.background = '#373f42'
                        uList.style.border = '5px solid #1e8dbf'
                        document.body.appendChild(uList);

                        let obj = {}

                        for (let i = 0; i < entities_list.length; i++) {
                            let item = entities_list[i]
                            obj['liObj' + i] = document.createElement('li');
                            obj['liObj' + i].style.float = 'left';
                            obj['liObj' + i].style.cursor = 'pointer';
                            let div1 = document.createElement('div');
                            div1.style.width = '80px';
                            div1.style.width = '80px';
                            div1.style.height = '80px';
                            div1.style.margin = '0 10px';
                            div1.style.display = 'inline-block';
                            div1.style.backgroundImage = 'url("' + item.id.canvas_img.canvas.toDataURL() + '")';//item.id.canvas_img.canvas
                            div1.style.backgroundSize = 'contain';

                            let div2 = document.createElement('div');
                            div2.innerHTML = item.id.label.text.getValue().split('\n')[0];
                            div2.style.fontSize = '14px';
                            div2.style.textAlign = 'center'
                            div2.style.color = '#fff';
                            div2.style.overflow = 'hidden';
                            div2.style.width = '80px';
                            div2.style.margin = '0 10px';
                            obj['liObj' + i].appendChild(div1)
                            obj['liObj' + i].appendChild(div2)
                            obj['liObj' + i].addEventListener('click', function () {
                                if (uList_a.length > 0) {
                                    uList_a[0].remove()
                                }
                                that.clickList(item, viewer)
                            });
                            uList.appendChild(obj['liObj' + i]);
                        }
                    }
                }
                if(entities_list === 0){
                    entities_list = viewer.scene.drillPick(event.position); //实体组
                    entities_list = entities.list.filter(item => item.id.side !== undefined)
                    that.selectEntityId = entities_list[0].id.id
                }
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN)

            handler.setInputAction(function (event) {
                // 动态显示经纬度
                var cartesian = viewer.camera.pickEllipsoid(event.endPosition, viewer.scene.globe.ellipsoid);
                if (cartesian) {
                    // 将笛卡尔三维坐标转为地图坐标（弧度）
                    var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                    // 将地图坐标（弧度）转为十进制的度数
                    var lat_String = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
                    var log_String = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
                    // var alti_String=(viewer.camera.positionCartographic.height/1000).toFixed(2);
                    that.longitude = log_String;
                    that.latitude = lat_String;
                    // altitude_show.innerHTML=alti_String;
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
        },
        clickList(e, viewer) {
            this.num_data--
            this.selectEntityId = e.id.id;
            let s_id = e.id.id
            if (s_id == 0 || s_id == '0') {
                s_id = 't0'
            }
            let entity = viewer.entities.getById(s_id)//获取实体
            entity.billboard.eyeOffset = new Cesium.Cartesian3(0, 0, this.num_data)//层级
            entity.label.eyeOffset = new Cesium.Cartesian3(0, 0, this.num_data)//层级
            viewer._selectedEntity = entity;
        },
        // 创建或更新移动路径
        pathCreate(operators, viewer) {
            operators.forEach(item => {
                let id = item.obj_id
                if (id === 0 || id === '0') {
                    id = 't0'
                }
                let shield = this.shieldMove.findIndex(name => name == id);
                if (shield == -1) {
                    if (this.movePath[id]) {
                        if (JSON.stringify(this.movePath[id]) !== JSON.stringify(item.move_path)) {
                            this.movePath[id] = item.move_path;
                            // 更新path
                            this.createOrUpdatePath({
                                type: 2,
                                id: id,
                                path: item.move_path,
                                side: item.color
                            }, viewer)
                        }
                    } else {
                        this.movePath[id] = item.move_path
                        //新建path
                        this.createOrUpdatePath({
                            type: 1,
                            id: id,
                            path: item.move_path,
                            side: item.color
                        }, viewer)
                    }
                } else {
                    if (this.movePath[id]?.length !== 0) {
                        delete this.movePath[id]
                        // 删除path
                        this.createOrUpdatePath({
                            type: 0,
                            id: id
                        }, viewer)
                    }
                }
            })
        },
        createOrUpdatePath(info, viewer) {
            switch (info.type) {
                case 0:
                    console.log('删除逻辑');
                    let entities = viewer.entities.getById(info.id + '_path')
                    if (entities) {
                        viewer.entities.remove(entities)
                    }
                    // 删除
                    if (!this.movePathEntity[info.id]) { return; }
                    this.movePathEntity[info.id].forEach(item => {
                        if (item) {
                            try {
                                viewer.entities.remove(item)
                            } catch {
                                console.log('删除算子失败');
                            }
                        }
                    })
                    this.movePathEntity[info.id] = []
                    break;
                case 1:
                    // 新增
                    var positionArr = info.path.map(item => {
                        return hex_to_coor(item);
                    })
                    var posititons = []

                    var color;
                    if (info.side == 0) {
                        // color = Cesium.Color.RED;
                        color = Cesium.Color.fromCssColorString('#ff495a')
                    } else {
                        // color = Cesium.Color.BLUE;
                        color = Cesium.Color.fromCssColorString('#058bfc')
                        
                    }
                    this.movePathEntity[info.id] = []

                    for (let i = 0; i < positionArr.length - 1; i++) {
                        let position = [(positionArr[i][0] * 1 + positionArr[i + 1][0] * 1) / 2, (positionArr[i][1] * 1 + positionArr[i + 1][1] * 1) / 2]
                        var line = viewer.entities.add({
                            polyline: {
                                positions: Cesium.Cartesian3.fromDegreesArray([(positionArr[i][0] * 1 + position[0] * 1) / 2, (positionArr[i][1] * 1 + position[1] * 1) / 2, (positionArr[i + 1][0] * 1 + position[0] * 1) / 2, (positionArr[i + 1][1] * 1 + position[1] * 1) / 2]),
                                width: 10,
                                arcType: Cesium.ArcType.NONE,
                                material: new Cesium.PolylineArrowMaterialProperty(
                                    Cesium.Color.fromAlpha(color, 0.8)
                                ),
                            }
                        })
                        this.movePathEntity[info.id].push(line)
                        if (i > 0) {
                            var point = viewer.entities.add({
                                position: Cesium.Cartesian3.fromDegrees(positionArr[i][0], positionArr[i][1]),
                                point: {
                                    color: color,
                                    pixelSize: 10,
                                },
                            })
                            this.movePathEntity[info.id].push(point)
                        }
                    }

                    break;
                case 2:


                    var positionArr = info.path.map(item => {
                        return hex_to_coor(item);
                    })
                    var posititons = []
                    positionArr.forEach(item => {
                        posititons.push(item[0], item[1])
                    })

                    var color;
                    if (info.side == 0) {
                        // color = Cesium.Color.RED;
                        color = Cesium.Color.fromCssColorString('#ff495a')
                    } else {
                        // color = Cesium.Color.BLUE;
                        color = Cesium.Color.fromCssColorString('#058bfc')
                    }

                    this.movePathEntity[info.id].forEach(item => {
                        if (item) {
                            try {
                                viewer.entities.remove(item)
                            } catch {
                                console.log('删除算子失败');
                            }
                        }
                    })
                    this.movePathEntity[info.id] = [];
                    if (positionArr.length >= 1) {
                        var entity = viewer.entities.getById(info.id);
                        var entPos = getCoordByCartesian3(entity.position.getValue(), viewer);

                        let position = [(entPos.lng * 1 + positionArr[0][0] * 1) / 2, (entPos.lat * 1 + positionArr[0][1] * 1) / 2]


                        var line = viewer.entities.add({
                            polyline: {
                                positions: Cesium.Cartesian3.fromDegreesArray([(entPos.lng * 1 * 1 + position[0] * 1) / 2, (entPos.lat * 1 + position[1] * 1) / 2, (positionArr[0][0] * 1 + position[0] * 1) / 2, (positionArr[0][1] * 1 + position[1] * 1) / 2]),
                                width: 10,
                                arcType: Cesium.ArcType.NONE,
                                material: new Cesium.PolylineArrowMaterialProperty(
                                    Cesium.Color.fromAlpha(color, 0.8)
                                ),
                            }
                        })
                        this.movePathEntity[info.id].push(line)

                        var point = viewer.entities.add({
                            position: Cesium.Cartesian3.fromDegrees(positionArr[0][0], positionArr[0][1]),
                            point: {
                                color: color,
                                pixelSize: 10,
                            },
                        })
                        this.movePathEntity[info.id].push(point)
                    }

                    for (let i = 0; i < positionArr.length - 1; i++) {
                        let position = [(positionArr[i][0] * 1 + positionArr[i + 1][0] * 1) / 2, (positionArr[i][1] * 1 + positionArr[i + 1][1] * 1) / 2]
                        var line = viewer.entities.add({
                            polyline: {
                                positions: Cesium.Cartesian3.fromDegreesArray([(positionArr[i][0] * 1 + position[0] * 1) / 2, (positionArr[i][1] * 1 + position[1] * 1) / 2, (positionArr[i + 1][0] * 1 + position[0] * 1) / 2, (positionArr[i + 1][1] * 1 + position[1] * 1) / 2]),
                                width: 10,
                                arcType: Cesium.ArcType.NONE,
                                material: new Cesium.PolylineArrowMaterialProperty(
                                    Cesium.Color.fromAlpha(color, 0.8)
                                ),
                            }
                        })
                        this.movePathEntity[info.id].push(line)
                        if (i > 0) {

                            var point = viewer.entities.add({
                                position: Cesium.Cartesian3.fromDegrees(positionArr[i][0], positionArr[i][1]),
                                point: {
                                    color: color,
                                    pixelSize: 10,
                                },
                            })
                            this.movePathEntity[info.id].push(point)
                        }
                        viewer._selectedEntity = undefined;
                    }

                    break;
            }
        },
        removeAllPath(viewer) {
            this.shieldMove = [],
                this.movePath = {},

                Object.keys(this.movePathEntity).forEach(item => {
                    console.log(item);
                    this.movePathEntity[item].forEach(i => {
                        console.log(i);
                        viewer.entities.remove(i);
                    })
                })
            this.movePathEntity = {};

        },
        // 创建或更新ai预测的算子
        createOrUpdateAiModel(obj, aiSelect, viewer) {
            let entityId, show;
            obj.forEach(item => {
                item.position.forEach(i => {
                    switch (i.style_type) {
                        case 1:
                            entityId = this.aiPredictionOperator[1];
                            show = aiSelect[1]
                            // 存储id
                            break;
                        case 2:
                            entityId = this.aiPredictionOperator[2];
                            show = aiSelect[2]
                            // 存储id
                            break;
                        case 3:
                            entityId = this.aiPredictionOperator[3];
                            show = aiSelect[3]
                            // 存储id
                            break;
                        case 4:
                            entityId = this.aiPredictionOperator[4];
                            show = aiSelect[4]
                            // 存储id
                            break;
                    }
                    //
                    let id = item.obj_id + 'ai' + i.style_type;
                    let rotation = Cesium.Math.toRadians(360);
                    let index = entityId.findIndex(i => i === id);
                    if (index !== -1) {
                        // 有 更新
                        var entity = viewer.entities.getById(id);
                        entity.position = Cesium.Cartesian3.fromDegrees(i.longitude, i.latitude, i.height);
                    }
                    else {
                        // 无 创建
                        // entityId.push(item.obj_id);
                        let color
                        entityId.push(id);
                        let image;
                        switch (item.sub_type) {
                            case 0:
                                image = 'bqsea_type/red/0-0.png';
                                break;
                            case 1:
                                image = 'bqsea_type/red/1-0.png'
                                break;
                            case 2:
                                image = 'bqsea_type/red/2-0.png'
                                break;
                            case 4:
                                image = 'bqsea_type/red/1-0.png'
                                break;
                            case 7:
                                image = 'bqsea_type/red/7-0.png'
                                break;
                        }
                        let obj = {
                            side: i.style_type, // 必须传的参数 1 代表红方  2 代表蓝方
                            img: image
                        }
                        let img = new aiCanvasIamge(obj);

                        let img_url = img.canvas;
                        var scale = '0.5';
                        let position = Cesium.Cartesian3.fromDegrees(i.longitude, i.latitude, i.height);
                        color = Cesium.Color.fromCssColorString('#404040');


                        entity = viewer.entities.add({
                            id: id,
                            name: item.name,
                            side: item.color,
                            canvas_img: img,
                            show: show,
                            label: {
                                show: true,
                                text: item.name + item.obj_id,
                                font: 'normal 13px MicroSoft YaHei', // 15pt monospace
                                scale: 1,
                                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                fillColor: Cesium.Color.fromCssColorString('#ffffff'),
                                outlineColor: Cesium.Color.fromCssColorString('#ffffff'),
                                outlineWidth: 1,
                                pixelOffset: new Cesium.Cartesian2(0, 38), //偏移量
                                showBackground: true,
                                backgroundColor: color,
                                eyeOffset: new Cesium.Cartesian3(0, 0, this.num_data),
                            },
                            position: position,
                            billboard: {
                                id: item.name,
                                show: true, // default
                                image: img_url,
                                scale: scale, // default: 1.0
                                description: item.name,
                                rotation: rotation,
                                stRotation: rotation,
                                color: Cesium.Color.WHITE,
                                eyeOffset: new Cesium.Cartesian3(0, 0, this.num_data),
                                scaleByDistance: new Cesium.NearFarScalar(2700, 1, 12000, 0.5)
                            }
                        })
                    }
                })
            })
        },
        // 移出ai预测位置算子
        removeAiModel(newValue, oldValue, viewer) {
            oldValue.forEach((item, index) => {
                let id = item.obj_id;
                let findIndex = newValue.findIndex(i => i.obj_id === id);
                if (findIndex === -1) {
                    // 找不到id 移除 
                    oldValue[index].position.forEach(i => {
                        let entityId;
                        switch (i.style_type) {
                            case 1:
                                entityId = this.aiPredictionOperator[1];
                                // 存储id
                                break;
                            case 2:
                                entityId = this.aiPredictionOperator[2];
                                // 存储id
                                break;
                            case 3:
                                entityId = this.aiPredictionOperator[3];
                                // 存储id
                                break;
                            case 4:
                                entityId = this.aiPredictionOperator[4];
                                // 存储id
                                break;
                        }
                        let id = item.obj_id + 'ai' + i.style_type;
                        // 将该id从 entityId 中移移除 并删除算子
                        entityId.splice(entityId.indexOf(id), 1)
                        let entity = viewer.entities.getById(id);
                        if (entity) {
                            viewer.entities.remove(entity);
                        }
                    })
                }
            })
        },
        // 控制ai算子的显示与隐藏
        changePositionPrediction(select, viewer) {
            Object.keys(select).forEach(item => {
                if (select[item]) {
                    this.aiPredictionOperator[item].forEach(i => {
                        let entity = viewer.entities.getById(i);
                        entity.show = true
                    })
                } else {
                    this.aiPredictionOperator[item].forEach(i => {
                        let entity = viewer.entities.getById(i);
                        entity.show = false
                    })
                }
            })
        },
        // 获取模型图片地址
        getHkImgUrl(entityType, side) {
            var that = this
            var result = {
                img_url: "",
                scale: 0.9
            };
            var img_url = "";
            var scale = 0.8;
            if (entityType["m_kind"] == 1 &&
                entityType["m_domain"] == 1) {

                switch (entityType["m_category"]) {
                    case 30:
                        // Airport
                        img_url = "sea-type/" + side + "/1-1-30.png";
                        break;
                    case 4:
                        // DF21D
                        img_url = "sea-type/" + side + "/1-1-4.png";
                        break;
                    case 31:
                        // AN/FPS
                        img_url = "sea-type/" + side + "/1-1-31.png";
                        break;
                    case 34:
                        // 暂时添加
                        img_url = "sea-type/" + side + "/1-1-31.png";
                        break;
                    case 39:
                        // 指挥所
                        img_url = "sea-type/" + side + "/1-1-39.png";
                        break;
                    default:
                        img_url = "";
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
                    case 7:
                        // 暂时添加
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
                        img_url = "sea-type/" + side + "/1-2-50.png";
                        break;
                    default:
                        img_url = "";
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
                    case 2:
                        // 暂时添加
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
                        img_url = "sea-type/" + side + "/1-3-4.png";
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
                        img_url = "";
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
                        img_url = "";
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
                        img_url = "";
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
                        img_url = "";
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
                        img_url = "";
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
                        img_url = "";
                        break;
                }
            }
            result.img_url = img_url;
            result.scale = scale;
            return result;
        },
        // hk创建算子
        modelHkCreate(obj, viewer) {
            if (obj.obj_list) {
                this.createOrUpdateHkModel(obj.obj_list, viewer);
                if (obj.blue_detect_list) {
                    this.createOrUpdateHkModel(obj.blue_detect_list, viewer);
                }
                if (obj.red_detect_list) {
                    this.createOrUpdateHkModel(obj.red_detect_list, viewer);
                }
            }
        },
        //hk创建算子实现
        createOrUpdateHkModel(modellist, viewer) {
            if (!modellist) { return; }
            var that = this, color, m_side, m_id, rotation;
            modellist.forEach(item => {
                if (item.m_Side === 1) {
                    color = Cesium.Color.RED;
                    m_side = "red";
                } else {
                    color = Cesium.Color.BLUE;
                    m_side = "blue";
                }
                item.m_id ? m_id = item.m_id : m_id = item.m_TargetID;

                var entity = viewer.entities.getById(m_id);

                rotation = Cesium.Math.toRadians(360 - item.m_Heading);

                if (!entity) {
                    let img_rs = this.getHkImgUrl(item.m_EntityType, m_side);
                    let img_url = img_rs.img_url;
                    let scale = img_rs.scale;

                    viewer.entities.add({
                        id: m_id,
                        name: item.m_EntityName,
                        side: item.m_Side,
                        label: {
                            text: item.m_EntityName,
                            font: 'normal 13px MicroSoft YaHei', // 15pt monospace
                            scale: 1,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            fillColor: color,
                            outlineColor: Cesium.Color.WHITE,
                            outlineWidth: 3,
                            pixelOffset: new Cesium.Cartesian2(0, 20), //偏移量
                        },
                        position: Cesium.Cartesian3.fromDegrees(item.m_Position.longitude, item.m_Position.latitude, item.m_Position.height),
                        billboard: {
                            image: require(`@/assets/${img_url}`),
                            scale: scale,
                            rotation: rotation,
                        }
                    })
                } else {
                    entity.billboard.rotation = rotation;
                    entity.position = Cesium.Cartesian3.fromDegrees(item.m_Position.longitude, item.m_Position.latitude, item.m_Position.height);
                }

            })

        },
        //hk算子移除
        removeHkItem(newValue,oldValue,viewer){
            if(!newValue || !oldValue){return;}

            for(var i = 0;i<oldValue.length;i++){
                var id;
                if (oldValue[i]["m_id"] !== undefined && oldValue[i]["m_id"] !== "") {
                    id = oldValue[i]["m_id"]
                } else {
                    id = oldValue[i]["m_TargetID"]
                }
                if (id === undefined || id === null) {
                    return
                }

                var isExit = newValue.some(item => {
                    if (item.m_id) {
                        return item.m_id === id
                    }else {
                        return m_TargetID === id
                    }
                })

                if(!isExit){
                    var entity = viewer.entities.getById(id);
                    if(entity){
                        viewer.entities.remove(entity)
                    }
                }
            }
        }
        

    }
}