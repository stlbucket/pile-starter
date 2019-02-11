<script>

export default {
  name: "LocationDetailScript",
  props: {
    location: { 
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
      return this.location.name || 'N/A'
    }
  },
  data () {
    return {
    }
  }
}
</script>
