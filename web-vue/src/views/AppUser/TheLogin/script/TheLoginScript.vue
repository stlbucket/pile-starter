<script>
import loginMutation from './graphql/mutation/login.graphql'
import currentAppUserContactMutation from './graphql/mutation/currentAppUserContact.graphql'
import {onLogin} from '../../../../vue-apollo.js'

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
        this.$store.commit('authToken', { authToken: result.data.authenticate.jwtToken })
        onLogin(this.$apollo, result.data.authenticate.jwtToken)       
        this.getCurrentAppUserContact() 
      })
      .catch(error => {
        console.log('ERROR', error)
      })
    },
    getCurrentAppUserContact () {
      this.$apollo.mutate({
        mutation: currentAppUserContactMutation,
        variables: {}
      })
      .then(result => {
        console.log('currentAppUserContact', result)
        this.$store.commit('currentAppUserContact', { currentAppUserContact: result.data.currentAppUserContact.contact })
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
      username: 'defaultadmin@tst.tst',
      password: 'badpassword'
    }
  },
}
</script>
