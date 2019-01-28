<script>

export default {
  name: "FacilityDetailScript",
  props: {
    facility: { 
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
      return this.facility.name || 'N/A'
    }
  },
  data () {
    return {
    }
  }
}
</script>
