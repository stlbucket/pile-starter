<script>
import {onLogout} from '../../../vue-apollo.js'

export default {
  name: "LoginManagerScript",
  components: {
  },
  methods: {
    login() {
      this.$router.push({ name: 'login'})
    },
    logout () {
      onLogout(this.$apollo)

      this.$store.commit('logout')
      this.$router.push({name:'home'})
    }
  },
  computed: {
    loginHidden () {
      return this.$store.state.authToken !== null
    },
    logoutHidden () {
      return this.$store.state.authToken === null
    }
  },
  data () {
    return {
    }
  },
}
</script>
