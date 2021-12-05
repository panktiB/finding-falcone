<template>
  <div>
    <vs-row class="ph-10">
      <vs-select
        v-model="currentSelection['planet_names']"
        icon="fas fa-angle-down"
        icon-pack="fa5"
        class="pv-10"
        :disabled="disabledPlanet"
      >
        <vs-select-item
          v-for="planet in availablePlanets"
          :key="planet['name']"
          :text="planet['name']"
          :value="planet['name']"
        />
      </vs-select>
    </vs-row>
    <vs-row
      v-if="currentSelection['planet_names'].length"
      class="vehicle-selection p-10"
    >
      <vs-radio
        v-for="vehicle in vehicles"
        :key="vehicle['name']"
        v-model="currentSelection['vehicle_names']"
        :vs-name="destination"
        :vs-value="vehicle['name']"
        :disabled="! currentSelection['planet_names'] || getRemainingCount(vehicle) === 0 || ! isFurtherAway(vehicle)"
        class="relative-width-100 pb-5"
        @input="handleComboSelection(vehicle)"
      >
        {{ `${vehicle['name']} (${vehicle['available_no']})` }}
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
      },
      disabledPlanet: {
        type: Boolean,
        default: false,
      },
      searchCombo: {
        type: Object,
        default: () => {},
      }
    },
    data: function () {
      return {
        currentSelection: {},
        debounceTimeout: 100,
        debounce: null,
      };
    },
    computed: {
      vehicles: function () {
        return this.availableVehicles.map(vehicle => {
          let v = this.deepCopy(vehicle);
          this.$set(v, 'available_no', this.getRemainingCount(vehicle));
          return v;
        });
      }
    },
    beforeMount () {
      this.currentSelection = this.deepCopy(this.selection);
    },
    methods: {
      getRemainingCount: function (vehicle) {
        let usedVehicles = this.searchCombo['vehicle_names'].filter(v => v === vehicle['name']);
        return usedVehicles.length <= vehicle['total_no'] ? vehicle['total_no'] - usedVehicles.length : 0;
      },
      isFurtherAway: function (vehicle) {
        let planet = this.availablePlanets.find(p => p['name'] === this.currentSelection['planet_names']);
        return vehicle['max_distance'] >= planet['distance'];
      },
      handleComboSelection: function () {
        if(! this.debounce) {
          this.debounce = setTimeout(() => {
            this.$emit('selected', this.currentSelection);
            this.debounce = null;
          }, this.debounceTimeout);
        }
      }
    },
  };
</script>

<style lang="scss" scoped>
  .vehicle-selection {
    .con-vs-radio {
      justify-content: start;
    }
  }
</style>
