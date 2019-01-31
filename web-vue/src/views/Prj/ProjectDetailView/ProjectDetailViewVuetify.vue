<template>
  <div>
    <project-detail-component
      :project="project"
    ></project-detail-component>
  </div>
</template>

<script>
import ProjectDetailViewScript from './ProjectDetailViewScript'
import ProjectDetailComponent from '@/components/Prj/ProjectDetail/ProjectDetailVuetify'


export default {
  name: "ProjectDetailView",
  mixins: [ProjectDetailViewScript],
  components: {
    ProjectDetailComponent
  }
}
</script>