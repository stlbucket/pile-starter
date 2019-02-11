<script>

export default {
  name: "ApplicationDetailScript",
  props: {
    application: { 
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
      return this.application.name || 'N/A'
    }
  },
  data () {
    return {
    }
  }
}
</script>
