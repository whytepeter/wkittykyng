<template>
  <v-card outlined dark :color="color" class="rounded-lg ">
    <v-card-text class="d-flex justify-space-between align-center">
      <div class="d-flex flex-column">
        <span class="light--text text-subtitle-1 font-weight-light ">
          {{ accName }}
        </span>
        <span class="white--text font-weight-bold text-h6">
          {{ accNumber }}
        </span>
        <span class="light--text text-subtitle-2 font-weight-light text-uppercase">
          {{ bank }}
        </span>
      </div>
      <v-btn
        depressed
        fab
        color="white"
        @click="copy(accNumber)"
      >
        <v-icon :color="color">
          mdi-content-copy
        </v-icon>
      </v-btn>
      <!-- <v-btn
        depressed
        fab
        color="white"
        @click="copy(`
${accName}
${accNumber}
${bank}`)"
      >
        <v-icon :color="color">
          mdi-content-copy
        </v-icon>
      </v-btn> -->
    </v-card-text>
  </v-card>
  <!-- <v-card v-else flat class="mx-auto">
    <v-btn
      block
      large
      depressed
      :color="color"
      class="text-subtitle-2 font-weight-normal "
      @click="account = true ; modal = true"
    >
      Get Account Number
    </v-btn>
    <get-account :modal="modal" :toggle="toggleModal" />
  </v-card> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import getAccount from './getAccount.vue'
export default {

  name: 'PAccount',
  props: {
    color: {
      type: [Array, String, Object],
      default: 'secondary'
    },
    accName: {
      type: String,
      default: 'Full Name'
    },
    accNumber: {
      type: [String, Number],
      default: 'Acc Number'
    },
    bank: {
      type: String,
      default: 'Bank'
    }

  },
  data: () => ({
    account: false,
    modal: false
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser' })
  },
  methods: {
    ...mapActions({ setAlert: 'controller/initAlert' }),
    async copy (payload) {
      await navigator.clipboard.writeText(payload)
      // alert('Acc Number copied to clipboard')
      this.setAlert({
        is: true,
        type: 'info',
        message: 'Acc Number copied to clipboard'
      })
    },
    toggleModal (state) {
      this.modal = state
    }
  }

}
</script>

<style>

</style>
