<template>
  <div>
    <h1>Phile Starter</h1>
    <h2>A starter kit for building GraphQL APIs with Postgraphile.</h2>
    <v-tabs
      dark
      slider-color="yellow"
    >
      <v-tab
        v-for="schema in schemas"
        :key="schema"
        ripple
      >
        {{ schema }}
      </v-tab>
      <v-tab-item
        v-for="schema in schemas"
        :key="schema"
      >
        <v-card>
          <v-img
           :src="`${publicPath}schema-diagrams/${schema}.gif`"
           max-width="1000"
           max-height="1000"
           ></v-img>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>

export default {
  name: "Home",
  components: {
  },
  // methods: {
  //   cancel () {
  //     this.$router.go(-1)
  //   },
  //   create () {
  //     this.$apollo.mutate({
  //       mutation: buildMinor,
  //       variables: {
  //         releaseId: this.releaseId,
  //         name: this.minorName
  //       }
  //     })
  //     .then(result => {
  //       this.$eventHub.$emit('newMinorCreated', result.data.buildMinor.minor)
  //     })
  //     .catch(error => {
  //       alert('ERROR')
  //       console.log(error)
  //     })
  //   }
  // },
  // computed: {
  //   releaseId () {
  //     return this.$store.state.focusReleaseId
  //   },
  //   createDisabled () {
  //     return this.minorName === ''
  //   }
  // },
  data () {
    return {
      publicPath: process.env.BASE_URL,
      schemas: [
        'auth'
        ,'org'
        ,'app'
        ,'prj'
      ]
    }
  },
}
</script>
