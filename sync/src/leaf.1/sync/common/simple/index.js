const Promise = require('bluebird')
const moment = require('moment')
const clog = require('fbkt-clog')
// const leafSellerViewByStateLocationId = require('../../../gql/query/leafSellerViewByStateLocationId')
// const stateLocationId = process.env.LEAF_MME_CODE

function defaultEntityExists (existing, entity) {
  const found = (existing[entity.global_id] || []).find(ua => moment(ua).format() === moment(entity.updated_at, 'MM/DD/YYYY hh:mma').format())
  return found !== undefined && found !== null
}

async function syncOnePage (entityName, nextPageUrl, endpoint, mutation, seller, existing, entityExists, processor) {
  let entities
  let loadThese
  
  try {
    entities = await endpoint.list({
      url: nextPageUrl
    })

    console.log(`${entityName} batch count:`, entities.data.length)

    loadThese = entities.data
    // .filter(i => i.global_id === 'WAM426341.TY8MMI1')
    .filter(i => i.global_id !== null)
    .reduce(
      (acc, entity) => {
        const handler = typeof entityExists === 'function' ? entityExists : defaultEntityExists
        return handler(existing, entity) ? acc : acc.concat([entity])
      }, []
    )

    console.log(`loading ${entityName}:`, loadThese.length)

  } catch (error){
    clog('simple list', error)
    throw error
  }


  return Promise.mapSeries(
    loadThese,
    entity => {
      return mutation(entity, seller.id)
        .then(result => {
          if (typeof processor === 'function') {
            return processor(result.id)
              .then(processingResult => {
                return {
                  importResult: 'Processed'
                }
              })
          } else {
            return result
          }
        })
    }
  )
    .then(results => {
      const summary = results.reduce(
        (acc, result) => {
          return Object.assign(acc, {
            pageResults: Object.assign(acc.pageResults, {
              [result.importResult]: (acc.pageResults[result.importResult] || 0) + 1
            })
          })
        }, {
          "total": entities.total,
          "per_page": entities.per_page,
          "current_page": entities.current_page,
          "last_page": entities.last_page,
          "next_page_url": entities.next_page_url,
          "prev_page_url": entities.prev_page_url,
          "from": entities.from,
          "to": entities.to,
          pageResults: []
        }
      )
      // console.log('result....', summary)
      return summary
    })
    // .catch(error => {
    //   clog.error('ERROR.. SIMPLE', error)
    //   throw error
    // })
}

async function sync (seller, entityName, endpoint, mutation, existingQuery, entityExists, processor) {
  let url = null
  let allResults = []
  let existing = {}

  try {
    // const seller = await leafSellerViewByStateLocationId(stateLocationId)

    if (typeof existingQuery === 'function') {
      existing = (await existingQuery(seller.id)).reduce(
        (acc, item) => {
          const itemArray = (acc[item.globalId] || []).concat([item.updatedAt])
          return Object.assign(acc, {
            [item.globalId]: itemArray
          })
        }, {}
      )

    }

    do {
      const pageResult = await syncOnePage(entityName, url, endpoint, mutation, seller, existing, entityExists, processor)
      url = pageResult.next_page_url
      clog('pageResult', pageResult)
      allResults = allResults.concat([pageResult])
    }
    while (url)
    return allResults
  }
  catch (error) {
    throw error
  }
}

module.exports = sync
