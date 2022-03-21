<template>
  <v-dialog
    v-model="modal"
    persistent
    width="400"
  >
    <v-card>
      <v-card-title class=" text-h6 font-weight-light text-uppercase  py-4">
        <v-icon color="error" class="mr-4">
          mdi-delete
        </v-icon>
        Confirm Delete

        <v-spacer />

        <v-btn outlined x-small fab dark @click="close">
          <v-icon small>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="pt-3 text-subtitle-1 primary--text">
        <div>  You are about to delete the{{ plan && plan.name }} Plan</div>
        <div>
          This action is irriversible
        </div>
      </v-card-text>
      <v-divider />

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn
          color="primary"
          text
          class="font-weight-light text-subtitle-2"
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
          :loading="loading.plans"
          color="error"
          depressed
          class="font-weight-light text-subtitle-2"
          type="submit"
          @click="deletePlan"
        >
          Delete Plan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {

  filters: {
    currency (val) {
      if (val) {
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
    plan: Object,
    modal: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Function
    }
  },
  data: () => ({
    valid: true
  }),
  computed: {
    ...mapGetters({ loading: 'admin/getLoading' })
  },
  methods: {
    ...mapActions({ planFunction: 'admin/planFunction' }),

    deletePlan () {
      const payload = {
        id: this.plan.id,
        type: 'delete'
      }

      console.log(payload)
      this.planFunction(payload)
      this.checkIfDone()
    },
    close () {
      this.toggle(false)
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },

    checkIfDone () {
      setInterval(() => {
        if (this.loading.plans) {
          setTimeout(() => {
            this.close()
          }, 2000)
        }
      }, 1000)
    }
  }

}
</script>

<style>

</style>
