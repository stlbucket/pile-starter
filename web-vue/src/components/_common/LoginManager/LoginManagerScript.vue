<script>
import {onLogout} from '@/vue-apollo.js'

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
      this.$router.push({name: 'home'})
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  data () {
    return {
    }
  },
}
</script>
