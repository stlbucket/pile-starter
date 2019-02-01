<template>
  <div>
    <h1>Name: {{ project.name }}</h1>
    <hr>
    <v-textarea
      :value="JSON.stringify(project,0,2)"
      auto-grow
    ></v-textarea>
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
