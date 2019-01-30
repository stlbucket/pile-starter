<script>

export default {
  name: "AppTenantDetailScript",
  props: {
    appTenant: { 
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
      return this.appTenant.contacts ? this.appTenant.contacts.nodes || [] : []
    },
    facilities () {
      return this.appTenant.facilities ? this.appTenant.facilities.nodes || [] : []
    }
  },
  data () {
    return {
    }
  }
}
</script>
