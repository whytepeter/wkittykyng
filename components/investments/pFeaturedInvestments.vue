<template>
  <v-row class="ma-0 justify-center">
    <v-col cols="12" class="text-subtitle-1 primary white--text text-center font-weight-light py-1 mb-4 rounded">
      Basic Plans
    </v-col>
    <v-col v-for="plan in basic" :key="plan.id" cols="12" sm="6" md="4">
      <v-progress-linear
        v-if="loading.plans"
        indeterminate
        color="secondary"
      />
      <p-plans :plan="plan" class="mx-auto mx-sm-0" />
    </v-col>
    <v-col cols="12" class="text-subtitle-1 primary white--text text-center font-weight-light py-1 my-4 rounded">
      Elite Plans
    </v-col>
    <v-col v-for="plan in elite" :key="plan.id" cols="12" sm="6" md="4">
      <v-progress-linear
        v-if="loading.plans"
        indeterminate
        color="secondary"
      />
      <p-plans :plan="plan" class="mx-auto mx-sm-0" />
    </v-col>
    <v-col cols="12" class="text-subtitle-1 primary white--text text-center font-weight-light py-1 my-4 rounded">
      Deluxe Plans
    </v-col>
    <v-col v-for="plan in deluxe" :key="plan.id" cols="12" sm="6" md="4">
      <v-progress-linear
        v-if="loading.plans"
        indeterminate
        color="secondary"
      />
      <p-plans :plan="plan" class="mx-auto mx-sm-0" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import PPlans from './pPlans.vue'

export default {
  name: 'PShowcase',
  components: { PPlans },
  computed: {
    ...mapGetters({ loading: 'admin/getLoading', getPlansByName: 'admin/getPlansByName' }),

    basic () {
      return this.getPlansByName('basic')
    },
    elite () {
      return this.getPlansByName('elite')
    },
    deluxe () {
      return this.getPlansByName('deluxe')
    }
  },
  methods: {

  }

}
</script>

<style>

</style>
