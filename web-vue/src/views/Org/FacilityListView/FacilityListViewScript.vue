<script>
import allFacilities from '@/graphql/query/allFacilities.graphql'
import allFacilitiesForOrganization from '@/graphql/query/allFacilitiesForOrganization.graphql'

export default {
  name: "FacilityListViewScript",
  props: {
    organizationId: {
      type: String,
      required: false
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
      facilities: []
    }
  },
  apollo: {
    init: {
      query () {
        return this.organizationId !== null && this.organizationId !== undefined ? allFacilitiesForOrganization : allFacilities
      },
      fetchPolicy: 'network-only',
      variables () {
        return this.organizationId !== null && this.organizationId !== undefined ? {
          organizationId: this.organizationId
        } : null
      },
      update (data) {
        this.facilities = data.allFacilities.nodes
      }
    }
  }
}
</script>
