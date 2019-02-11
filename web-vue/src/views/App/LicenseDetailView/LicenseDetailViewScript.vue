<script>
import licenseById from '@/graphql/query/licenseById.graphql'

export default {
  name: "LicenseDetailScript",
  props: {
    id: { 
      type: String,
      required: true
    }
  },
  components: {
  },
  methods: {
  },
  computed: {
    licenseType () {
      return this.license.licenseType
    },
    application () {
      return this.license.licenseType.application
    },
    organization () {
      return this.license.organization
    },
    assignedToContact () {
      return this.license.assignedToAppUserContact.contact
    }
  },
  data () {
    return {
      license: {
        name: 'N/A',
        organization: {
          name: 'N/A'
        },
        licenseType: {
          name: 'N/A',
          application: {
            name: 'N/A'
          }
        },
        assignedToAppUserContact: {
          contact: {
            firstName: 'N/A'
          }
        }
      }
    }
  },
  apollo: {
    init: {
      query: licenseById,
      fetchPolicy: 'network-only',
      variables () {
        return {
          id: this.id
        }
      },
      update (data) {
        this.license = data.licenseById
        console.log('license', this.license)
      }
    }
  }
}
</script>
