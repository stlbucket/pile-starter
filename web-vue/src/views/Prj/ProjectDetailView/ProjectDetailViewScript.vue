<script>
import projectById from '@/graphql/query/projectById.graphql'

export default {
  name: "ProjectDetailScript",
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
      project: {
        name: 'N/A'
      }
    }
  },
  apollo: {
    init: {
      query: projectById,
      fetchPolicy: 'network-only',
      variables () {
        // console.log('id', this.id)
        return {
          id: this.id
        }
      },
      update (data) {
        this.project = data.projectById
      }
    }
  }
}
</script>
