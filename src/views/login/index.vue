<template>
  <div class="login-container">
    <div class="bg"></div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
             label-position="left">
      <img class="logo" src="../../assets/logo.png"/>
<!--      <div class="title-container">-->
<!--        <h3 class="title">基于区块链的物联网众包测试系统</h3>-->
<!--      </div>-->

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="address" v-if="loginType==='注册'">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.address"
          placeholder="Address"
          name="Address"
          type="text"
          tabindex="1"
          auto-complete="on"
          maxlength="42"
          minlength="42"
        />
      </el-form-item>
      <el-form-item prop="privateKey" v-if="loginType==='注册'">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          ref="key"
          v-model="loginForm.privateKey"
          placeholder="privateKey"
          name="privateKey"
          type="text"
          tabindex="1"
          auto-complete="on"
          maxlength="64"
          minlength="64"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>
      <el-row :gutter="1">
        <el-col :span="12">
          <el-button :loading="loading" style="width:100%;margin-bottom:30px;"
                     @click.native.prevent="handleLogin">{{ loginType }}
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button :loading="loading" style="width:100%;margin-bottom:30px;" @click="changeType">切换
          </el-button>
        </el-col>
      </el-row>

      <!--      <div class="tips">-->
      <!--        <span style="margin-right:20px;">username: admin</span>-->
      <!--        <span> password: any</span>-->
      <!--      </div>-->

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const validateAddress = (rule, value, callback) => {
      if (value.length != 42) {
        callback(new Error('The address length must be 42'))
      } else {
        callback()
      }
    }
    return {
      loginType: '登录',
      loginForm: {
        username: 'admin',
        password: '111111',
        address: '',
        privateKey: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        address: [{ required: true, trigger: 'blur', validator: validateAddress }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    changeType() {
      if (this.loginType === '登录') {
        this.loginType = '注册'
        return
      }
      if (this.loginType === '注册') {
        this.loginType = '登录'
        return
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.loginType === '注册') {
            this.$store.dispatch('user/signup', this.loginForm).then((code) => {
              this.$router.push({ path: this.redirect || '/', query: { type: 'register' } })
              this.loading = false
              if (code === '200') {
                this.changeType()
              }
            }).then(() => {
              this.loading = false
            })
          } else {
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/', query: { type: 'login' } })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          }

        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  //background-color: $bg;
  overflow: hidden;
  .bg {
    /* The image used */
    background-image: url("../../assets/pic2.jpg");
    /* Full height */
    height: 1050px;
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .login-form {
    position: relative;
    width: 800px;
    //height: 700px;
    max-width: 100%;
    padding: 100px 120px;
    margin-top: -900px;
    margin-left: 630px;
    overflow: hidden;
    background-color: #2b2f3a;
    filter: alpha(0.95);
    border-radius: 10px;
    //border-color: black;
    //border-style: solid;
    box-shadow: 5px 5px 5px 5px black;
    .logo {
      height: 200px;
      width: auto;
      margin-top: 0px;
      margin-left: 100px;
    }
    .el-button {
      background-color: transparent;
      border-color: white;
      color: white;
      margin-left: 0px;
    }
    .el-button:hover {
      background-color: transparent;
      border-color: white;
      color: white;
      margin-left: 0px;
      box-shadow: 2px 2px 2px #888888;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
