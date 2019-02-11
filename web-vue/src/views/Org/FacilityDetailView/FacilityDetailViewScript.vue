<script>
import facilityById from '@/graphql/query/facilityById.graphql'

export default {
  name: "FacilityDetailScript",
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
    location () {
      return this.facility.location || { name: 'N/A' }
    }
  },
  data () {
    return {
      facility: {
        name: 'N/A'
      }
    }
  },
  apollo: {
    init: {
      query: facilityById,
      fetchPolicy: 'network-only',
      variables () {
        return {
          id: this.id
        }
      },
      update (data) {
        this.facility = data.facilityById
      }
    }
  }
}
</script>
