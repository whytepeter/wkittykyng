<template>
  <v-container>
    <v-row style="height:100hv" align="center" justify="center" class="py-16 my-5">
      <v-col cols="12" class="pb-0">
        <v-img height="60" contain src="/logo/kittykyng.png" class="" />
      </v-col>
      <v-col cols="12" class="mx-auto d-flex justify-center">
        <v-card flat max-width="450" class="transparent rounded-lg px-md-4 py-2">
          <v-card-title class="d-flex flex-column justify-center font-weight-light text-subtitle-1 text-md-h6 mt-2">
            <div class="font-weight-medium  primary--text text-h5">
              Reset Password
            </div>
            <!-- <div class="text-subtitle-1 text1--text text-center my-1 font-weight-light ">
              Enter a new password
            </div> -->
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
                    v-model="email"
                    name="email"
                    type="text"
                    dense
                    outlined
                    class="text-subtitle-2 font-weight-light"
                    color="primary"
                    label="Email"
                    required
                    :rules="emailRules"
                  />
                </v-col>

                <v-col cols="12" class="py-2">
                  <v-btn
                    :loading="loading.password"
                    type="submit"
                    depressed
                    block
                    color="primary"
                    class="text-capitalize rounded text-subtitle-2 font-weight-regular"
                  >
                    Reset Password
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  class="py-1 mt-2 text-center"
                >
                  <div>
                    Back to
                    <nuxt-link to="/login" tag="a" class="secondary--text font-weight-bold">
                      Login
                    </nuxt-link>
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
  name: 'ResetPassword',
  layout: 'welcome',
  data: () => ({
    valid: true,
    show: false,
    show1: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ]

  }),
  computed: {
    ...mapGetters({ loading: 'authentication/getLoading' })

  },
  methods: {
    ...mapActions({ forgotPassword: 'authentication/forgotPassword' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          email: this.email,
          pageName: '/password/new',
          queryName: 'token'
        }

        console.log(payload)
        this.forgotPassword(payload)
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
