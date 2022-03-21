<template>
  <v-card flat max-width="450" class="rounded-lg px-md-4 py-2">
    <v-card-title class=" justify-center font-weight-light text-subtitle-1 text-md-h6 my-2">
      <div class="primary--text font-weight-medium text-h5">
        Create a Secure Account
      </div>
      <div class="text-subtitle-1 text1--text my-1 font-weight-light">
        Start your investment journey today
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
              v-model="phoneNumber"
              type="number"
              name="phoneNumber"
              dense
              outlined
              color="primary"
              label="Phone Number"
              :rules="phoneNumberRules"
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
            <v-btn
              type="submit"
              depressed
              block
              color="secondary"
              class="text-subtitle-2 font-weight-normal "
            >
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
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Personal',
  props: ['update', 'setForm'],
  data: () => ({
    valid: true,
    show: false,
    phoneNumber: '',
    phoneNumberRules: [v => !!v || 'Phone Number is required'],
    email: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]
  }),
  computed: {
    ...mapGetters({
      loading: 'authentication/getLoading'
    })

  },
  methods: {
    ...mapMutations({ setRegistration: 'authentication/setRegistration' }),

    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        // update phoneNumber and email of parent component so I can pass it in
        this.update('phoneNumber', this.phoneNumber)
        this.update('email', this.email)

        // Switch the form to person
        this.setForm('Personal')
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
