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
          const organization = appTenant.organization || {}

          const location = organization.location || {
            city: 'N/A'
          }

          const primaryContact = organization.primaryContact || {
            firstName: 'N/A',
            lastName: ''
          }

          return {
            id: appTenant.id,
            name: appTenant.name,
            city: location.city,
            primaryContactName: `${primaryContact.firstName} ${primaryContact.lastName}`,
            primaryContactId: primaryContact.id
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
