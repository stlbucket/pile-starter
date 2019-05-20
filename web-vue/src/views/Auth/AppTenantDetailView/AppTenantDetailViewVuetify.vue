<template>
  <v-container grid-list-md text-xs-center>
    <v-card>
      <v-card-title class="headline">App appTenant</v-card-title>
      <v-layout row wrap>
        <v-flex xs4>
          <appTenant-detail-component
            :appTenant="appTenant"
          ></appTenant-detail-component>
          <v-expansion-panel>
            <v-expansion-panel-content key="location">
              <div slot="header">Organization</div>
              <v-card raised>
                <organization-detail-component
                  :organization="organization"
                ></organization-detail-component>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <v-flex xs8>
          <v-card raised>
            <v-tabs
              dark
              slider-color="yellow"
            >
              <!-- <v-tab
                key="contact-list"
                ripple
              >
                Users
              </v-tab>
              <v-tab-item
                key="contact-list"
              >
                <contact-list
                  :contacts="contacts"
                ></contact-list>
              </v-tab-item> -->
              <v-tab
                key="license-list"
                ripple
              >
                Licenses
              </v-tab>
              <v-tab-item
                key="license-list"
              >
                <license-list-component
                  :licenses="licenses"
                ></license-list-component>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import AppTenantDetailViewScript from './AppTenantDetailViewScript'
import AppTenantDetailComponent from '@/components/Auth/AppTenantDetail/AppTenantDetailVuetify'
import OrganizationDetailComponent from '@/components/Org/OrganizationDetail/OrganizationDetailVuetify'
import LicenseListComponent from '@/components/App/LicenseList/LicenseListVuetify'


export default {
  name: "AppTenantDetailView",
  mixins: [AppTenantDetailViewScript],
  components: {
    AppTenantDetailComponent,
    OrganizationDetailComponent,
    LicenseListComponent
  }
}
</script>
