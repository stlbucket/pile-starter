<script>
import currentAppUserContactQuery from './currentAppUserContact.graphql'

export default {
  name: "CurrentAppUserContactScript",
  components: {
  },
  methods: {
    reInit () {
      this.$apollo.queries.init.refetch()
    }
  },
  computed: {
    fullName () {
      return this.currentAppUserContact ? `${this.currentAppUserContact.firstName} ${this.currentAppUserContact.lastName}` : ''
    }
  },
  data () {
    return {
      currentAppUserContact: {
        firstName: 'No',
        lastName: 'User'
      }
    }
  },
  apollo: {
    init: {
      query: currentAppUserContactQuery,
      fetchPolicy: 'network-only',
      update (data) {
        if (data.allAppUsers) {
          this.currentAppUserContact = data.allAppUsers.nodes[0].contact
          this.$store.commit('currentAppUserContact', { currentAppUserContact: data.allAppUsers.nodes[0].contact })
        }
      },
      error (error) {
        this.currentAppUserContact = {
          firstName: 'No',
          lastName: 'User'
        }
        this.$store.commit('currentAppUserContact', { currentAppUserContact: null })
      }
    }
  },
  created () {
    this.$eventHub.$on('login', this.reInit)
    this.$eventHub.$on('logout', this.reInit)
  },
  beforeDestroy() {
    this.$eventHub.$off('login')
    this.$eventHub.$off('logout')
  }
}
</script>
