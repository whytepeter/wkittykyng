<template>
  <v-card style="overflow:hidden" outlined class="rounded-lg pa-0 d-flex">
    <v-card-title class="secondary rounded-0 justify-center py-6">
      <v-icon :size="$vuetify.breakpoint.xsOnly ? 30 : 60" color="white" class="">
        mdi-bullseye-arrow
      </v-icon>
      <span class="d-none d-sm-block text-subtitle-2 white--text mt-2">  Smart Savings</span>
    </v-card-title>
    <v-card-text class="d-flex flex-column justify-center rounded-0 px-2 py-4 pa-sm-4">
      <div style="width:100%;" class="d-flex align-center mt-n2 text-subtitle-2 text-sm-h6 text3--text font-weight-bold py-2">
        <div>{{ name }}</div>
        <v-spacer />
        <div class="d-flex flex-column align-end">
          <span class="text-caption grey--text mb-n1">
            <v-icon right x-small color="secondary">mdi-arrow-right</v-icon>
            Target</span>
          <span>{{ targetAmount | currency }}</span>
        </div>
      </div>
      <div style="width:100%;" class="">
        <div class="d-flex align-center my-1 text-subtitle-1 text-sm-h6 font-weight-bold text3--text">
          <span>
            {{ amountSaved | currency }}
          </span>
          <v-spacer />
          <span class="text-caption">{{ date }}</span>
        </div>
        <div>
          <v-progress-linear
            color="secondary"
            :height="$vuetify.breakpoint.xsOnly ? 10 : 15"
            :value="getPercent"
            class="rounded"
          />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
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
    name: {
      type: String,
      require: true,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    targetAmount: {
      type: [String, Number],
      require: true,
      default: ''
    },
    amountSaved: {
      type: [String, Number],
      require: true,
      default: ''
    }

  },
  computed: {
    getPercent () {
      const percent = (parseInt(this.amountSaved && this.amountSaved) * 100) / parseInt(this.targetAmount && this.targetAmount)
      console.log(percent)
      return percent
    }
  }

}
</script>

<style>

</style>
