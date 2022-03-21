<template>
  <v-card tile outlined>
    <v-card-text class="text-subtitle-2 pa-0">
      <v-row align="center" class="ma-0">
        <v-col cols="4" class="px-md-4">
          <v-btn depressed color="primary" class=" text-caption font-weight-normal ">
            October
          </v-btn>
        </v-col>
        <!-- <v-col cols="6" class="d-flex py-0">
          <v-spacer />
          <v-sheet width="70" class="transparent mt-6 mr-2">
            <v-select
              v-model="type"
              dense
              color="primary"
              class="text-subtitle-2 font-weight-light rounded-0"
              :items="['bar', 'line']"
              :rules="[(v) => !!v || 'Type is required']"
              required
              value="Bar"
            />
          </v-sheet>
        </v-col> -->
        <v-col cols="8" class=" d-flex  align-center ">
          <v-spacer />
          <v-spacer />
          <div class="d-flex align-center text-caption text-sm-subtitle-2">
            <span>Balance:</span>
            <span class="font-weight-medium primary--text ml-1 text-caption text-sm-subtitle-1">{{ 10000 | currency }}</span>
          </div>
          <v-btn depressed color="secondary" class="ml-4 text-caption font-weight-light ">
            <v-icon size="20">
              mdi-plus
            </v-icon>
            <span class="d-none d-md-block">Top up</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider />
      <v-row no-gutters class="ma-0">
        <v-col cols="12" class="pa-4 text-center">
          <div>Revenue for <span class="primary--text">October</span></div>
          <div class="text-h6 text-md-h5 primary--text font-weight-medium">
            {{ 200000 |currency }}
          </div>
        </v-col>
        <v-col cols="12" class="pa-0">
          <chart :chart="type" :chart-height="400" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import chart from './chart/chart.vue'

export default {
  components: { chart },
  filters: {
    currency (val) {
      if (val) {
        val = parseInt(val)
        return val.toLocaleString('en-NG', {
          style: 'currency',
          code: 'NG',
          currency: 'NGN'
        })
      } else {
      }
    }
  },
  data: () => ({
    type: 'bar'
  })

}
</script>

<style>

</style>
