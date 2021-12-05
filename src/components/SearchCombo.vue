<template>
  <div>
    <vs-row>
      <vs-select
        v-model="currentSelection['planet_names']"
        icon="fas fa-angle-down"
        icon-pack="fa5"
      >
        <vs-select-item
          v-for="planet in availablePlanets"
          :key="planet['name']"
          :text="planet['name']"
          :value="planet['name']"
        />
      </vs-select>
    </vs-row>
    <vs-row>
      <vs-radio
        v-for="vehicle in availableVehicles"
        :key="vehicle['name']"
        v-model="currentSelection['vehicle_names']"
        :vs-name="destination"
        :vs-value="vehicle['name']"
        class="relative-width-100 bordered-primary"
      >
        {{ vehicle['name'] }}
      </vs-radio>
    </vs-row>
  </div>
</template>

<script>
  export default {
    name: 'SearchCombo',
    props: {
      availablePlanets: {
        type: Array,
        default: () => [],
      },
      availableVehicles: {
        type: Array,
        default: () => [],
      },
      destination: {
        type: String,
        default: '',
      },
      selection: {
        type: Object,
        default: () => {
          return {
            planet_names: '',
            vehicle_names: '',
          };
        },
      }
    },
    data: function () {
      return {
        currentSelection: {},
      };
    },
    beforeMount () {
      this.currentSelection = this.deepCopy(this.selection);
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
  
</style>
