<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" /><br />
    <span><strong>本项目由 Vue.js 驱动</strong></span
    ><br /><br />
    <span
      ><a href="https://github.com/NeserCode/Leetcode-Api" target="_blank">
        <img
          title="GitHub stars"
          src="https://img.shields.io/github/stars/NeserCode/Leetcode-Api?style=flat" /></a
      >&nbsp;&nbsp;
      <img
        title="GitHub download"
        src="https://img.shields.io/github/downloads/NeserCode/Leetcode-Api/total?label=GitHub&style=social"
      />
    </span>
    <Home />
  </div>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
