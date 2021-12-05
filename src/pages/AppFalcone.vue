<template>
  <vs-row>
    <vs-col
      v-if="isLoading || staticLoader"
      vs-w="12"
    >
      <vs-row
        class="font-largest pt-200"
        vs-justify="center"
      >
        <span class="pr-10">
          Loading
        </span>
        <vs-icon class="fas fa-spinner spin font-largest" />
      </vs-row>
    </vs-col>
    <vs-col
      v-else
      vs-w="12"
    >
      <vs-row class="pt-20">
        <vs-col vs-w="1" />
        <vs-col
          v-for="(destination, index) in destinations"
          :key="destination['name']"
          vs-w="2"
        >
          <vs-row class="ph-10">
            {{ destination['name'] }}
          </vs-row>
          <search-combo
            :available-planets="planets"
            :available-vehicles="vehicles"
            :destination="destination['name']"
            :selection="destination['selection']"
            :disabled-planet="getSelectionValidation(index)"
            :search-combo="searchCombo"
            @selected="handleComboSelection(...arguments, index)"
          />
        </vs-col>
        <vs-col vs-w="1">
          <vs-row>
            {{ `Time Taken: ${totalTime}` }}
          </vs-row>
        </vs-col>
      </vs-row>
      <vs-row
        vs-justify="center"
        class="pt-30"
      >
        <vs-button
          :disabled="! isValid"
          type="border"
          class="pv-8 ph-10"
          @click="findFalcone"
        >
          Find Falcone
        </vs-button>
      </vs-row>
    </vs-col>
  </vs-row>
</template>

<script>
  import SearchCombo from '../components/SearchCombo';
  import { EventBus } from '../eventBus';
  export default {
    name: 'AppFalcone',
    components: { SearchCombo },
    props: {
      planets: {
        type: Array,
        default: () => []
      },
      vehicles: {
        type: Array,
        default: () => []
      },
      baseDestinations: {
        type: Array,
        default: () => []
      },
    },
    data: function () {
      return {
        searchCombo: {
          token: '',
          planet_names: [],
          vehicle_names: [],
        },
        staticLoader: false,
        destinations: [],
        searchStatus: null,
        errorMessage: '',
      };
    },
    computed: {
      totalTime: function () {
        let time = 0;
        this.searchCombo['vehicle_names'].forEach(vehicle => {
          let v = this.vehicles.find(currVehicle => currVehicle['name'] === vehicle);
          time += v['max_distance'] / v['speed'];
        });
        return time;
      },
      isValid: function () {
        return this.searchCombo['token'].length && this.searchCombo['planet_names'].length === 4 &&
          this.searchCombo['vehicle_names'].length === 4;
      },
      isLoading: function () {
        return ! this.planets.length || ! this.vehicles.length || ! this.destinations.length;
      }
    },
    beforeMount () {
      this.getToken();
      this.destinations = this.deepCopy(this.baseDestinations);
      EventBus.$on('reset', this.handleReset);
    },
    beforeDestroy () {
      EventBus.$off('reset', this.handleReset);
    },
    methods: {
      getToken: function () {
        this.axiosPromise({
          url: '/token',
          method: 'POST',
          data: {},
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => {
          this.searchCombo['token'] = response['token'];
        }).catch(error => {
          console.log(error);
        });
      },
      getSelectionValidation: function (index) {
        if(index !== 0 && index <= this.destinations.length - 1) {
          let selection = this.destinations[index - 1]['selection'];
          return ! (!! selection['planet_names'].length && !! selection['vehicle_names'].length);
        } else {
          return false;
        }
      },
      handleComboSelection: function (combo, index) {
        this.destinations[index]['selection'] = combo;
        this.updateSearchCombo();
      },
      updateSearchCombo: function () {
        this.searchCombo['planet_names'] = [];
        this.searchCombo['vehicle_names'] = [];
        this.destinations.forEach(destination => {
          let selection = destination['selection'];
          if(selection['planet_names'].length && selection['vehicle_names'].length) {
            this.searchCombo['planet_names'].push(selection['planet_names']);
            this.searchCombo['vehicle_names'].push(selection['vehicle_names']);
          }
        });
      },
      handleReset: function () {
        this.staticLoader = true;
        setTimeout(() => {
          this.staticLoader = false;
        }, 100);
        this.destinations = this.deepCopy(this.baseDestinations);
        this.searchCombo = {
          token: '',
          planet_names: [],
          vehicle_names: [],
        };
      },
      findFalcone: function () {
        this.axiosPromise({
          url: '/find',
          method: 'POST',
          data: this.searchCombo,
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => {
          this.errorMessage = '';
          this.searchStatus = response;
          this.routeTo('SearchStatus', {
            status: response,
            error: '',
            timeTaken: this.timeTaken
          });
        }).catch(error => {
          this.searchStatus = null;
          this.errorMessage = error;
          this.routeTo('SearchStatus', {
            error: error
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .spin {
    animation: continousRotate 2s infinite;
  }
  @keyframes continousRotate {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
