<script>
import appTenantById from '@/graphql/query/appTenantById.graphql'

export default {
  name: "AppTenantDetailScript",
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
    organization () {
      return this.appTenant.organization
    },
    licenses () {
      return this.appTenant.licenses.nodes
    }
  },
  data () {
    return {
      appTenant: {
        name: 'N/A',
        organization: {
          name: 'N/A'
        },
        licenses: {
          nodes: []
        }
      }
    }
  },
  apollo: {
    init: {
      query: appTenantById,
      fetchPolicy: 'network-only',
      variables () {
        return {
          id: this.id
        }
      },
      update (data) {
        this.appTenant = data.appTenantById
        console.log('app', this.appTenant)

      }
    }
  }
}
</script>
