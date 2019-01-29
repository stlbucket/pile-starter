<script>
import loginMutation from '@/graphql/mutation/login.graphql'
import currentAppUser from '@/graphql/query/currentAppUser.graphql'
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
      })
      .catch(error => {
        console.log('ERROR', error)
      })
    },
    getCurrentAppUserContact () {
      this.$apollo.query({
        query: currentAppUser,
        fetchPolicy: 'network-only',
        variables: {}
      })
      .then(result => {
        console.log('currentAppUser', result)
        this.$store.commit('login', { currentAppUser: result.data.allAppUsers.nodes[0] })
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
