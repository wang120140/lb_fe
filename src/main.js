import Vue from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import bus from './utils/bus'
import rejectElement from './global/index'
import {
    openMessage,
    openMessage2
} from './utils/webSocket';
import 'ant-design-vue/dist/antd.css';
Vue.prototype.$eventBus = bus
const app = new Vue({
    router,
    store,
    render: h => h(App),
})
Vue.use(Antd);
// if(process.env.NODE_ENV != 'development'){
//     // 重置 console.log 方法，控制台不在输出信息
//     console.log = function () {
//         return false;
//     };

//     // 重置 console.info 方法，控制台不在输出信息
//     console.info = function () {
//         return false;
//     };
// }
rejectElement(Vue)

// Vue.prototype.$client = openMessage()



// Vue.prototype.$client2 = openMessage2()

app.$mount('#app');