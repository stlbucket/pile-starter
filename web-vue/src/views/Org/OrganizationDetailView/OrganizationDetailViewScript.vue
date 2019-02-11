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
    contacts () {
      return this.organization.contacts ? this.organization.contacts.nodes || [] : []
    },
    facilities () {
      return this.organization.facilities ? this.organization.facilities.nodes || [] : []
    },
    location () {
      return this.organization.location || { name: 'N/A' }
    }
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
