<template>
  <p-side-bar :loading="loading.kyc" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex flex-column">
        <span>
          KYC Update
        </span>
      </div>
    </template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
    >
      <v-row no-gutters class="ma-0 my-4">
        <!--
          <v-col cols="12" class="px-0 mb-2 text3--text text-h6">
          Edit Profile
        </v-col>
        <v-col cols="12" class=" py-4 d-flex align-center">
          <v-avatar style="border:2px solid #dddd" size="90">
            <v-img src="/logo/default.png" />
          </v-avatar>

          <span style="cursor:pointer" class="ml-2">Tab to change</span>
        </v-col> -->
        <v-col cols="12" class="pa-0">
          <v-select
            v-model="pGender"
            :items="['Male', 'Female']"
            label="Gender"
            outlined
            :rules="genderRules"
            class="text-subtitle-2 font-weight-light"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="pDob"
                outlined
                :rules="dobRules"
                class="text-subtitle-2 font-weight-light rounded-md"
                dense
                label="Date of Birth"
                readonly
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="pDob"
              color="primary"
              scrollable
            >
              <v-spacer />
              <v-btn
                text
                class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular"
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                depressed

                text
                class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular"
                color="primary"
                @click="$refs.menu.save(date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-select
            v-model="pCountry"
            :items="countries"
            item-text="name"
            item-value="name"
            label="Country"
            :rules="countryRules"
            outlined
            class="text-subtitle-2 font-weight-light"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-textarea
            v-model="pAddress"
            type="text"
            name="email"
            rows="3"
            outlined
            color="secondary"
            label="Resident Address"
            :rules="addressRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>

        <v-col cols="12" class="pa-0">
          <v-btn
            large
            block
            type="submit"
            :loading="loading.kyc"
            depressed
            color="secondary"
            class="text-subtitle-2 font-weight-normal "
          >
            Update KYC
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </p-side-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import pSideBar from '../other/pSideBar.vue'
export default {
  name: 'PFundWallet',
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
    valid: true,
    menu: false,
    date: new Date().toISOString().substr(0, 10),
    dobRules: [v => !!v || 'Date Of Birth is required'],
    genderRules: [v => !!v || 'Gender is required'],
    countryRules: [v => !!v || 'Country is required'],
    addressRules: [v => !!v || 'Address is required']

  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser', loading: 'controller/getLoading', countries: 'authentication/getCountries' }),
    pGender: {
      get () {
        return this.user && this.user.kyc.gender
      },
      set (val) {
        this.user.kyc.gender = val
      }
    },
    pDob: {
      get () {
        return this.user && this.user.kyc.dob
      },
      set (val) {
        this.user.kyc.dob = val
      }
    },
    pCountry: {
      get () {
        return this.user && this.user.kyc.country
      },
      set (val) {
        this.user.kyc.country = val
      }
    },
    pAddress: {
      get () {
        return this.user && this.user.kyc.address
      },
      set (val) {
        this.user.kyc.address = val
      }
    }
  },

  methods: {
    ...mapActions({ updateKyc: 'controller/updateKyc' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          gender: this.pGender,
          country: this.pCountry,
          address: this.pAddress,
          dob: this.pDob
        }
        console.log(payload)
        this.updateKyc(payload)
      }
    },
    getBankImg (name) {
      return `/banks/${name}.png`
    },
    to (to) {
      this.$router.push(to)
    }
  }

}
</script>

<style>

</style>
