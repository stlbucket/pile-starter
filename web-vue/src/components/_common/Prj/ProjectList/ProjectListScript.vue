<script>
export default {
  name: "ProjectListScript",
  props: {
    projects: {
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
      return this.projects.map(
        project => {
          const location = project.location || {
            city: 'N/A'
          }

          const primaryFacility = project.primaryFacility || {
            firstName: 'N/A',
            lastName: ''
          }

          return {
            id: project.id,
            name: project.name,
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
