
<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    chartdata: {
      type: Object,
      default: () => ({
        labels: ['Investments', 'Withdrawals'],
        datasets: [
          {
            label: 'Investments',
            backgroundColor: '#FFA100',
            data: [400000]
          },
          {
            label: 'Withdrawals',
            backgroundColor: '#15181E',
            data: [50000]
          }
        ]
      })
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false
      })
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>

</style>
