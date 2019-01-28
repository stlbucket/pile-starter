<script>
export default {
  name: "AppMenuListScript",
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
    },
    currentAppUserContact () {
      return this.$store.state.currentAppUserContact
    }
  },
  watch: {
    currentAppUserContact () {
      console.log('cur', this.currentAppUserContact)
    }
  },
  data () {
    return {
      appList: [
        {
          key: 'license-manager',
          name: 'License Manager',
          routeName: 'license-manager-book',
          iconKey: 'settings_phone'
        },
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
