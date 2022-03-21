<template>
  <v-dialog
    v-model="modal"
    persistent
    width="500"
  >
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="pb-2"
      @submit.prevent="submit"
    >
      <v-card class="px-4">
        <v-card-title class=" text-h6 font-weight-light text-uppercase  pa-4 pt-6">
          <v-icon color="secondary" class="mr-4">
            mdi-bank
          </v-icon>
          Get a KittyKyng Account Number
          <v-spacer />

          <v-btn
            outlined
            x-small
            fab
            color="primary"
            class="mr-n2"
            @click="close"
          >
            <v-icon small>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <!-- <v-divider /> -->
        <v-card-text class="pt-2">
          <v-row no-gutters>
            <v-col cols="12" class=" text-subtitle-1 mb-4">
              Your BVN is needed to create a unique <span class="font-weight-medium primary--text">KittyKyng Account Number</span> for you
            </v-col>
            <v-col cols="12" class="pb-0">
              <v-text-field
                v-model="bvn"
                type="text"
                name="bvn"
                outlined
                required
                :rules="bvnRules"
                color="secondary"
                label="Enter BVN"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />

        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            :loading="loading.bvn"
            color="primary"
            depressed
            class="font-weight-light text-subtitle-2 px-4"
            type="submit"
          >
            Proceed
            <v-icon small class="ml-2" color="secondary">
              mdi-arrow-right-thin-circle-outline
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
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
    modal: {
      type: Boolean,
      default: true
    },
    toggle: {
      type: Function,
      default: (state) => {
        this.modal = state
      }
    }

  },
  data: () => ({
    valid: true,
    bvn: '',
    bvnRules: [v => !!v || 'BVN is required']

  }),
  computed: {
    ...mapGetters({ loading: 'admin/getLoading' })
  },
  created () {

  },
  methods: {
    ...mapActions({ addBVN: 'admin/addBVN' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          bvn: this.bvn
        }

        console.log(payload)
        // this.addBVN(payload)
        // this.checkIfDone()
      }
    },
    close () {
      this.toggle(false)
      this.reset()
      this.resetValidation()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },

    checkIfDone () {
      setInterval(() => {
        if (this.loading.bvn) {
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
