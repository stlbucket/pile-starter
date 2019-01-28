<script>

export default {
  name: "ContactDetailScript",
  props: {
    contact: { 
      type: Object,
      required: true
    }
  },
  components: {
  },
  methods: {
  },
  computed: { 
    fullName () {
      return `${this.contact.firstName} ${this.contact.lastName}`
    }
  },
  data () {
    return {
    }
  }
}
</script>
