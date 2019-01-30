<script>
export default {
  name: "AppTenantListScript",
  props: {
    appTenants: {
      type: Array,
      default: []
    }
  },
  components: {
  },
  methods: {
  },
  computed: {
    items () {
      return this.appTenants.map(
        appTenant => {
          const location = appTenant.location || {
            city: 'N/A'
          }

          const primaryFacility = appTenant.primaryFacility || {
            firstName: 'N/A',
            lastName: ''
          }

          return {
            id: appTenant.id,
            name: appTenant.name,
            city: location.city,
            primaryFacilityName: `${primaryFacility.firstName} ${primaryFacility.lastName}`,
            primaryFacilityId: primaryFacility.id
          }
        }
      )
    }
  },
  data () {
    return {
    }
  },
}
</script>
