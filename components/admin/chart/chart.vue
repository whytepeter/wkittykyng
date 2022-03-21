<template>
  <v-card tile :width="width" :height="height" outlined class="pb-6">
    <v-card-text v-if="type !== 'Doughnut'" :style="`height:${chartHeight}px`" class="text-subtitle-2">
      <keep-alive>
        <component :is="`${type}-chart`" :options="options" :style="`width:100%; height:${chartHeight}px`" />
      </keep-alive>
    </v-card-text>
    <v-card-text v-else :style="`height:${chartHeight}px`" class="text-subtitle-2 ">
      <doughunt :is="`${type}-chart`" :options="options" :style="`width:100%; height:200px`" />
    </v-card-text>
  </v-card>
</template>

<script>
import BarChart from './bar.vue'
import DoughnutChart from './doughnut.vue'
import LineChart from './line.vue'

export default {
  components: { BarChart, LineChart, DoughnutChart },

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

  props: {
    type: {
      type: String,
      default: 'bar'
    },
    chartdata: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false
      })
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: ''
    },
    chartHeight: {
      type: [String, Number],
      default: 400
    }
  }

}
</script>

<style>

</style>
