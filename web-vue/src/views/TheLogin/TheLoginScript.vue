<script>
import loginMutation from '@/graphql/mutation/login.graphql'
import currentAppUserContact from '@/graphql/query/currentAppUserContact.graphql'
import {onLogin} from '@/vue-apollo.js'

export default {
  name: "TheLoginScript",
  components: {
  },
  methods: {
    login () {
      const variables = {
        username: this.username,
        password: this.password
      }

      this.$apollo.mutate({
        mutation: loginMutation,
        variables: variables
      })
      .then(result => {
        onLogin(this.$apollo, result.data.authenticate.jwtToken)
        this.getCurrentAppUserContact()
        this.$eventHub.$emit('login')
        // this.$router.push({name: 'home'})
      })
      .catch(error => {
        console.log('ERROR', error)
      })
    },
    getCurrentAppUserContact () {
      this.$apollo.query({
        query: currentAppUserContact,
        variables: {}
      })
      .then(result => {
        console.log('currentAppUserContact', result.data.allAppUsers.nodes[0].contact)
        this.$store.commit('login', { currentAppUserContact: result.data.allAppUsers.nodes[0].contact })
        this.$router.push({name: 'home'})
      })
      .catch(error => {
        console.log('ERROR', error)
      })
    }
  },
  computed: {
  },
  data () {
    return {
      username: 'testAdmin001',
      password: 'badpassword'
    }
  },
}
</script>
