<script>
import allContacts from '@/graphql/query/allContacts.graphql'
import allContactsForOrganization from '@/graphql/query/allContactsForOrganization.graphql'

export default {
  name: "ContactListViewScript",
  props: {
    organizationId: {
      type: String,
      required: false
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
      contacts: []
    }
  },
  apollo: {
    init: {
      query () {
        return this.organizationId !== null && this.organizationId !== undefined ? allContactsForOrganization : allContacts
      },
      fetchPolicy: 'network-only',
      variables () {
        return this.organizationId !== null && this.organizationId !== undefined ? {
          organizationId: this.organizationId
        } : null
      },
      update (data) {
        this.contacts = data.allContacts.nodes
      }
    }
  }
}
</script>
