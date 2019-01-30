<template>
  <div>
    <entity-list-vuetify
      :headers="headers"
      :items="items"
      :columns="columns"
    ></entity-list-vuetify>
  </div>
</template>

<script>
import LicenseListScript from './LicenseListScript'
import EntityListVuetify from '../../_common/EntityListVuetify'

export default {
  name: "LicenseList",
  mixins: [LicenseListScript],
  components: {
    EntityListVuetify
  },
  data () {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Tenant', value: 'appTenantName' },
        { text: 'Key', value: 'licenseTypeKey' },
        { text: 'Application', value: 'applicationName' },
        { text: 'Assigned To', value: 'AssignedTo' },
      ],
      columns: [
        { 
          name: 'name', 
          routeLink: { 
            name: "license-detail", 
            params: {
              id: 'id'
            }
          } 
        },
        { name: 'appTenantName' },
        { name: 'licenseTypeKey' },
        { name: 'applicationName' },
        { name: 'assignedTo' }
      ]
    }
  }
}
</script>
