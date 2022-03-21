<template>
  <v-card flat max-width="450" class="rounded-lg px-md-4 py-2">
    <v-card-title class="d-flex flex-column justify-center font-weight-light text-subtitle-1 text-md-h6 mt-2">
      <div class="font-weight-medium  primary--text text-h5">
        Personal information
      </div>
      <div class="text-subtitle-1 text1--text my-1 font-weight-light">
        Please make sure your details are correct
      </div>
      <div class="text-subtitle-1">
        <span class="font-weight-medium mr-2">{{ registration && registration.phoneNumber }}</span>
        <a style="text-decoration:underline" class="font-weight-medium" @click="setForm('Start')">
          Change number
        </a>
      </div>
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
      >
        <v-row no-gutters>
          <v-col cols="12" class="py-0 mb-n1">
            <v-text-field
              v-model="firstName"
              type="text"
              name="firstName"
              dense
              outlined
              color="primary"
              label="First Name"
              :rules="firstNameRules"
              class="text-subtitle-2 font-weight-light rounded-md"
            />
          </v-col>
          <v-col cols="12" class="py-0 mb-n1">
            <v-text-field
              v-model="lastName"
              type="text"
              name="lastName"
              dense
              outlined
              color="primary"
              label="Last Name"
              :rules="lastNameRules"
              class="text-subtitle-2 font-weight-light rounded-md"
            />
          </v-col>
          <v-col cols="12" class="py-0 mb-n1">
            <v-text-field
              v-model="email"
              type="email"
              name="email"
              dense
              outlined
              color="primary"
              label="Email"
              :rules="emailRules"
              class="text-subtitle-2 font-weight-light rounded-md"
            />
          </v-col>

          <v-col cols="12" class="py-2">
            <v-btn type="submit" depressed block color="secondary" class="text-subtitle-2 font-weight-normal ">
              Next
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            class="py-1 mt-2 text-center"
          >
            <div>
              Already have an account?
              <nuxt-link to="/login" tag="a" class="font-weight-bold">
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
              <nuxt-link to="/login" tag="a" class="font-weight-bold">
                Terms
              </nuxt-link>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Personal',
  props: ['update', 'setForm'],
  data: () => ({
    valid: true,
    show: false,
    firstName: '',
    firstNameRules: [v => !!v || 'First Name is required'],
    lastName: '',
    lastNameRules: [v => !!v || 'Last Name is required'],
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]
  }),
  computed: {
    ...mapGetters({
      loading: 'authentication/getLoading',
      alert: 'authentication/getAlert',
      registration: 'authentication/getRegistration'
    }),
    email: {
      get () {
        return this.registration && this.registration.email
      },
      set (val) {
        this.update('email', val)
      }
    }
  },
  methods: {
    ...mapActions({ loginUser: 'authentication/loginUser' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        this.update('firstName', this.firstName)
        this.update('lastName', this.lastName)
        this.update('email', this.email)

        this.setForm('Security')
      }
    },

    clear () {
      this.reset()
      this.resetValidation()
    },

    reset () {
      this.$refs.form.reset()
    },

    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }

}
</script>

<style>

</style>
