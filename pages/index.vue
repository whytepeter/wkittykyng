<template>
  <v-container>
    <v-row class="py-16">
      <v-col cols="12" class="text-center">
        <p> Redirecting to Dashboard...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  created () {
    this.$router.push('/dashboard/home')
  }
}
</script>

<style>

</style>
