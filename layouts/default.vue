<template>
  <v-app class="grey lighten-3">
    <v-main class="grey lighten-3 main pb-16">
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <nuxt />
        </keep-alive>
      </v-slide-y-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  head () {
    return {
      title: 'Login',
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css'
        },
        {
          rel: 'stylesheet',
          href:
            'https://use.fontawesome.com/releases/v5.15.1/css/all.css'
        }
      ]
    }
  }

}
</script>

<style>

</style>
