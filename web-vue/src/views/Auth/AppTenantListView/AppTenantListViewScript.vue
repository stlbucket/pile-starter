<script>
import allAppTenants from '@/graphql/query/allAppTenants.graphql'

export default {
  name: "AppTenantListViewScript",
  props: {
  },
  components: {
  },
  methods: {
  },
  computed: {
  },
  data () {
    return {
      appTenants: []
    }
  },
  apollo: {
    init: {
      query: allAppTenants,
      fetchPolicy: 'network-only',
      update (data) {
        // console.log('ten', data)
        this.appTenants = data.allAppTenants.nodes
      }
    }
  }
}
</script>
