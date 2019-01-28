<script>
import organizationById from '@/graphql/query/organizationById.graphql'

export default {
  name: "OrganizationDetailScript",
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
      organization: {
        name: 'N/A'
      }
    }
  },
  apollo: {
    init: {
      query: organizationById,
      fetchPolicy: 'network-only',
      variables () {
        return {
          id: this.id
        }
      },
      update (data) {
        this.organization = data.organizationById
      }
    }
  }
}
</script>
