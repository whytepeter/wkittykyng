<template>
  <div class="cardHover ma-2 mb-4">
    <!-- Default Styles with badge -->
    <v-badge
      bordered
      color="secondary"
      icon="mdi-check-all"
      offset-x="15"
      offset-y="15"
    >
      <p-icon-card
        style="min-width:310px; width:100%"
        rounded
        :loading="loading.kyc"
        :icon="'mdi-bank'"
        :size="24"
        :styles="'pb-4 pt-8'"
        :icon-color="'secondary'"
        :title="`${myBank && myBank.accounNumber} - ${myBank && myBank.name}`"
        :description="myBank && myBank.accountName"
        class=" mb-0"
      />
    </v-badge>

    <!-- Other Styles with badge -->
    <div>
      <!-- <v-btn text color="error" class="btnHover text-caption text-capitalize py-0 " @click="toggle(true)">
        Remove Bank
      </v-btn> -->
      <!-- <v-btn v-if="!defaultBank" text color="secondary" class="btnHover text-caption text-capitalize py-0 px-0">
        Set Default
      </v-btn> -->
    </div>

    <p-modal
      :color="'error'"
      :dialog="dialog"
      :toggle="toggle"
      :action="delBank"
      :loading="loading.kyc"
      :title="'Delete Bank'"
      :description="`You are about to delete this Bank Account (${myBank && myBank.name} - ${myBank && myBank.accNumber}) from your account on BBMPCS.`"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import pIconCard from '~/components/other/pIconCard.vue'
import PModal from '~/components/other/pModal.vue'
export default {
  components: { pIconCard, PModal },
  props: {
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser', loading: 'controller/getLoading', banks: 'controller/getBanks', getBankCode: 'controller/getBankCode', getBank: 'controller/getBank' }),
    myBank () {
      const bank = this.user && this.user.kyc.bank
      if (bank) {
        bank.name = (this.getBank(bank && bank.bankCode))
      }
      console.log(bank)
      return bank
    }
  },
  methods: {
    ...mapActions({ updateKyc: 'controller/updateKyc' }),
    delBank () {
      this.updateKyc({ bank: {} })
    },
    getBankImg (name) {
      return `/banks/${name}.png`
    },

    toggle (state) {
      this.dialog = state
    }

  }

}
</script>

<style>
.btnHover {
    visibility: hidden;
}
.cardHover:hover .btnHover {
    visibility: visible
}
</style>
