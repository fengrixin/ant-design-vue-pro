<template>
  <div class="basic-view">
    <Header></Header>
    <side-menu></side-menu>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";

export default {
  name: "BasicLayout",
  components: { Header, Footer, SideMenu }
};
</script>

<style scoped></style>
