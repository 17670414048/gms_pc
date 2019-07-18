<template>
  <div id="app">
    <div class="wrapper">
      <headers v-if="!login"></headers>
      <side v-if="!login"></side>
      <!--
    <keep-alive> 
        <router-view v-if="$route.meta.keepAlive"></router-view> 
    </keep-alive> 
    <router-view v-if="!$route.meta.keepAlive"></router-view>
      <footers></footers>-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import headers from "./components/headers.vue";
import side from "./components/side.vue";
import login from './components/login.vue';
export default {
  name: "app",
  components: {
    headers,
    side,
    login
  }
};
</script>
<style>
@import "./statics/css/base.css";
#app,
.wrapper,
body,
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.content-box {
  position: absolute;
  left: 250px;
  right: 0;
  top: 70px;
  bottom: 0;
  padding-bottom: 0;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
}

.el-pagination {
  text-align: center;
}

</style>
