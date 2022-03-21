<template>
  <p-side-bar :drawer="drawer" :loading="loading.register" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex flex-column">
        <span>
          New Investor
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
        <v-col cols="12" class="px-0 mb-2 text3--text text-subtitle-1">
          Enter the investors details below
        </v-col>

        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="firstName"
            type="text"
            name="firstName"
            outlined
            dense
            color="secondary"
            label="FirstName"
            :rules="firstNameRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="lastName"
            type="text"
            name="lastName"
            outlined
            dense
            color="secondary"
            label="Last Name"
            :rules="lastNameRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="email"
            type="text"
            name="email"
            outlined
            dense
            color="secondary"
            label="Email"
            :rules="emailRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="phone"
            type="text"
            name="phoneNumber"
            outlined
            dense
            color="secondary"
            label="Phone Number"
            :rules="phoneRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="referralID"
            name="referralID"
            type="text"
            dense
            outlined
            class="text-subtitle-2 font-weight-light"
            color="primary"
            label="Referral ID"
            :rules="referralIDRules"
            required
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-model="password"
            :type="show ? 'text' : 'password'"
            name="password"
            dense
            outlined
            color="primary"
            label="Password"
            required
            class="text-subtitle-2 font-weight-light"
            :rules="passwordRules"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            hint="Password must be 8 characters long and contain atleast one lowercase, uppercase, number and special character"
            @click:append="show = !show"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-btn
            large
            block
            type="submit"
            :loading="loading.register"
            depressed
            color="secondary"
            class="text-subtitle-2 font-weight-normal "
          >
            Create Investor
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </p-side-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import pSideBar from '~/components/other/pSideBar.vue'
export default {
  name: 'CreateInvestor',
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
    show: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    firstName: '',
    firstNameRules: [v => !!v || 'First Name is required'],
    lastName: '',
    lastNameRules: [v => !!v || 'Last Name is required'],
    phone: '',
    phoneRules: [v => !!v || 'Phone Number is required'],
    referralID: '',
    referralIDRules: [v => !!v || 'Referral ID is required'],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be greater than 6 characters'
    ]

  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser', loading: 'authentication/getLoading' })
  },

  methods: {
    ...mapActions({ newInvestor: 'authentication/register' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          password: this.password,
          refferedBy: this.referralID,
          pageName: '/confirm-account',
          queryName: 'token'
        }
        console.log(payload)
        this.newInvestor(payload)
      }
    }
  }

}
</script>

<style>

</style>
