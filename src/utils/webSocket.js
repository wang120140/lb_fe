import Stomp from 'stompjs'
import bus from './bus';

export function openMessage(pram) {
    // if (window.my_config.selectOne === 1) {
    //     return createMq(pram)
    // } else if (window.my_config.selectOne === 2) {
    //     let _a = new allSocket1()
    //     return _a.createWebSocket(pram)
    // } else {

    // }
    let _a = new allSocket1()
    _a.createWebSocket(pram)
    return _a
    

}


class allSocket1 {
    constructor(x) {
        this.lockReconnect = false;
        // this.wsUrl = `${window.my_config.webSocketPostion}?user=${window.my_config.user}&token=${window.my_config.tokenSession}`;
        this.wsUrl = `${window.my_config.WebSocketWs}`;
        this.ws = null;
        this.ws = null;
        this.tt = null;
        this.timeout = 6000;
        this.timeoutObj = null;
        this.serverTimeoutObj = null;
        this.isHeartCheck = true;
        this.num = 0; // 限制100次
        this.status = 'disconn'
    }
    init() {
        let self = this
        this.ws.addEventListener('open', e => {
            console.log('长连接连接成功')
            self.num = 0;
            bus.$emit("openWs",{
                isOpen:true
            })
            self.isHeartCheck && self.heartCheck();
            self.status = 'conn'
        })

        this.ws.addEventListener('message', e => {
            // console.log('接收到消息');
            self.isHeartCheck && self.heartCheck();
        })
        this.ws.addEventListener('close', e => {
            console.log(e)
            console.log('链接关闭..........');
            self.status = 'disconn'

            self.reconnect();
        })
        this.ws.addEventListener('error', e => {
            console.log(e)
            console.log('发生异常了..............');
            self.status = 'disconn'
            // self.num++
            // self.num<100 && self.reconnect(self.wsUrl);
            self.reconnect();
        })
    }
    createWebSocket(pram) {
        try {
            if (pram && pram.useID) {
                this.wsUrl = `${window.my_config.webSocketPostion}?user=${pram.useID}&token=${pram.token}`
            }
   
            this.wsUrl = `${window.my_config.WebSocketWs}?user=aaa&token=123`
            this.ws = new WebSocket(this.wsUrl);
            this.init();
            return this.ws
        } catch (e) {
            console.log('catch');
            this.reconnect(this.wsUrl);
        }
    }

    reconnect(url) {
        let self = this;
        if (this.lockReconnect) {
            return;
        };
        this.lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        this.tt && clearTimeout(this.tt);
        this.tt = setTimeout(function () {
            self.createWebSocket(url);
            self.lockReconnect = false;
        }, 6000);
    }
    heartCheck() {
        // console.log('heartCheck');
        let self = this;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            let _temp = JSON.stringify({
                PING: 1
            })
            self.ws.send(_temp);
            // self.serverTimeoutObj = setTimeout(function () {
            //     console.log(self.ws);
            //     self.ws.close();

            // }, self.timeout);

        }, this.timeout)
    }

}


export function openMessage2(pram) {
    // if (window.my_config.selectOne === 1) {
    //     return createMq(pram)
    // } else if (window.my_config.selectOne === 2) {
    //     let _a = new allSocket1()
    //     return _a.createWebSocket(pram)
    // } else {

    // }
    let _a = new allSocket2()
    _a.createWebSocket(pram)
    return _a
    

}


class allSocket2 {
    constructor(x) {
        this.lockReconnect = false;
        // this.wsUrl = `${window.my_config.webSocketPostion}?user=${window.my_config.user}&token=${window.my_config.tokenSession}`;
        this.wsUrl = `${window.my_config.WebSocketWs2}`;
        this.ws = null;
        this.ws = null;
        this.tt = null;
        this.timeout = 6000;
        this.timeoutObj = null;
        this.serverTimeoutObj = null;
        this.isHeartCheck = true;
        this.num = 0; // 限制100次
    }
    init() {
        let self = this
        this.ws.addEventListener('open', e => {
            console.log('长连接连接成功')
            self.num = 0;
            self.isHeartCheck && self.heartCheck();
        })

        this.ws.addEventListener('message', e => {
            // console.log('接收到消息');
            self.isHeartCheck && self.heartCheck();
        })
        this.ws.addEventListener('close', e => {
            console.log(e)
            console.log('链接关闭..........');
            

            self.reconnect();
        })
        this.ws.addEventListener('error', e => {
            console.log(e)
            console.log('发生异常了..............');
            // self.num++
            // self.num<100 && self.reconnect(self.wsUrl);
            self.reconnect();
        })
    }
    createWebSocket(pram) {
        try {
            if (pram && pram.useID) {
                this.wsUrl = `${window.my_config.webSocketPostion}?user=${pram.useID}&token=${pram.token}`
            }
   
            this.wsUrl = `${window.my_config.WebSocketWs2}`
            this.ws = new WebSocket(this.wsUrl);
            this.init();
            return this.ws
        } catch (e) {
            console.log('catch');
            this.reconnect(this.wsUrl);
        }
    }

    reconnect(url) {
        let self = this;
        if (this.lockReconnect) {
            return;
        };
        this.lockReconnect = true;
        //没连接上会一直重连，设置延迟避免请求过多
        this.tt && clearTimeout(this.tt);
        this.tt = setTimeout(function () {
            self.createWebSocket(url);
            self.lockReconnect = false;
        }, 6000);
    }
    heartCheck() {
        // console.log('heartCheck');
        let self = this;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            let _temp = JSON.stringify({
                PING: 1
            })
            self.ws.send(_temp);
            // self.serverTimeoutObj = setTimeout(function () {
            //     console.log(self.ws);
            //     self.ws.close();

            // }, self.timeout);

        }, this.timeout)
    }

}

function createMq() {
    var ws = new WebSocket(window.my_config.WebSocketWs);
    var client = Stomp.over(ws)
    client.heartbeat.outgoing = 50000;
    client.heartbeat.incoming = 50000;
    client.reconnect_delay = 50000;
    client.debug = null;
    // 定义连接成功回调函数
    var on_connect = function () {};
    // 定义错误时回调函数
    var on_error = function (err) {
        console.log(err);
    };
    // 连接RabbitMQ
    client.connect('admin', 'admin', on_connect, on_error, '/command');
    console.log(`>>>连接上http://${window.my_config.WebSocketWs}:15674`);
    return client
}
function getUUID1(randomLength) {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return ("p"+S4() + S4()  + S4()  + S4()  + S4()  + S4() + S4() + S4())
}