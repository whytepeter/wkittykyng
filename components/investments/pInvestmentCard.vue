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
      <!-- <div class="py-4 d-flex justify-center">
        <v-img
          width="120"
          height="50"
          contain
          :src="logo"
          :alt="name"
        />
      </div> -->
      <div class="mt-2">
        <div class="text-center">
          <span class="d-block t text-subtitle-1  primary--text font-weight-medium text-uppercase">
            {{ investment && investment.plan && investment.plan.name }}
          </span>
        </div>
        <div class="mt-2 d-flex justify-space-between px-md-2">
          <div>
            <div class="text3--text font-weight-medium text-subtitle-1 text-sm-h6">
              {{ investment && investment.principal | currency }}
            </div>
            <v-chip small outlined>
              Principal
            </v-chip>
          </div>
          <div class="text-right">
            <div class="secondary--text font-weight-medium text-h6 text-sm-h5">
              {{ parseInt(investment && investment.plan && investment.plan.percentage) }}%
            </div>
            <span class="text-body-2 font-weight-medium mt-n2">
              {{ investment && investment.plan && investment.plan.duration }} Months
            </span>
          </div>
        </div>
        <v-divider v-if="investment && investment.startDate" class="my-2" />
        <div v-if="investment && investment.startDate" class="mt-2 d-flex justify-space-between">
          <div class="text-left">
            <div class="text-caption text2--text">
              Effective Date
            </div>
            <span class="text3--text text-body-2 font-weight-medium mt-n2">
              {{ investment && investment.startDate }}
            </span>
          </div>

          <div class="text-right">
            <div class="text-caption text2--text">
              Maturity Date
            </div>
            <span class="text3--text text-body-2 font-weight-medium mt-n2">
              {{ investment && investment.maturityDate }}
            </span>
          </div>
        </div>
        <div class="mt-6 d-flex align-center">
          <v-btn
            text
            :block="investment && (investment.status).toLowerCase() === 'ongoing'"
            style="z-index:3"
            color="primary"
            class="text-subtitle-1 font-weight-light rounded-md text-capitalize"
            @click="toggle(true)"
          >
            View Details
            <v-icon size="20" right>
              mdi-arrow-right
            </v-icon>
          </v-btn>
          <v-spacer />

          <!-- <v-btn
            v-if="investment && (investment.status).toLowerCase() === 'ongoing'"
            style="z-index:3"
            depressed
            icon
            small
            right
            color="secondary"
            :to="investment && investment.cert"
          >
            <v-icon>
              mdi-file
            </v-icon>
          </v-btn> -->

          <v-chip v-if="investment && (investment.status).toLowerCase() === 'completed'" small label color="secondary">
            <v-icon dark small left>
              {{ investment && (investment.status).toLowerCase() === 'completed' ? 'mdi-check-all' : '' }}
            </v-icon>
            <span class="text-caption text-uppercase">
              Completed
            </span>
          </v-chip>
        </div>
      </div>
      <p-pattern style="z-index:0" />
    </v-card-text>
    <view-investment :investment="investment" :drawer="drawer" :toggle="toggle" />
  </v-card>
</template>

<script>
import pPattern from '../other/pPattern.vue'
import ViewInvestment from './view/viewInvestment.vue'
export default {
  name: 'PInvestmentCard',
  components: { pPattern, ViewInvestment },
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
    investment: {
      type: Object,
      default: () => ({})
    },
    action: {
      type: Function,
      default: () => {
        alert('action clicked')
      }
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
    toggle (state) {
      this.drawer = state
      console.log(this.investment)
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
