<template>
  <v-row no-gutters class="ma-0 py-6">
    <v-col cols="12" class="text-subtitle-1 primary white--text text-center font-weight-light py-1 mb-4 rounded">
      Basic Plans
    </v-col>
    <v-col v-for="plan in basic" :key="plan.id" cols="12" sm="6" md="4">
      <p-plans :plan="plan" class="mx-auto mx-sm-0" />
    </v-col>
    <v-col cols="12" class="text-subtitle-1 primary white--text text-center font-weight-light py-1 my-4 rounded">
      Elite Plans
    </v-col>
    <v-col v-for="plan in elite" :key="plan.id" cols="12" sm="6" md="4">
      <p-plans :plan="plan" class="mx-auto mx-sm-0" />
    </v-col>
    <v-col cols="12" class="text-subtitle-1 primary white--text text-center font-weight-light py-1 my-4 rounded">
      Deluxe Plans
    </v-col>
    <v-col v-for="plan in deluxe" :key="plan.id" cols="12" sm="6" md="4">
      <p-plans :plan="plan" class="mx-auto mx-sm-0" />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import PPlans from './pPlans.vue'
export default {
  components: { PPlans },
  computed: {
    ...mapGetters({ state: 'admin/getState' }),
    basic () {
      return this.loop('basic')
    },
    elite () {
      return this.loop('elite')
    },
    deluxe () {
      return this.loop('deluxe')
    }
  },
  methods: {
    loop (name) {
      const arr = []
      this.state('plans').forEach((el) => {
        if (el.name.toLowerCase().includes(name)) {
          arr.push(el)
        }
      })
      return arr
    }

  }

}
</script>

<style>

</style>
