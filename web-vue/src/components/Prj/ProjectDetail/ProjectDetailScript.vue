<script>

export default {
  name: "ProjectDetailScript",
  props: {
    project: { 
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
      return this.project.contacts ? this.project.contacts.nodes || [] : []
    },
    facilities () {
      return this.project.facilities ? this.project.facilities.nodes || [] : []
    }
  },
  data () {
    return {
    }
  }
}
</script>
