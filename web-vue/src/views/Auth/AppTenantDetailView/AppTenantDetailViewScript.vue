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
  },
  data () {
    return {
      appTenant: {
        name: 'N/A'
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
        this.appTenant = data.vwAppTenantById
      }
    }
  }
}
</script>
