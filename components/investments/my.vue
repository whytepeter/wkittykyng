<template>
  <v-row v-if="investments && investments.length" no-gutters class="ma-0 py-6">
    <v-col v-for="investment in investments" :key="investment.id" cols="12" sm="6" md="4">
      <p-investment-card
        :investment="investment"
        class="mx-auto mx-sm-0"
      />
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="12" class="text-center py-10">
      <v-icon size="64" color="secondary">
        mdi-folder-open
      </v-icon>
      <div class="text-subtitle-1 my-2">
        You don't have any running Investments
      </div>
      <v-btn
        mall
        depressed
        color="primary"
        @click="switchTabs('explore')"
      >
        <v-icon small class="mr-2">
          mdi-plus
        </v-icon>
        Get Started
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import pInvestmentCard from './pInvestmentCard.vue'
export default {
  components: { pInvestmentCard },
  props: ['switchTabs'],
  computed: {
    ...mapGetters({ state: 'controller/getState' }),
    investments () {
      const investments = this.state('investments').result
      const arr = []

      investments && investments.forEach((el) => {
        if ((el.status).toLowerCase() === 'ongoing') {
          arr.push(el)
        }
      })

      console.log(arr, investments)
      return arr
    }
  }

}
</script>

<style>

</style>
