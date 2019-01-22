<template>
  <div>
    <v-btn @click="login" :hidden="loginHidden">Login</v-btn>
    <v-btn @click="logout" :hidden="logoutHidden">Logout</v-btn>
  </div>
</template>

<script>
import LoginManagerScript from '../LoginManagerScript'

export default {
  name: "LoginManager",
  mixins: [LoginManagerScript]
}
</script>
