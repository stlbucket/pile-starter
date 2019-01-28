<script>
import currentAppUserContactQuery from '@/graphql/query/currentAppUserContact.graphql'

export default {
  name: "CurrentAppUserContactScript",
  components: {
  },
  methods: {
    // reInit () {
    //   this.$apollo.queries.init.refetch()
    // }
  },
  computed: {
    currentAppUserContact () {
      return this.$store.state.currentAppUserContact
    },
    fullName () {
      return this.currentAppUserContact ? `${this.currentAppUserContact.firstName} ${this.currentAppUserContact.lastName}` : ''
    },
    // isLoggedIn () {
    //   // return $store.state.isLoggedIn
    // }
  },
  // watch: {
  //   isLoggedIn () {
  //     this.reInit()
  //   }
  // },
  data () {
    return {
    }
  },
  // apollo: {
  //   init: {
  //     query: currentAppUserContactQuery,
  //     fetchPolicy: 'network-only',
  //     update (data) {
  //       if (data.allAppUsers) {
  //         this.currentAppUserContact = data.allAppUsers.nodes[0].contact
  //         this.$store.commit('currentAppUserContact', { currentAppUserContact: data.allAppUsers.nodes[0].contact })
  //       }
  //     },
  //     error (error) {
  //       this.currentAppUserContact = {
  //         firstName: 'No',
  //         lastName: 'User'
  //       }
  //       this.$store.commit('currentAppUserContact', { currentAppUserContact: null })
  //     }
  //   }
  // }
}
</script>
