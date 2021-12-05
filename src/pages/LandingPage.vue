<template>
  <div>
    <nav-bar />
    <vs-row class="content-container">
      <vs-col vs-w="12">
        <router-view
          :planets="planets"
          :vehicles="vehicles"
          :base-destinations="destinations"
        />
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
  import NavBar from '../components/NavBar';
  import { EventBus } from '../eventBus';
  export default {
    name: 'LandingPage',
    components: { NavBar },
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
        ],
      };
    },
    beforeMount () {
      this.fetchPlanets();
      EventBus.$on('search-again', this.goToSearch);
    },
    beforeDestroy () {
      EventBus.$off('search-again', this.goToSearch);
    },
    methods: {
      fetchPlanets: function () {
        this.axiosPromise({
          url: '/planets',
          method: 'GET'
        }).then(planets => {
          this.planets = planets;
          this.fetchVehicles();
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
          this.goToSearch();
        }).catch(error => {
          console.log(error);
        });
      },
      goToSearch: function () {
        this.routeTo('AppFalcone', {
          planets: this.planets,
          vehicles: this.vehicles,
          baseDestinations: this.destinations
        });
      }
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
