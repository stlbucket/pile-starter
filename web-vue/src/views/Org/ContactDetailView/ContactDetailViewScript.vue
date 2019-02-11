<script>
import contactById from '@/graphql/query/contactById.graphql'

export default {
  name: "ContactDetailScript",
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
      return this.contact.location || { name: 'N/A' }
    }
  },
  data () {
    return {
      contact: {
        name: 'N/A'
      }
    }
  },
  apollo: {
    init: {
      query: contactById,
      fetchPolicy: 'network-only',
      variables () {
        return {
          id: this.id
        }
      },
      update (data) {
        this.contact = data.contactById
      }
    }
  }
}
</script>
