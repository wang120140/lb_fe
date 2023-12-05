<template>
    <div class="timeLineBox">
        <div class="control">
            <div @click="handlerClick('back')" class="controlItem back"><i class="el-icon-caret-left"></i></div>
            <div @click="handlerClick('suspend')" class="controlItem suspend"><i class="el-icon-video-play"></i></div>
            <div @click="handlerClick('forward')" class="controlItem forward"><i class="el-icon-caret-right"></i></div>
        </div>
        <div class="pmgressbar">
            <el-slider @input="sliderInput" @mousedown.native ="sliderDown" @mouseup.native ="sliderUp" style="width:100%" v-model="sliderValue" :show-tooltip="false"></el-slider>
        </div>
        <div class="rate">
            <div class="reset" @click="handlerClick('refresh')">
                <i class="el-icon-refresh"></i>
            </div>
            <div class="select">
                <el-dropdown @command="handleCommand"  trigger="click">
                  <span class="el-dropdown-link">
                    {{speed}} 倍速<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="5">5X</el-dropdown-item>
                    <el-dropdown-item command="3">3X</el-dropdown-item>
                    <el-dropdown-item command="2">2X</el-dropdown-item>
                    <el-dropdown-item command="1">1X</el-dropdown-item>
                    <el-dropdown-item command="0.5">0.5X</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['startTime','endTime','currentTime'],
        data() {
            return {
                speed:1,
                sliderValue:0,
                ismouseDown:false
            };
        },
        computed:{
            // sliderValue(){
            //     if(this.startTime && this.endTime && this.currentTime){
            //         let total = this.endTime - this.startTime;
            //         let current = this.currentTime - this.startTime;
            //         let percentage = current / total * 100;
            //         return percentage;
            //     }else {
            //         return 0
            //     }
            // }
            totalTime(){
                if(this.startTime && this.endTime){
                    return (new Date(this.endTime) - new Date(this.startTime))
                }
            }
        },
        methods: {
            handleCommand(speed){
                this.speed = speed
            },
            sliderDown(){
                // 进度条按下开始改变
                this.ismouseDown = true;
                console.log('down');
            },
            sliderUp(){
                console.log('up');
                this.ismouseDown = false;
                // 进度条松开进行值的改变发送
            },
            sliderInput(value){
                if(this.ismouseDown){
                    console.log(value);
                }
                // 拖动进度条改变
            },
            handlerClick(type){
                
            }
        },
        watch: {
            currentTime:{
                handler:function(newValue,oldValue){
                    if(!this.ismouseDown){
                        if(newValue){
                            // console.log(newValue - oldValue);
                            let current = newValue - new Date(this.startTime);
                            this.sliderValue = (current / this.totalTime * 100 )
                        } 
                    }
                }
            }
        }
    }
    1681348187226
    1677574669023
</script>

<style lang="scss" scoped>
    .timeLineBox {
        width: 60%;
        height: 40px;
        background-color: #0000006c;
        border-radius: 10px;
        display: flex;
        .control {
            display: flex;
            width: 200px;
            height: 40px;
            .controlItem {
                flex: 1;
                text-align: center;
                line-height: 40px;
                color: #fff;
                font-size: 20px;
                cursor: pointer;
                border-radius: 25px;
                &:hover {
                    color:#409eff;
                }
            }
        }
        .pmgressbar {
            display: flex;
            height: 40px;
            flex: 1;
        }
        .rate {
            display: flex;
            width: 200px;
            height: 40px;
            .select {
                flex: 1;
                text-align: center;
                line-height: 40px;
                color: #fff;
                ::v-deep(.el-dropdown){
                    color: #fff;
                    cursor: pointer;
                }

                ::v-deep(.el-dropdown:hover){
                    color: #409eff;
                }
            }
            .reset {
                flex: 1;
                text-align: center;
                line-height: 40px;
                color: #fff;
                font-size: 20px;
                cursor: pointer;
                &:hover {
                    color:#409eff;
                }
            }
        }
    }
    
</style>