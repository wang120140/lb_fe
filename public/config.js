const gameId = 'sft1535'; //房间id
const swaggerUrl = 'http://172.18.30.107:8083/swagger-ui.html#/' //swagger的ip地址
const serviceIp = 'http://172.18.30.107' //服务器部署地址
window.my_config = {

    WebSocketIP: '172.18.30.54', //消息队列地址
    // WebSocketWs: "ws://172.18.30.54:15674/ws",
    // WebSocketWs:"ws://10.1.18.156:8083/ws/ssh",
    WebSocketWs:"ws://10.1.18.132:8686/ShellRunningEndPoint",// 脚本


    
    WebSocketWs2:"ws://10.1.18.210:8686/CommandRunningEndPoint",//命令

    historyUrl:"http://172.18.30.107:8087/ai_conversation/answer_context",

    /**
     * 本组算法信息
     */
    testEnvironment:true, //true 测试环境（有一些测试用的发送逻辑） false 部署环境（比较稳定的的发送功能）
    selectOne: 2, // 1 mq ; 2 websockt
    defaultPosition: true, // 这个是本组算法的
    exchange: { // 默认配置  这个是本组算法的
        inputDialogMessage: function (user, token) {
            return `/exchange/test.chat.user.input.question/${user}.${token}`
        },
        outputDialogMessage: function (user, token) {
            return `/exchange/test.chat.user.output.answer/${user}.${token}`
        }
    },
    webSocketPostion: 'wss://172.18.30.107:15673/mutiModeChatEndPoint',
    ASRSocketPosition:'wss://172.18.30.107:15673/server/speech/realtime',
    // webSocketPostion:'ws://10.1.18.132:8089/mutiModeChatEndPoint',
    // webSocketPostion: 'ws://10.1.18.132:8089/mutiModeChatEndPoint',
    // ASRSocketPosition:'ws://159.226.21.243:6001/server/speech/realtime',
    user: '90',
    tokenSession: getUUID1(),
    uid:'90',
    realtime:'True',
    
    max_len:30,



    /**
     * 算法组的信息
     */
    // selectOne:1,// 1 mq ; 2 websockt
    // defaultPosition:false,// 这个是算法组的
    // exchange:{ // 默认组   这个是算法的组的
    //     inputDialogMessage:function (user,token){
    //         return `/exchange/chat.user.input.question/${user}.${token}`
    //     },
    //     outputDialogMessage:function (user,token){
    //         return `/exchange/chat.user.output.answer/${user}.${token}`
    //     }
    // }
}
window.openLay_common = {
    mapLayer:{},// 地图图层
    mapView:{},// 地图视图信息
    vectorLayer_point:{},// 点图层
    vectorLayer_line:{},// 线图层
    ExampleModify:{},//选择区域
    aramId_arr:[]
}

window.position = {
    '美济礁':{
        latitude:9.911825,
        longitude:115.5290606
    },
    '仁爱礁':{
        latitude:9.73618359375,
        longitude:115.850724609375
    },
    '仙宾礁':{
        latitude:9.7512,
        longitude:116.5168
    },
    '机场':{
        longitude:117.28993359375,
        latitude:8.5771259765625
    },
    '港口':{
        longitude:119.34715501406036,
        latitude:10.709278219376111
    },
    '港口2':{
        longitude:118.72914257812502,
        latitude:9.8844990234375
    }
}
function getUUID1(randomLength) {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return ("p"+S4() + S4()  + S4()  + S4()  + S4()  + S4() + S4() + S4())
}