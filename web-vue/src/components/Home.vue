<template>
  <div>
    <h1>JOAINIE LOVES BEOTCHY</h1>
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
    }
  },
}
</script>
