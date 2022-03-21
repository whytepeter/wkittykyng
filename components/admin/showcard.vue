<template>
  <v-card
    flat
    :tile="tile"
    class="primary mx-1 py-3"
    :style="`overflow:hidden; border:1px solid`"
    :to="to"
  >
    <p-pattern />
    <v-progress-linear v-if="loading" color="secondary" indeterminate />
    <v-card-text

      class="d-flex align-center text-subtitle-1 white--text"
    >
      <v-icon size="25" color="secondary" left>
        {{ icon }}
      </v-icon>

      <div style="width:100%" class="d-flex">
        <div>
          <div>
            <div v-if="amount" class="font-weight-medium">
              <span v-if="amount !== 0">{{ amount | currency }}</span>
              <span v-else>₦0.00</span>
            </div>
            <div v-if="number" class="font-weight-medium">
              {{ number }}
            </div>
          </div>
          <div class="light--text text-caption text-sm-body-2 font-weight-light ">
            {{ name }}
          </div>
        </div>
        <v-spacer />
        <v-chip label small color="secondary">
          {{ chip }}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import pPattern from '../other/pPattern.vue'
export default {
  components: { pPattern },

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
    amount: {
      type: [Number, String],
      default: ''
    },
    number: {
      type: [Number, String],
      default: ''
    },
    chip: {
      type: [Number, String],
      default: ''
    },
    to: {
      type: [String],
      default: ''
    },
    name: {
      type: [String],
      default: 'Title'
    },
    icon: {
      type: [String],
      default: ''
    },
    tile: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }

}
</script>

<style>

</style>
