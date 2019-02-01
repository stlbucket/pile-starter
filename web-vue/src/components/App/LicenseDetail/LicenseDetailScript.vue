<script>

export default {
  name: "LicenseDetailScript",
  props: {
    license: { 
      type: Object,
      required: true
    }
  },
  components: {
  },
  methods: {
  },
  computed: {
    txt () {
      return JSON.stringify(this.license,null,2)
    }
    // contacts () {
    //   return this.license.contacts ? this.license.contacts.nodes || [] : []
    // },
    // facilities () {
    //   return this.license.facilities ? this.license.facilities.nodes || [] : []
    // }
  },
  data () {
    return {
    }
  }
}
</script>
