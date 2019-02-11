<script>

export default {
  name: "LicenseTypeDetailScript",
  props: {
    licenseType: { 
      type: Object,
      required: true
    }
  },
  components: {
  },
  methods: {
  },
  computed: { 
    name () {
      return this.licenseType.name || 'N/A'
    }
  },
  data () {
    return {
    }
  }
}
</script>
