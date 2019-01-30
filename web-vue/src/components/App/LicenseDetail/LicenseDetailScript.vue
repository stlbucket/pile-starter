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
    contacts () {
      return this.license.contacts ? this.license.contacts.nodes || [] : []
    },
    facilities () {
      return this.license.facilities ? this.license.facilities.nodes || [] : []
    }
  },
  data () {
    return {
    }
  }
}
</script>
