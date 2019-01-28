<template>
  <div>
    <organization-detail-component
      :organization="organization"
    ></organization-detail-component>
  </div>
</template>

<script>
import OrganizationDetailViewScript from './OrganizationDetailViewScript'
import OrganizationDetailComponent from '@/components/Org/OrganizationDetail/OrganizationDetailVuetify'


export default {
  name: "OrganizationDetailView",
  mixins: [OrganizationDetailViewScript],
  components: {
    OrganizationDetailComponent
  }
}
</script>
