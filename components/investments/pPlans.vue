<template>
  <v-card
    color="white"
    style="overflow:hidden"
    flat
    min-width="300"
    max-width="300"
    class=" rounded-lg relative ma-2"
  >
    <v-card-text class="pInvestmentCard">
      <div class="py-4 d-flex justify-center">
        <v-img
          width="120"
          height="50"
          contain
          src="/logo/kittykyng.png"
          :alt="plan && plan.name"
        />
      </div>
      <div class="mt-2">
        <div class="text-center">
          <span class="d-block t text-subtitle-1  primary--text font-weight-medium text-uppercase">
            {{ plan && plan.name }}
          </span>
        </div>
        <div class="mt-2 d-flex justify-space-between px-md-2">
          <div>
            <div class="text3--text font-weight-medium text-subtitle-1 text-sm-h6">
              {{ plan && plan.minAmount | currency }}
            </div>
            <v-chip small outlined>
              Minimum
            </v-chip>
          </div>
          <div class="text-right">
            <div class="secondary--text font-weight-medium text-h6 text-sm-h5">
              {{ parseInt(plan && plan.percentage) }}%
            </div>
            <span class="text-body-2 font-weight-medium mt-n2">
              {{ plan && plan.duration }} Months
            </span>
          </div>
        </div>
        <div class="mt-6 d-flex align-center">
          <v-btn
            text
            block
            style="z-index:3"
            color="primary"
            class="text-subtitle-1 font-weight-light rounded-md text-capitalize"
            @click="toggle(true, plan)"
          >
            Invest Now
            <v-icon color="secondary" right>
              mdi-arrow-right
            </v-icon>
          </v-btn>
        </div>
      </div>
      <p-pattern style="z-index:0" />
    </v-card-text>
    <view-plan :plan="plan" :drawer="drawer" :toggle="toggle" />
  </v-card>
</template>

<script>
import pPattern from '../other/pPattern.vue'
import ViewPlan from './view/viewPlan.vue'

export default {
  name: 'PInvestmentCard',
  components: { pPattern, ViewPlan },
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
    plan: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    drawer: false
  }),

  computed: {
    checkExpired () {
      return true
    }
  },
  methods: {
    toggle (state, plan) {
      this.drawer = state
      // if (state) {
      //   this.plan = plan
      // }
    }
  }

}
</script>

<style>

.parent{
  position:absolute;
  top:.5rem;
  right:.5rem
}

.pInvestmentCard {
  position:relative;
  border: 2px dotted rgba(204, 200, 223, 0.867);
  transition: all .3s ease-in-out;
  z-index:2
}
.pInvestmentCard:hover{
  border: 1px solid #15181E;
}
</style>
