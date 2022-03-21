<template>
  <v-container>
    <v-row style="height:100hv" align="center" justify="center" class="py-10 my-5">
      <v-col cols="12">
        <v-img height="60" contain src="/logo/kittykyng.png" class="" />
      </v-col>
      {{ ref }}
      <v-col cols="12" class="mx-auto d-flex justify-center mt-n4">
        <v-card max-width="500" flat color="transparent">
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="pb-2  "
              @submit.prevent="submit"
            >
              <v-row no-gutters class="py-4">
                <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="firstName"
                    name="firstName"
                    type="text"
                    dense
                    outlined
                    class="text-subtitle-2 mx-1 font-weight-light"
                    color="primary"
                    label="First Name"
                    required
                    :rules="firstNameRules"
                  />
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="lastName"
                    name="lastName"
                    type="text"
                    dense
                    outlined
                    class="text-subtitle-2 mx-1 font-weight-light"
                    color="primary"
                    label="Last Names"
                    required
                    :rules="lastNameRules"
                  />
                </v-col>

                <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="email"
                    name="email"
                    type="text"
                    dense
                    outlined
                    class="text-subtitle-2 mx-1 font-weight-light"
                    color="primary"
                    label="Email"
                    required
                    :rules="emailRules"
                  />
                </v-col>

                <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="phone"
                    name="phone"
                    type="text"
                    dense
                    outlined
                    class="text-subtitle-2 mx-1 font-weight-light"
                    color="primary"
                    label="Phone Number"
                    :rules="phoneRules"
                    required
                  />
                </v-col>

                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="refCode"
                    name="referralID"
                    type="text"
                    dense
                    outlined
                    class="text-subtitle-2 mx-1 font-weight-light"
                    color="primary"
                    label="Referral ID"

                    required
                  />
                </v-col>
                <v-col cols="12" class="mb-3 mt-n2">
                  <v-card tile outlined class="pa-2">
                    <v-card-text class="d-flex align-center secondary--text text--darken-2 text-caption pa-0">
                      <v-icon small color="secondary">
                        mdi-alert
                      </v-icon>
                      <span class="ml-2">Password must be contain a combination of <strong> Uppercase, Lowercase, Number and Symbol</strong></span>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="password"
                    :type="show ? 'text' : 'password'"
                    name="password"
                    dense
                    outlined
                    color="primary"
                    label="Password"
                    required
                    class="text-subtitle-2 mx-1 font-weight-light"
                    :rules="passwordRules"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    hint="Password must be 8 characters long and contain atleast one lowercase, uppercase, number and special character"
                    @click:append="show = !show"
                  />
                </v-col>
                <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    v-model="confirmPassword"
                    :type="show1 ? 'text' : 'password'"
                    name="confirmPassword"
                    dense
                    outlined
                    color="primary"
                    label="Confirm Password"
                    required
                    class="text-subtitle-2 mx-1 font-weight-light"
                    :rules="[confirmPasswordRules, passwordConfirmationRule]"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-btn
                    depressed
                    type="submit"
                    block
                    :loading="loading.register"
                    color="primary"
                    class="text-capitalize mx-1 rounded text-subtitle-2 font-weight-regular"
                  >
                    Create Account
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  class="py-1 mt-2  text-center"
                >
                  <div>
                    Already a member?
                    <nuxt-link to="/login" tag="a" class=" secondary--text font-weight-medium">
                      Login
                    </nuxt-link>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  class="py-1 mt-1 text-center"
                >
                  <div>
                    By signing up, you agree to our
                    <a href="https://kittykyng.com/legal" class="secondary--text font-weight-medium">
                      Terms
                    </a>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'welcome',
  data: () => ({
    show: false,
    show1: false,
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
    ],
    confirmPassword: '',
    confirmPasswordRules: [
      v => !!v || 'Password is required'
    ]

  }),
  created () {
    this.refCode = this.$route.query.ref
  },
  computed: {
    ...mapGetters({ loading: 'authentication/getLoading', countries: 'authentication/getCountries' }),
    passwordConfirmationRule () {
      return () => (this.password === this.confirmPassword) || 'Password must match'
    },

    refCode: {
      get () {
        return this.referralID
      },
      set (val) {
        this.referralID = val
      }
    }
  },

  methods: {
    ...mapActions({ register: 'authentication/register' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          password: this.password,
          pageName: 'confirm-account',
          queryName: 'token'
        }

        if (this.referralID) {
          payload.refferedBy = this.referralID
        }

        console.log(payload)
        this.register(payload)
        this.reset()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },

    getDate (get, days) {
      const currentDate = new Date()
      let newDate

      function addDays (days) {
        const result = new Date(currentDate)
        result.setDate(result.getDate() + days)
        return formatDate(result)
      }

      function formatDate (date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December']
        return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
      }

      if (get === 'add') {
        newDate = addDays(days)
      } else if (get === 'current') {
        newDate = formatDate(currentDate)
      }
      return newDate
    }
  }

}
</script>

<style>

</style>
