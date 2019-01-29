import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// import Login from './views/AppUser/Login.vue'
import TheLogin from './views/TheLogin/TheLoginVuetify'

import AddressBook from './views/AddressBook/TheAddressBook.vue'
import TenantManager from './views/TenantManager/TheTenantManagerVuetify.vue'
import LicenseManager from './views/LicenseManager/TheLicenseManagerVuetify.vue'
import ProjectManager from './views/ProjectManager/TheProjectManagerVuetify.vue'
import OrganizationDetail from './views/Org/OrganizationDetailView/OrganizationDetailViewVuetify'
import ContactDetail from './views/Org/ContactDetailView/ContactDetailViewVuetify'
import FacilityDetail from './views/Org/FacilityDetailView/FacilityDetailViewVuetify'

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
      path: '/address-book',
      name: 'address-book',
      component: AddressBook
    },
    {
      path: '/tenant-manager',
      name: 'tenant-manager',
      component: TenantManager
    },
    {
      path: '/license-manager',
      name: 'license-manager',
      component: LicenseManager
    },
    {
      path: '/project-manager',
      name: 'project-manager',
      component: ProjectManager
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
