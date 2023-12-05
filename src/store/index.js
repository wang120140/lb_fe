import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


// 1712200 0000 0000 25068
const store = new Vuex.Store({
    state() {
        return {
            TargetDate:[],
            ParamsDeployDate:[],
            openAram_ctr:false   
        }
    },
    mutations: {
        initTargetDate(state,data){
            state.TargetDate = data
        },
        initParamsDeployDate(state,data){
            state.ParamsDeployDate = data
        },
        changeOpenAram_ctr(state,data){
            state.openAram_ctr = data
        }
    },

    modules: {

    }
})


export default store