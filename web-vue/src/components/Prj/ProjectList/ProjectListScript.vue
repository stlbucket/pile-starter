<script>
export default {
  name: "ProjectListScript",
  props: {
    projects: {
      type: Array,
      required: true
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
          return {
            id: project.id,
            name: project.name,
            appTenantName: project.organization.name
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
