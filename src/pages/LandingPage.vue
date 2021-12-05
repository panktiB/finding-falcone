<template>
  <div>
    <nav-bar />
    <vs-row class="content-container">
      <vs-col vs-w="12">
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
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar';
  import SearchCombo from '../components/SearchCombo';
  export default {
    name: 'LandingPage',
    components: { SearchCombo, NavBar },
    data: function () {
      return {
        planets: [],
        vehicles: [],
        searchCombo: {
          token: '',
          planet_names: [],
          vehicle_names: [],
        },
        destinations: [
          {
            name: 'Destination 1',
            selection: {
              planet_names: '',
              vehicle_names: '',
            }
          },
          {
            name: 'Destination 2',
            selection: {
              planet_names: '',
              vehicle_names: '',
            }
          },
          {
            name: 'Destination 3',
            selection: {
              planet_names: '',
              vehicle_names: '',
            }
          },
          {
            name: 'Destination 4',
            selection: {
              planet_names: '',
              vehicle_names: '',
            }
          },
        ]
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
      }
    },
    beforeMount () {
      this.fetchPlanets();
      this.fetchVehicles();
    },
    methods: {
      fetchPlanets: function () {
        this.axiosPromise({
          url: '/planets',
          method: 'GET'
        }).then(planets => {
          this.planets = planets;
        }).catch(error => {
          console.log(error);
        });
      },
      fetchVehicles: function () {
        this.axiosPromise({
          url: '/vehicles',
          method: 'GET'
        }).then(vehicles => {
          this.vehicles = vehicles;
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
    }
  };
</script>

<style lang="scss" scoped>
  .content-container {
    height: calc(100vh - 50px);
    max-height: calc(100vh - 50px);
    overflow-y: auto;
  }
</style>
