<template>
  <div>
    <nav-bar />
    <vs-row class="content-container">
      Landing Page
    </vs-row>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar';
  export default {
    name: 'LandingPage',
    components: { NavBar }
  };
</script>

<style lang="scss" scoped>
  .content-container {
    height: calc(100vh - 50px);
    max-height: calc(100vh - 50px);
    overflow-y: auto;
  }
</style>
