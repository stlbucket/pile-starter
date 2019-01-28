<script>

export default {
  name: "OrganizationDetailScript",
  props: {
    organization: { 
      type: Object,
      required: true
    }
  },
  components: {
  },
  methods: {
  },
  computed: { 
    contacts () {
      return this.organization.contacts ? this.organization.contacts.nodes || [] : []
    },
    facilities () {
      return this.organization.facilities ? this.organization.facilities.nodes || [] : []
    }
  },
  data () {
    return {
    }
  }
}
</script>
