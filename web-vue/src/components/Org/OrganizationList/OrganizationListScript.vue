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

          const primaryContact = organization.primaryContact || {
            firstName: 'N/A',
            lastName: ''
          }

          return {
            id: organization.id,
            name: organization.name,
            city: location.city,
            primaryContactName: `${primaryContact.firstName} ${primaryContact.lastName}`,
            primaryContactId: primaryContact.id
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
