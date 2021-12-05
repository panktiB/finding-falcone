<template>
  <vs-row class="relative-height-100">
    <vs-col
      vs-w="12"
      class="relative-height-100"
    >
      <vs-row class="pt-150">
        <template v-if="status">
          <template v-if="status['status'] === 'true'">
            <div class="relative-width-100 text-success">
              {{ `Time Taken: ${timeTaken}` }}
            </div>
            <div class="relative-width-100 text-success">
              {{ `Planet found on: ${status['planet_name']}` }}
            </div>
          </template>
          <template v-else-if="status['status'] === 'false'">
            <div class="relative-width-100 text-warning">
              Falcone not found, please reset and try again
            </div>
          </template>
        </template>
        <template v-else>
          <div class="relative-width-100">
            {{ error }}
          </div>
        </template>
      </vs-row>
    </vs-col>
  </vs-row>
</template>

<script>
  import { EventBus } from '../eventBus';

  export default {
    name: 'SearchStatus',
    props: {
      status: {
        type: Object,
        default: () => {}
      },
      error: {
        type: String,
        default: '',
      },
      timeTaken: {
        type: [Number, String],
        default: 0
      }
    },
    beforeMount () {
      EventBus.$on('reset', this.handleReset);
    },
    beforeDestroy () {
      EventBus.$off('reset', this.handleReset);
    },
    methods: {
      handleReset: function () {
        EventBus.$emit('search-again');
      }
    }
  };
</script>
