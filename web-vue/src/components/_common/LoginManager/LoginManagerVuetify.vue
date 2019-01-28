<template>
  <div>
    <v-btn @click="login" :hidden="isLoggedIn">Login</v-btn>
    <v-btn @click="logout" :hidden="!isLoggedIn">Logout</v-btn>
  </div>
</template>

<script>
import LoginManagerScript from './LoginManagerScript'

export default {
  name: "LoginManager",
  mixins: [LoginManagerScript]
}
</script>
