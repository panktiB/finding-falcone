<template>
  <div>
    <vs-row class="fixed-height-50">
      <vs-col
        vs-w="4"
        vs-offset="4"
        vs-type="flex"
        vs-align="center"
        vs-justify="center"
        class="text-primary font-largest"
      >
        Finding Falcone!
      </vs-col>
      <vs-col
        vs-w="4"
        vs-type="flex"
        vs-align="center"
        vs-justify="end"
        class="pr-10"
      >
        <vs-button
          type="flat"
          class="pv-5 ph-10"
          @click="resetSearch"
        >
          Reset
        </vs-button>
        <span class="-5">
          |
        </span>
        <vs-button
          type="flat"
          class="pv-5 ph-10"
          @click="goToGeekTrust"
        >
          GeekTrust Home
        </vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
  import { EventBus } from '../eventBus';

  export default {
    name: 'NavBar',
    methods: {
      goToGeekTrust: function () {
        window.open('https://www.geektrust.in/', '_blank');
      },
      resetSearch: function () {
        EventBus.$emit('reset');
      }
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
