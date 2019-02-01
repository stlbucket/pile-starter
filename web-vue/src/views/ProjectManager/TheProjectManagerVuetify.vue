<template>
  <div>
    <h1>Project Manager</h1>
    <hr>
    <project-list-view></project-list-view>
  </div>
</template>

<script>
  import ProjectListView from '../Prj/ProjectListView/ProjectListViewVuetify.vue'


  export default {
    name: 'TheProjectManager',
    components: {
      ProjectListView
    }
  }
</script>
