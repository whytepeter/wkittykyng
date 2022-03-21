<template>
  <v-container>
    <v-row style="height:100hv" align="center" justify="center" class="py-16 my-5">
      <v-col cols="12">
        <v-img height="60" contain src="/logo/kittykyng.png" class="" />
      </v-col>
      <v-col cols="12" class="mx-auto d-flex justify-center mt-n4">
        <v-card flat max-width="450" class="rounded-lg px-md-4 py-2">
          <v-card-title class=" flex-column justify-center font-weight-light text-subtitle-1 text-md-h6 my-2">
            <div class="font-weight-medium primary--text text-h5">
              Welcome back
            </div>
            <div class="text-subtitle-1 mt-1 text1--text font-weight-light">
              Login to your KittyKyng account
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
                <v-col cols="12" class="py-0 mb-n1">
                  <v-text-field
                    v-model="password"
                    :type="show ? 'text' : 'password'"
                    name="password"
                    dense
                    outlined
                    color="primary"
                    label="Password"
                    :rules="passwordRules"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    class="text-subtitle-2 font-weight-light rounded-md"
                    @click:append="show = !show"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="py-0 mb-2 text-center"
                >
                  <div>
                    <nuxt-link to="/password/reset" tag="a" class="secondary--text font-weight-medium">
                      Forgot Password
                    </nuxt-link>
                  </div>
                </v-col>
                <v-col cols="12" class="py-2">
                  <v-btn
                    type="submit"
                    :loading="loading.login"
                    depressed
                    block
                    color="primary"
                    class="text-capitalize rounded text-subtitle-2 font-weight-regular"
                  >
                    Login
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  class="py-1 mt-2  text-center"
                >
                  <div>
                    New to KittyKyng?
                    <nuxt-link to="/register" tag="a" class="secondary--text font-weight-medium">
                      Sign Up
                    </nuxt-link>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  class="py-1 mt-1 text-center"
                >
                  <div>
                    By signing up, you agree to our
                    <nuxt-link to="/login" tag="a" class="secondary--text font-weight-medium">
                      Terms
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
  layout: 'welcome',
  data: () => ({
    valid: true,
    show: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 6) || 'Password must be greater than 6 characters'
    ]
  }),

  computed: {
    ...mapGetters({
      loading: 'authentication/getLoading',
      alert: 'authentication/getAlert'
    })
  },

  methods: {
    ...mapActions({ loginUser: 'authentication/loginUser' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const payload = {
          email: this.email,
          password: this.password
        }

        console.log(payload)
        this.loginUser(payload)
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
