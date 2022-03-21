import Vue from 'vue'

export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    if (error.response.status === 401 || error.response.message === ('jwt expired')) {
      Vue.$cookies.remove('accessToken')
      redirect('/login')
    }
    console.log(error)
  })
}
