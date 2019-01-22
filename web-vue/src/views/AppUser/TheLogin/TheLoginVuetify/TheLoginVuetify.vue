<template>
  <div>
    <v-text-field
      label="username"
      placeholder="username"
      box
      v-model="username"
    ></v-text-field>
    <v-text-field
      label="password"
      placeholder="password"
      box
      v-model="password"
    ></v-text-field>
    <v-btn @click="login">Login</v-btn>
  </div>
</template>

<script>
import TheLoginScript from '../script/TheLoginScript'

export default {
  name: "Login",
  mixins: [TheLoginScript]
}
</script>
