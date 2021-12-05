<template>
  <div id="app">
    <landing-page />
  </div>
</template>

<script>

import LandingPage from './pages/LandingPage';
export default {
  name: 'App',
  components: { LandingPage }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
</style>
