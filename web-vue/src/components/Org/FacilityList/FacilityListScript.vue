<script>

export default {
  name: "FacilityListScript",
  props: {
    facilities: {
      type: Array,
      required: true,
    }
  },
  components: {
  },
  methods: {
  },
  computed: {
    items () {
      return (this.facilities || []).map(
        facility => {
          const organization = facility.organization || {
            name: 'N/A'
          }

          const location = facility.location || {
            city: 'N/A'
          }

          return {
            id: facility.id,
            name: facility.name || 'N/A',
            city: location.city,
            organizationName: organization.name
          }
        }
      )
    }
  },
  data () {
    return {
    }
  }
}
</script>
