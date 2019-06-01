const Promise = require('bluebird')
const clog = require('fbkt-clog')
const axios = require('axios')

const standardMethodEnum = {
  create: 'create',
  update: 'update',
  list: 'list',
  del: 'del'
}

class EndpointManager{
  constructor (endpointInfo){

    this.endpointInfo = endpointInfo
    this.supportedMethods = this.endpointInfo.supportedMethods || Object.values(standardMethodEnum)
    this.listResultHasNoDataField = endpointInfo.listResultHasNoDataField === true
  }

  reportError(msg, error){
    clog.error(`ERROR - ${msg}`,
      {
        error: error.toString(),
        url: (error.config || {}).url,
        headers: (error.config || {}).headers,
        params: (error.config || {}).params,
        endpointInfo: this.endpointInfo
      })
  }

  static standardMethodEnum(){
    return standardMethodEnum
  }

  get entityName () {
    return this.endpointInfo.entityName
  }
  
  buildHeaders () {
    clog('stuff', {
      mmeKey: process.env.LEAF_MME_KEY,
      mmeCode: process.env.LEAF_MME_CODE
    })
    
    return {
      'Content-Type': 'application/json',
      'user-agent': 'soro-software-leaf-sync',
      'x-mjf-key': process.env.LEAF_MME_KEY,
      'x-mjf-mme-code': process.env.LEAF_MME_CODE
    }
  }
  
  executeApiCall (options, name) {
    const callOptions = Object.assign(options, {
      headers: this.buildHeaders()
    })

    // clog('callOptions', callOptions)

    return axios(callOptions)
      .catch(error => {
        clog(`LEAF API ERROR: ${name}`, {
          config: error.config,
          error: error.toString(),
          url: (error.config || {}).url,
          headers: (error.config || {}).headers,
          params: (error.config || {}).params,
          endpointInfo: this.endpointInfo
        })
        throw error
      })
  }

  findOrCreate(entity){
    if (!entity.external_id) {
      throw new Error(`Must define external_id for findOrCreate: ${JSON.stringify(entity)}`)
    }

    return this.findByExternalId(entity.external_id)
      .then(existing => {
        if (existing) {
          return this.create(entity)
        } else {
          return existing[0]
        }
      })
  }

  findByExternalId (externalId) {
    return this.executeApiCall({
        url: `${process.env.LEAF_BASE_API}/${this.endpointInfo.name}`,
        method: 'get',
        dataType: 'json',
        data: {
          externalId: externalId
        }
      },
      'FIND BY EXTERNAL ID'
    )
      .then(result => {
        return result.data.data.find(i => i.external_id === externalId)
      })
  }

  findByGlobalId (globalId) {
    return this.executeApiCall({
        url: `${process.env.LEAF_BASE_API}/${this.endpointInfo.name}`,
        method: 'get',
        dataType: 'json',
        params: {
          f_global_id: globalId
        }
      },
      'FIND BY GLOBAL ID'
    )
      .then(result => {
        return result.data.data
      })
  }

  create (entity) {
    if (this.supportedMethods.indexOf(standardMethodEnum.create) === -1) {
      throw new Error(`create not supported for entity: ${JSON.stringify(this.endpointInfo)}`)
    }

    const callInfo = {
      url: `${process.env.LEAF_BASE_API}/${this.endpointInfo.name}`,
      method: 'post',
      dataType: 'json',
      data: {
        [this.endpointInfo.entityName]: [
          entity
        ]
      }
    }

    return this.executeApiCall(callInfo, 'CREATE')
      .then(result => {
        // clog(`CREATE RESULT - ${this.endpointInfo.entityName}`, result.data)
        return result.data
      })
  }

  update (entity) {
    if (this.supportedMethods.indexOf(standardMethodEnum.update) === -1) {
      throw new Error(`update not supported for entity: ${JSON.stringify(this.endpointInfo)}`)
    }
    return this.executeApiCall({
        url: `${process.env.LEAF_BASE_API}/${this.endpointInfo.name}/update`,
        method: 'post',
        dataType: 'json',
        data: {
          [this.endpointInfo.entityName]: [
            entity
          ]
        }
      },
      'UPDATE'
    )
      .then(result => {
        return result.data
      })
      .catch(error => {
        this.reportError('UPDATE', error)
        throw error
      })
  }

  list(options){
    options = options || {}
    if (this.supportedMethods.indexOf(standardMethodEnum.list) === -1) {
      throw new Error(`list not supported for entity: ${JSON.stringify(this.endpointInfo)}`)
    }
    return this.executeApiCall({
        url: options.url || `${process.env.LEAF_BASE_API}/${this.endpointInfo.name}`,
        method: 'get',
        dataType: 'json',
        data: '',
        params: options.params
      },
      'LIST'
    )
      .then(result => {
        let retval

        if (this.listResultHasNoDataField) {
          retval = result
        } else {
          if (!(result.data.data instanceof Array)) {
            const acc = {
              ...result.data,
              data: []
            }
            // clog('NOT AN ARRAY', Object.keys(result.data.data).slice(0, 10))
            retval = Object.keys(result.data.data).reduce(
              (acc, key) => {
                return Object.assign(acc, {
                  data: acc.data.concat([result.data.data[key]])
                })
              },
              acc
            )
          } else {
            retval = result.data
          }
        }

        return retval
      })
  }

  del(id){
    if (this.supportedMethods.indexOf(standardMethodEnum.del ) === -1) {
      throw new Error(`del not supported for entity: ${JSON.stringify(this.endpointInfo)}`)
    }
    return this.executeApiCall({
        url: `${process.env.LEAF_BASE_API}/${this.endpointInfo.name}/${id}`,
        method: 'delete',
        dataType: 'json',
        data: {}
      },
      'DELETE'
    )
      .then(result => {
        return result.data
      })
  }
}

module.exports = EndpointManager

