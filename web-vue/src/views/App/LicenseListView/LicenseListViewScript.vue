<script>
import allLicenses from '@/graphql/query/allLicenses.graphql'

export default {
  name: "LicenseListViewScript",
  props: {},
  components: {
  },
  methods: {
  },
  computed: {
  },
  data () {
    return {
      licenses: []
    }
  },
  apollo: {
    init: {
      query: allLicenses,
      fetchPolicy: 'network-only',
      update (data) {
        this.licenses = data.allLicenses.nodes
        console.log('view', this.licenses
        )
      }
    }
  }
}
</script>
