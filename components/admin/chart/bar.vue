
<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    chartdata: {
      type: Object,
      default: () => ({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Investments',
            backgroundColor: '#FFA100',
            data: [40, 20, 12, 39, 11, 40, 39, 80, 40, 20, 12, 11]
          },
          {
            label: 'Withdrawals',
            backgroundColor: '#15181E',
            data: [50, 10, 40, 23, 56, 38, 59, 10, 34, 58, 34, 90]
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
