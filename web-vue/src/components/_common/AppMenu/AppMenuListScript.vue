<script>
export default {
  name: "AppMenuListScript",
  components: {
  },
  methods: {
    appSelected (app) {
      this.$router.push({name: app.routeName})
    },
    // calculateAllowedAppList () {
    //   this.allowedAppList = this.appList.reduce(
    //     (a, app) => {
    //       const userLicense = this.currentAppUser ? this.currentAppUser.licenses.nodes.find(l => l.licenseType.application.key === app.key) : null
    //       return userLicense ? a.concat([app]) : a
    //     }, []
    //   )
    // },
  },
  computed: {
    allowedAppList () {
      console.log('wha', this.currentAppUser)
      return this.appList.reduce(
        (a, app) => {
          const userLicense = this.currentAppUser ? this.currentAppUser.licenses.nodes.find(l => l.licenseType.application.key === app.key) : null
          return userLicense ? a.concat([app]) : a
        }, []
      )
    },
    showAppList () {
      return this.$store.state.currentAppUser !== null
    },
    currentAppUser () {
      return this.$store.state.currentAppUser
    }
  },
  watch: {
    currentAppUser () {
      console.log('cur', this.currentAppUser)
      // this.calculateAllowedAppList()
    }
  },
  data () {
    return {
      // allowedAppList: [],
      appList: [
        {
          key: 'tenant-manager',
          name: 'Tenant Manager',
          routeName: 'tenant-manager',
          iconKey: 'location_city'
        },
        {
          key: 'license-manager',
          name: 'License Manager',
          routeName: 'license-manager',
          iconKey: 'domain'
        },
        {
          key: 'address-book',
          name: 'Address Book',
          routeName: 'address-book',
          iconKey: 'people'
        },
        {
          key: 'project-manager',
          name: 'Project Manager',
          routeName: 'project-manager',
          iconKey: 'hot_tub'
        }
      ]
    }
  },
}
</script>
