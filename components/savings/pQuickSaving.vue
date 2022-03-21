<template>
  <p-side-bar :loading="loading" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex text3--text flex-column">
        <span>
          Quick Save
        </span>
        <span class="text-caption">
          Daily Savings Balance : <strong>{{ amount | currency }}</strong>
        </span>
      </div>
    </template>
  </p-side-bar>
</template>

<script>
import pSideBar from '../other/pSideBar.vue'
export default {
  components: { pSideBar },
  filters: {
    currency (val) {
      if (val) {
        val = parseFloat(val)
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
    drawer: {
      type: Boolean,
      default: false
    },
    toggle: Function
  },

  data: () => ({
    amount: 10000
  }),

  methods: {
    submit () {
      console.log(this.amount)
    },
    getBankImg (name) {
      return `/banks/${name}.png`
    }
  }
}
</script>

<style>

</style>
