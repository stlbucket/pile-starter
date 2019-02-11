<template>
  <v-container grid-list-md text-xs-center>
    <v-card>
      <v-card-title class="headline">License</v-card-title>
      <v-layout row wrap>
        <v-flex xs4>
          <license-detail-component
            :license="license"
          ></license-detail-component>
          <v-expansion-panel>
            <v-expansion-panel-content key="organization">
              <div slot="header">Organization</div>
              <v-card raised>
                <organization-detail-component
                  :organization="organization"
                ></organization-detail-component>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content key="assignedToContact">
              <div slot="header">Assigned To</div>
              <v-card raised>
                <contact-detail-component
                  :contact="assignedToContact"
                ></contact-detail-component>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content key="application">
              <div slot="header">Application</div>
              <v-card raised>
                <application-detail-component
                  :application="application"
                ></application-detail-component>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content key="licenseType">
              <div slot="header">LicenseType</div>
              <v-card raised>
                <license-type-detail-component
                  :licenseType="licenseType"
                ></license-type-detail-component>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import LicenseDetailViewScript from './LicenseDetailViewScript'
import LicenseDetailComponent from '@/components/App/LicenseDetail/LicenseDetailVuetify'
import LicenseTypeDetailComponent from '@/components/App/LicenseTypeDetail/LicenseTypeDetailVuetify'
import ApplicationDetailComponent from '@/components/App/ApplicationDetail/ApplicationDetailVuetify'
import OrganizationDetailComponent from '@/components/Org/OrganizationDetail/OrganizationDetailVuetify'
import ContactDetailComponent from '@/components/Org/ContactDetail/ContactDetailVuetify'


export default {
  name: "LicenseDetailView",
  mixins: [LicenseDetailViewScript],
  components: {
    LicenseDetailComponent,
    LicenseTypeDetailComponent,
    ApplicationDetailComponent,
    OrganizationDetailComponent,
    ContactDetailComponent
  }
}
</script>
