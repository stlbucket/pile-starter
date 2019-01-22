<script>
export default {
  name: "AppMenuScript",
  components: {
  },
  methods: {
    appSelected (app) {
      this.$router.push({name: app.routeName})
    }
  },
  computed: {
    showAppList () {
      return this.$store.state.currentAppUserContact !== null
    }
  },
  data () {
    return {
      appList: [
        {
          key: 'address-book',
          name: 'Address Book',
          routeName: 'address-book',
          iconKey: 'settings_phone'
        }
      ]
    }
  },
}
</script>
