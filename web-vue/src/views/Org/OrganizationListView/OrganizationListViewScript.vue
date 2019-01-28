<script>
import allOrganizations from '@/graphql/query/allOrganizations.graphql'

export default {
  name: "OrganizationListScript",
  components: {
  },
  methods: {
  },
  computed: {
  },
  data () {
    return {
      organizations: []
    }
  },
  apollo: {
    init: {
      query: allOrganizations
      ,fetchPolicy: 'network-only'
      ,update (data) {
        this.organizations = data.allOrganizations.nodes
      }
    }
  }
}
</script>
