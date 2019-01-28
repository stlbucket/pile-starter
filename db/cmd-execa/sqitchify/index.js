#!/usr/bin/env node
const clog = require('fbkt-clog')
const convertPackageSet = require('./convertPackageSet')

const packages = [
  { 
    name: 'projects',
    sourceDir: '/release/001/010-prj-mig/migrations/',
    targetDir: '/release/001/010-prj/'
  }
]

convertPackageSet(packages)
.then(result => {
  clog('SQITCHIFIED', result)
})
.catch(error => {
  clog.error('NOT SQITCHIFIED', error)
})
