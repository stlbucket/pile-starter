<template>
  <div>
    <license-detail-component
      :license="license"
    ></license-detail-component>
  </div>
</template>

<script>
import LicenseDetailViewScript from './LicenseDetailViewScript'
import LicenseDetailComponent from '@/components/Org/LicenseDetail/LicenseDetailVuetify'


export default {
  name: "LicenseDetailView",
  mixins: [LicenseDetailViewScript],
  components: {
    LicenseDetailComponent
  }
}
</script>
