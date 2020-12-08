<template>
  <div :class="{'has-logo':showLogo}">
    <!--        <logo v-if="showLogo" :collapse="isCollapse"/>-->
    <el-menu
      style="margin-left: 0;"
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="horizontal"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img src="../../../assets/icon.jpg" class="user-avatar">
            <i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>
            <!--            <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">-->
            <!--              <el-dropdown-item>Github</el-dropdown-item>-->
            <!--            </a>-->
            <!--            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">-->
            <!--              <el-dropdown-item>Docs</el-dropdown-item>-->
            <!--            </a>-->
            <el-dropdown-item divided @click.native="logout_api()">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  import variables from '@/styles/variables.scss'
  import { logout } from '@/api/user'

  export default {
    components: { SidebarItem },
    methods: {
      logout_api: function() {
        logout().then(response => {
          this.$store.dispatch('user/logout').then((code) => {
            this.$router.push('/')
          })
        })
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ]),

      routes() {
        return this.$router.options.routes
      },
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      showLogo() {
        // return this.$store.state.settings.sidebarLogo
        return true
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style lang="scss" scoped>
  .right-menu {
    float: right;
    line-height: 50px;
    height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 8px;
        position: relative;
        height: 40px;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>
