<template>
  <div>
    <h1>Name: {{ project.name }}</h1>
    <hr>
  </div>
</template>

<script>
import ProjectDetailScript from './ProjectDetailScript'

export default {
  name: "ProjectDetail",
  mixins: [ProjectDetailScript],
  components: {
  }
}
</script>
