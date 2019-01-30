<script>
import licenseById from '@/graphql/query/licenseById.graphql'

export default {
  name: "LicenseDetailScript",
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
      license: {
        name: 'N/A'
      }
    }
  },
  apollo: {
    init: {
      query: licenseById,
      fetchPolicy: 'network-only',
      variables () {
        return {
          id: this.id
        }
      },
      update (data) {
        this.license = data.licenseById
      }
    }
  }
}
</script>
