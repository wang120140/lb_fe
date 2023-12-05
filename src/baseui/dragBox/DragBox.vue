<template>

    <div class="dragBox" ref="dragBox" :style="{top:settop(),left:setleft()}">
        <div class="dragBar" @mousedown="dragBoxDown"  @mouseup="dragBoxUp">
            <span class="title">{{title}}</span>
            <span class="close" @click="close"><i class="el-icon-close"></i></span>
        </div>
        <slot></slot>
    </div>
    
    
</template>

<script>
    export default {
        name:'drsgBox',
        props:{
            title:{
                type:String
            },
            setX:{
                type:String
            },
            setY:{
                type:Number
            }
        },
        mounted () {
            var that = this
            this.height = this.$refs.dragBox.offsetHeight;
            this.width = this.$refs.dragBox.offsetWidth;
            this.top = this.setY;
            this.left = this.setX;

            document.querySelector('body').addEventListener('mousemove',function(e){
                if(that.move){
                    that.left = that.X - (that.initialX - e.pageX);
                    that.top = that.Y - (that.initialY - e.pageY);
                }
            })
        },
        data() {
            return {
                height: '',
                width:'',
                initialX:'', //鼠标按下时的位置
                initialY:'', 
                X:'',//盒子位置
                Y:'',
                top: 0,
                left:0,
                move:false,
            };
        },
 
        methods:{
            settop(){
                    return this.top + 'px'
            },
            setleft(){
                    return this.left + 'px'
            },
            dragBoxDown(e){
                this.initialX = e.pageX
                this.initialY = e.pageY
                this.X = this.$refs.dragBox.offsetLeft;
                this.Y = this.$refs.dragBox.offsetTop;
                this.left = this.X
                this.top = this.Y
                this.move = true;
            },
            dragBoxUp(e){
                this.move = false
            },
            close(){
                this.$emit('close',this.title)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dragBox{
        position: fixed;
        border-radius: 12px;
        background-color: #2b4a6b;
        padding-bottom: 10px;
        border: 1px solid #3d3f46;
        /* box-shadow: 15px 15px 18px 0 #31608f; */
    }
    .dragBar{
        width: 100%;
        height: 30px;
        background-color: #31608f;
        border-radius: 10px 10px 0 0;
        cursor: pointer;
    }
    .title{
        display: inline-block;
        width: 100%;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 18px;
        color: #00c2ff;
        font-weight: 600;
        letter-spacing:5px  
    }
    .close{
        position: absolute;
        top: 7px;
        right: 10px;
        color: #fff;
    }
    .close:hover{
        color: rgb(211, 51, 51);
        
    }



</style>