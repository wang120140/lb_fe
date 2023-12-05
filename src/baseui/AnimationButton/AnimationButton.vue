<template>
  <div class="button" ref="button" :style="{background:bgc,color:ftc,fontSize:fns}" @click="wavesEffect">
    <p :style="{lineHeight:height}">{{content}}</p>
    <div class="wavesbtn"  ref="wavesbtn"></div>
  </div>
</template>
<script>
export default {
  props:{
    content:{
      type:String,
      default:'按钮'
    },
    bgc:{
      type:String,
      default:'#409eff'
    },
    ftc:{
      type:String,
      default:'#fff'
    },
    anc:{
      type:String,
      default:'#fff'
    },
    fns:{
      type:String,
      default:'12px'
    }

  },
  
  data() {
    return {
      height: 0,
    };
  },
  mounted(){
    this.height = this.$refs.button.offsetHeight + 'px'
  },
  methods: {
    wavesEffect(e) {
      e = e || window.event;
      let position = e.target.getBoundingClientRect();
      let doc = document.documentElement;
      let div = document.createElement("div");
      div.className = "effect";
      
      this.$refs.wavesbtn.appendChild(div);

      let top = e.pageY - (position.top + window.pageYOffset) - doc.clientTop;
      let left =
        e.pageX - (position.left + window.pageXOffset) - doc.clientLeft;
      let dur = 750;
      
      div.style = `
        left:${left}px;
        top:${top}px;
        transform:scale(20);
        background:${this.anc};
        transition-duration: 1s;
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);`;
      setTimeout(() => {
        div.style = `
        transition-duration: 1s;
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        opacity:0;
        background:${this.anc};
        left:${left}px;
        top:${top}px;
        transform:scale(10);`;
        setTimeout(() => {
          this.$refs.wavesbtn.removeChild(div);
        }, dur);
      }, 100);
      // div.style.background = this.anc
    }
  }
};
</script>
<style scoped>
.button {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  overflow: hidden;
}
p {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.wavesbtn {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
<style>
.effect {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: all 0.7s ease-out;
  transform: scale(0);
  transition-property: transform, opacity, -webkit-transform;
  opacity: 1;
  pointer-events: none;
}
</style>
