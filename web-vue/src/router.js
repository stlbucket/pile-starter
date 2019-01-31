import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// import Login from './views/AppUser/Login.vue'
import TheLogin from './views/TheLogin/TheLoginVuetify'

import TenantManager from './views/TenantManager/TheTenantManagerVuetify.vue'
import AppTenantDetail from './views/Auth/AppTenantDetailView/AppTenantDetailViewVuetify'

import LicenseManager from './views/LicenseManager/TheLicenseManagerVuetify.vue'
import LicenseDetail from './views/App/LicenseDetailView/LicenseDetailViewVuetify'

import AddressBook from './views/AddressBook/TheAddressBook.vue'
import OrganizationDetail from './views/Org/OrganizationDetailView/OrganizationDetailViewVuetify'
import ContactDetail from './views/Org/ContactDetailView/ContactDetailViewVuetify'
import FacilityDetail from './views/Org/FacilityDetailView/FacilityDetailViewVuetify'

import ProjectManager from './views/ProjectManager/TheProjectManagerVuetify.vue'
import ProjectDetail from './views/Prj/ProjectDetailView/ProjectDetailViewVuetify.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: TheLogin
    },
    {
      path: '/tenant-manager',
      name: 'tenant-manager',
      component: TenantManager
    },
    {
      path: '/app-tenant-manager/app-tenant/:id',
      name: 'app-tenant-detail',
      component: AppTenantDetail,
      props: true
    },
    {
      path: '/license-manager',
      name: 'license-manager',
      component: LicenseManager
    },
    {
      path: '/license-manager/license/:id',
      name: 'license-detail',
      component: LicenseDetail,
      props: true
    },
    {
      path: '/address-book',
      name: 'address-book',
      component: AddressBook
    },
    {
      path: '/project-manager',
      name: 'project-manager',
      component: ProjectManager
    },
    {
      path: '/project-manager/project/:id',
      name: 'project-detail',
      component: ProjectDetail,
      props: true
    },
    {
      path: '/address-book/organization/:id',
      name: 'organization-detail',
      component: OrganizationDetail,
      props: true
    },
    {
      path: '/address-book/contact/:id',
      name: 'contact-detail',
      component: ContactDetail,
      props: true
    },
    {
      path: '/address-book/facility/:id',
      name: 'facility-detail',
      component: FacilityDetail,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
