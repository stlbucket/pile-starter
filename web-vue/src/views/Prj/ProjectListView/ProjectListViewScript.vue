<script>
import allProjects from '@/graphql/query/allProjects.graphql'

export default {
  name: "ProjectListScript",
  components: {
  },
  methods: {
  },
  computed: {
  },
  data () {
    return {
      projects: []
    }
  },
  apollo: {
    init: {
      query: allProjects
      ,fetchPolicy: 'network-only'
      ,update (data) {
        this.projects = data.allProjects.nodes
      }
    }
  }
}
</script>
