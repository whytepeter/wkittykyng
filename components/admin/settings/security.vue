<template>
  <v-row justify="center" class="ma-0">
    <v-col cols="12" md="8">
      <v-card max-width="500" outlined class="mx-auto">
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="submit"
          >
            <v-row no-gutters>
              <v-col cols="12" class="pa-0 text3--text text-h6 mb-4 mt-2">
                <div class="text-subtitle-1 text-sm-h6 text1--text font-weight-light">
                  Update Your KittyKyng Password
                </div>
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-text-field
                  v-model="oldPassword"
                  :type="show ? 'text' : 'password'"
                  name="oldPassword"

                  outlined
                  color="secondary"
                  label="Old Password"
                  :rules="oldPasswordRules"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  class="text-subtitle-2 font-weight-light rounded-md"
                  @click:append="show = !show"
                />
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-text-field
                  v-model="password"
                  :type="show1 ? 'text' : 'password'"
                  name="password"

                  outlined
                  color="secondary"
                  label="New Password"
                  :rules="passwordRules"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  class="text-subtitle-2 font-weight-light rounded-md"
                  @click:append="show1 = !show1"
                />
              </v-col>
              <v-col cols="12" class="pa-0">
                <v-text-field
                  v-model="confirmPassword"
                  :type="show2 ? 'text' : 'password'"
                  name="confirmPassword"

                  outlined
                  color="secondary"
                  label="Confirm Password"
                  required
                  class="text-subtitle-2 font-weight-light rounded-md"
                  :rules="[confirmPasswordRules, passwordConfirmationRule]"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show2 = !show2"
                />
              </v-col>

              <v-col cols="12" class="pa-0">
                <v-btn
                  :loading="loading.password"
                  type="submit"
                  depressed
                  block
                  large
                  color="secondary"
                  class="text-subtitle-2 font-weight-normal "
                >
                  Update Password
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  data: () => ({
    valid: true,
    show: false,
    show1: false,
    show2: false,

    oldPassword: '',
    oldPasswordRules: [
      v => !!v || 'Old Password is required'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'New Password is required',
      v => (v && v.length >= 6) || 'New Password must be greater than 6 characters'
    ],
    confirmPassword: '',
    confirmPasswordRules: [
      v => !!v || 'Confirm Password is required'
    ]

  }),
  computed: {
    ...mapGetters({
      loading: 'authentication/getLoading'
    }),
    passwordConfirmationRule () {
      return () => (this.password === this.confirmPassword) || 'Password must match'
    }
  },
  methods: {
    ...mapActions({ resetPassword: 'authentication/resetPassword' }),
    submit () {
      if (this.$refs.form.validate()) {
        console.log(this.password)
        this.resetPassword({ password: this.password })
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
