<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        v-model="collapsed"
        :theme="navTheme"
        :trigger="null"
        width="218px"
        collapsible
      >
        <div class="logo">{{ collapsed ? "Pro" : "Ant Design Vue Pro" }}</div>
        <side-menu :theme="navTheme" :layout="collapsed"></side-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-fold' : 'menu-unfold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header></Header>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
      <setting-drawer></setting-drawer>
    </a-layout>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import SettingDrawer from "../components/SettingDrawer";

export default {
  name: "BasicLayout",
  components: { Header, Footer, SideMenu, SettingDrawer },
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  }
};
</script>

<style scoped>
.ant-layout-header {
  height: 48px;
  line-height: 48px;
}
.ant-layout-footer {
  padding-bottom: 10px;
}
.trigger {
  padding: 0 20px;
  line-height: 48px;
  font-size: 20px;
  cursor: pointer;
}

.trigger:hover {
  background-color: #f9f9f9;
}

.logo {
  height: 48px;
  line-height: 48px;
  text-align: center;
  overflow: hidden;
}

.nav-theme-dark >>> .logo {
  color: #ffffff;
}
</style>
