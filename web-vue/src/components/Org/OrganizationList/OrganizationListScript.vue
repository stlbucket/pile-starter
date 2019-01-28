<script>
export default {
  name: "OrganizationListScript",
  props: {
    organizations: {
      type: Array,
      default: []
    }
  },
  components: {
  },
  methods: {
  },
  computed: {
    items () {
      return this.organizations.map(
        organization => {
          const location = organization.location || {
            city: 'N/A'
          }

          const primaryFacility = organization.primaryFacility || {
            firstName: 'N/A',
            lastName: ''
          }

          return {
            id: organization.id,
            name: organization.name,
            city: location.city,
            primaryFacilityName: `${primaryFacility.firstName} ${primaryFacility.lastName}`,
            primaryFacilityId: primaryFacility.id
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
