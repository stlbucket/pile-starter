<script>
export default {
  name: "CurrentAppUserContactScript",
  components: {
  },
  methods: {
  },
  computed: {
    currentAppUserContact () {
      return this.$store.state.currentAppUserContact
    },
    fullName () {
      return this.currentAppUserContact ? `${this.currentAppUserContact.firstName} ${this.currentAppUserContact.lastName}` : ''
    }
  },
  data () {
    return {
    }
  },
}
</script>
