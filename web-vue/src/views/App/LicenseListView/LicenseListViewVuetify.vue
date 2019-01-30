<template>
  <div>
    <license-list-component
      :licenses="licenses"
    ></license-list-component>
  </div>
</template>

<script>
import LicenseListViewScript from './LicenseListViewScript'
import LicenseListComponent from '@/components/App/LicenseList/LicenseListVuetify'

export default {
  name: "LicenseList",
  mixins: [LicenseListViewScript],
  components: {
    LicenseListComponent
  }
}
</script>
