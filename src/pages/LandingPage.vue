<template>
  <div>
    <nav-bar />
    <vs-row class="content-container">
      <vs-col vs-w="12">
        <vs-row>
          <vs-col
            v-for="destination in destinations"
            :key="destination['name']"
            vs-w="3"
            class="bordered-primary"
          >
            <vs-row>
              {{ destination['name'] }}
            </vs-row>
            <search-combo
              :available-planets="planets"
              :available-vehicles="vehicles"
              :destination="destination['name']"
              :selection="destination['selection']"
            />
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
