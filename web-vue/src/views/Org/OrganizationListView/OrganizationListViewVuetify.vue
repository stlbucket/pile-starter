<template>
  <div>
    <organization-list-component
      :organizations="organizations"
    ></organization-list-component>
  </div>
</template>

<script>
import OrganizationListViewScript from './OrganizationListViewScript'
import OrganizationListComponent from '@/components/Org/OrganizationList/OrganizationListVuetify'

export default {
  name: "OrganizationListViewVuetify",
  mixins: [OrganizationListViewScript],
  components: {
    OrganizationListComponent
  }
}
</script>
