<template>
  <div>
    <project-list-component
      :projects="projects"
    ></project-list-component>
  </div>
</template>

<script>
import ProjectListViewScript from './ProjectListViewScript'
import ProjectListComponent from '@/components/Prj/ProjectList/ProjectListVuetify'

export default {
  name: "ProjectListViewVuetify",
  mixins: [ProjectListViewScript],
  components: {
    ProjectListComponent
  }
}
</script>
