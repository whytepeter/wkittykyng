<template>
  <p-side-bar :loading="loading.plans" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="d-flex flex-column text-capitalize">
        <span>
          {{ type === 'create' ? 'New Plan' : `Update ${plan && plan.name} Plan` }}
        </span>
      </div>
    </template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
    >
      <v-row no-gutters class="ma-0 my-2">
        <v-col cols="12" class="d-flex align-center px-0 mb-3 text3--text text-subtitle-1 text-capitalize">
          <span>Create a new investment plan</span>
        </v-col>

        <v-col cols="12" class="pa-0">
          <v-text-field
            v-if="type === 'create'"
            v-model="name"
            type="text"
            name="name"
            outlined
            dense
            color="secondary"
            label="Name"
            :rules="nameRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
          <v-text-field
            v-else
            v-model="data.name"
            type="text"
            name="name"
            outlined
            dense
            color="secondary"
            label="Name"
            :rules="nameRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-if="type === 'create'"
            v-model="pAmount"
            type="text"
            name="amount"
            outlined
            dense
            color="secondary"
            label="Min Amount"
            :rules="amountRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
          <v-text-field
            v-else
            v-model="pAmount2"
            type="text"
            name="amount"
            outlined
            dense
            color="secondary"
            label="Min Amount"
            :rules="amountRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-if="type === 'create'"
            v-model="percentage"
            type="text"
            name="percentage"
            outlined
            dense
            color="secondary"
            label="Interest"
            :rules="percentageRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
          <v-text-field
            v-else
            v-model="data.percentage"
            type="text"
            name="percentage"
            outlined
            dense
            color="secondary"
            label="Interest"
            :rules="percentageRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-if="type === 'create'"
            v-model="duration"
            type="text"
            name="duration"
            outlined
            dense
            color="secondary"
            label="Duration"
            :rules="durationRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
          <v-text-field
            v-else
            v-model="data.duration"
            type="text"
            name="duration"
            outlined
            dense
            color="secondary"
            label="Duration"
            :rules="durationRules"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-text-field
            v-if="type === 'create'"
            v-model="description"
            type="text"
            name="description"
            outlined
            dense
            color="secondary"
            label="Description"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
          <v-text-field
            v-else
            v-model="data.description"
            type="text"
            name="description"
            outlined
            dense
            color="secondary"
            label="Description"
            class="text-subtitle-2 font-weight-light rounded-md"
          />
        </v-col>

        <v-col cols="12" class="pa-0">
          <v-btn
            large
            block
            type="submit"
            :loading="loading.plans"
            depressed
            color="secondary"
            class="text-subtitle-2 font-weight-normal "
          >
            {{ type === 'create' ? 'Create Plan' : 'Update Plan' }}
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
  name: 'UpdateWallet',
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
    toggle: Function,
    type: {
      type: String,
      default: 'create'
    },
    plan: Object
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [v => !!v || 'Plan name is required'],
    amount: '',
    amountRules: [v => !!v || 'Amount is required'],
    percentage: '',
    percentageRules: [v => !!v || 'Interest is required'],
    duration: '',
    durationRules: [v => !!v || 'Plan duration is required']

  }),
  computed: {
    ...mapGetters({ loading: 'admin/getLoading' }),
    data () {
      return { ...this.plan }
    },
    description () {
      return `This is a ${this.name} Plan with an interest of ${this.percentage}% in ${this.duration} months`
    },
    pAmount: {
      get () {
        let val = parseInt(this.amount)
        val = val.toLocaleString()
        if (val === 'NaN') {
          return ''
        } else {
          return `₦${val}`
        }
      },
      set (val) {
        // check if the first Character is ₦ and remove it
        const firstChar = val.charAt(0)
        if (firstChar === '₦') {
          val = val.substring(1)
        }

        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.amount = val
        }
      }
    },
    pAmount2: {
      get () {
        let val = parseInt(this.data && this.data.minAmount)
        val = val.toLocaleString()
        if (val === 'NaN') {
          return ''
        } else {
          return `₦${val}`
        }
      },
      set (val) {
        // check if the first Character is ₦ and remove it
        const firstChar = val.charAt(0)
        if (firstChar === '₦') {
          val = val.substring(1)
        }

        // Convert the value to a number
        if (val !== null) {
          val = val.split(',').join('')
          val = parseInt(val)
          this.data.minAmount = val
        }
      }
    }

  },
  methods: {
    ...mapActions({ planFunction: 'admin/planFunction' }),
    submit () {
      this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        const amount = parseInt(this.pAmount.split(',').join('').slice(1))
        // const amount2 = parseInt(this.pAmount2.split(',').join('').slice(1))

        let payload

        if (this.type === 'create') {
          payload = {
            type: this.type,
            minAmount: amount,
            name: this.name,
            percentage: this.percentage,
            duration: this.duration,
            description: this.description
          }
        } else {
          payload = {
            type: this.type,
            id: this.plan.id,
            name: this.data.name
            // minAmount: amount2,
            // percentage: this.data.percentage,
            // duration: this.data.duration,
            // description: this.data.description
          }
        }

        console.log(payload)
        this.planFunction(payload)
      }
    },

    getBankImg (name) {
      return `/banks/${name}.png`
    },

    to (to) {
      this.$router.push(to)
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
