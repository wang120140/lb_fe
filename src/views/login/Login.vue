<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img :src="require('@/assets/login.png')" alt="" />
      </div>
      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        :rules="rules"
        label-width="0px"
        class="login_form"
        ref="LoginFormRef"
      >
        <el-form-item prop="username">
          <!-- <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input> -->
          <div class="form-control">
            <input autocomplete="new-password" v-model="loginForm.username" type="value" required="">
            <label>
                <span style="transition-delay:0ms">U</span><span style="transition-delay:50ms">s</span><span style="transition-delay:100ms">e</span><span style="transition-delay:150ms">r</span><span style="transition-delay:200ms">n</span><span style="transition-delay:250ms">a</span><span style="transition-delay:300ms">m</span><span style="transition-delay:350ms">e</span>
            </label>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <!-- <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input> -->
          <div class="form-control">
            <input autocomplete="new-password" v-model="loginForm.password" type="password" required="">
            <label>
                <span style="transition-delay:0ms">P</span><span style="transition-delay:50ms">a</span><span style="transition-delay:100ms">s</span><span style="transition-delay:150ms">s</span><span style="transition-delay:200ms">w</span><span style="transition-delay:250ms">o</span><span style="transition-delay:300ms">r</span><span style="transition-delay:350ms">d</span>
            </label>
          </div>
        </el-form-item>
        <el-form-item class="btns">
          <el-button
            type="primary"
            round
            style="background-color: #ff495a; border: 1px solid #eee"
            @click="resetForm"
            >重置</el-button
          >
          <el-button
            type="info"
            round
            style="background-color: #058bfc; border: 1px solid #eee"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

//导入登录接口模块
export default {
  data() {
    return {
     // 表单数据对象
      loginForm: {
        username: "",
        password: "",
      },
     // 表单数据验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
        this.$router.push(
            {
                name:'mapView'
            }
        )
    },
    //添加表单重置方法
    resetForm() {
      this.loginForm = {
        username: "",
        password: "",
      }
    },
    inputClick(){
      this.$refs.input.blur()
    }
  },
};
</script>

<style lang="scss" scoped>
.login_container {
//   background-color: lightcoral;
background-color: #fff;
  height: 100%;
}
.login_box {
    width: 450px;
    height: 350px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    background: linear-gradient(315deg, #dadada, #ffffff);
    box-shadow:  -26px -26px 52px #cecece,
                26px 26px 52px #ffffff;


   
    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px; 
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      background: linear-gradient(315deg, #dadada, #ffffff);
    box-shadow:  -26px -26px 52px #cecece,
                26px 26px 52px #ffffff;
    }
    .avatar_box img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns {
    display: flex;
    justify-content: flex-end;
}


.form-control {
  position: relative;
  margin: 20px 0 0 0;
  margin-left: 10%;
  width: 80%;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #000000 solid;
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  color: #7e7e7e;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: rgb(0, 5, 7);
}

.form-control label {
  position: absolute;
  top: 0px;
  left: 0;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  color: #7e7e7e;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus+label span,
.form-control input:valid+label span {
  color: #058bfc;
  transform: translateY(-30px);
}
</style>
