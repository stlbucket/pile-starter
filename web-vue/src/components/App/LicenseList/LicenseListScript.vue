<script>
export default {
  name: "LicenseListScript",
  props: {
    licenses: {
      type: Array,
      required: true
    }
  },
  components: {
  },
  methods: {
  },
  computed: {
    items () {
      return this.licenses.map(
        license => {
          console.log('license', license)
          const assignedToContact = (license.assignedToAppUserContact || {}).contact || {
            firstName: 'Unassigned',
            lastName: ''
          }

          return {
            id: license.id,
            name: license.name,
            appTenantName: license.organization.name,
            licenseTypeKey: license.licenseType.key,
            applicationName: license.licenseType.application.name,
            assignedTo: `${assignedToContact.firstName} ${assignedToContact.lastName}`
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
