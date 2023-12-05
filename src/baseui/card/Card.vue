<template>
    <div class="card" ref="card" >
        <dv-border-box-10  :color="['#4083E2', '#40ace2']" :dur="10">
            <slot>
            </slot>
        </dv-border-box-10>
        
        <!-- <div :style="{height:height*0.1+'px',width:width*0.1+'px'}" class="left_top border_box"></div>
        <div :style="{height:height*0.1+'px',width:width*0.1+'px'}" class="left_bottom border_box"></div>
        <div :style="{height:height*0.1+'px',width:width*0.1+'px'}" class="right_top border_box"></div>
        <div :style="{height:height*0.1+'px',width:width*0.1+'px'}" class="right_bottom border_box"></div> -->
    </div>
</template>

<script>
    export default {
        mounted () {
         
        },
        data() {
            return {
                height: '',
                width:''
            };
        },
    }
</script>

<style scoped>
    .card{
        box-sizing: border-box;
        display: inline-block;
        position: relative;
        /* border: 1px solid #64636C; */
        position: relative;
    }
    .left_top{

        position: absolute;
        left: -1.5px;
        top: -1.5px;
        border-top: 3px solid #4083E2;
        border-left: 3px solid #4083E2;
    }
    .left_bottom{

        position: absolute;
        left: -1.5px;
        bottom: -1.5px;
        border-bottom: 3px solid #4083E2;
        border-left: 3px solid #4083E2;
    }
    .right_top{

        position: absolute;
        right: -1.5px;
        top: -1.5px;
        border-top: 3px solid #4083E2;
        border-right: 3px solid #4083E2;
        z-index: 1;
    }
    .right_bottom{
        position: absolute;
        right: -1.5px;
        bottom: -1.5px;
        border-bottom: 3px solid #4083E2;
        border-right: 3px solid #4083E2;
    }

</style>