<template>
  <p-side-bar :divided="false" :loading="loading" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="text-subtitle-2 secondary--text">
        Smart Savings
      </div>
    </template>
    <v-row no-gutters class="ma-0">
      <v-col cols="12" class="pa-0">
        <v-card flat color="secondary" class="mt-2">
          <v-card-text>
            <v-row no-gutters class="ma-0">
              <v-col cols="12" class="text-center">
                <v-icon color="white" large left>
                  mdi-bullseye-arrow
                </v-icon>
                <div class="text-subtitle-1 white--text">
                  {{ details && details.name }}
                </div>
              </v-col>

              <v-col cols="12" class="d-flex flex-column pa-0 mb-n2 mt-2">
                <div class="d-flex align-center my-1 text-subtitle-2  font-weight-medium white--text">
                  <span>
                    PROGRESS ({{ getPercent }}%)
                  </span>
                  <v-spacer />
                  <span class="text-caption">{{ details && details.date }}</span>
                </div>
                <div>
                  <v-progress-linear
                    color="white"
                    :height="$vuetify.breakpoint.xsOnly ? 8 : 10"
                    :value="getPercent"
                    class=""
                  />
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card flat>
          <v-card-text class="px-0">
            <v-row no-gutters class="ma-0">
              <v-col cols="4" class="d-flex flex-column text-center">
                <div class="text-caption text1--text">
                  Current Balance
                </div>
                <div class="text3--text font-weight-medium text-subtitle-2">
                  {{ details && details.amountSaved | currency }}
                </div>
              </v-col>
              <v-col cols="4" class="d-flex flex-column text-center">
                <div class="text-caption text1--text">
                  Interest/Annum
                </div>
                <div class="text3--text font-weight-medium text-subtitle-2">
                  {{ details && details.interest | currency }}
                </div>
              </v-col>
              <v-col cols="4" class="d-flex flex-column text-center">
                <div class="text-caption text1--text">
                  Target Amount
                </div>
                <div class="text3--text font-weight-medium text-subtitle-2">
                  {{ details && details.targetAmount | currency }}
                </div>
              </v-col>
              <v-col cols="12" class="pa-2">
                <v-divider class="my-1" />
              </v-col>
              <v-col cols="12" class="px-2">
                <div class="text-center text-caption my-1">
                  Tap the button below to perform action.
                </div>
                <v-btn block depressed color="secondary" class="text-subtitle-2 font-weight-normal">
                  <v-icon left>
                    mdi-plus
                  </v-icon>
                  Quick Save
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-row class="ma-0">
          <v-col cols="6" class="pa-1">
            <p-lil-card :name="'Start Date'" :withdrawal-date="'21 March, 2021'" :type="'date'" />
          </v-col>
          <v-col cols="6" class="pa-1">
            <p-lil-card :name="'End Date'" :withdrawal-date="'21 August, 2021'" :type="'date'" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="pa-2">
        <v-divider class="my-2" />
      </v-col>
      <v-col cols="12">
        <p-transaction :border="false" />
      </v-col>
    </v-row>
  </p-side-bar>
</template>

<script>
import pSideBar from '../../other/pSideBar.vue'
import PLilCard from '~/components/other/pLilCard.vue'
import PTransaction from '~/components/other/pTransaction.vue'
export default {
  components: { pSideBar, PLilCard, PTransaction },
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
    details: Object,
    toggle: Function
  },

  data: () => ({
    amount: 10000
  }),

  computed: {
    getPercent () {
      const percent = (parseInt(this.details && this.details.amountSaved && this.details && this.details.amountSaved) * 100) / parseInt(this.details && this.details.targetAmount && this.details && this.details.targetAmount)
      console.log(percent)
      return percent
    }
  },

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
