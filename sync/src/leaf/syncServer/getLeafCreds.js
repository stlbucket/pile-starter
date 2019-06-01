const clog = require('fbkt-clog')
const Datastore = require('@google-cloud/datastore')
const projectId = 'soro-webapp-164421'
process.env.GOOGLE_APPLICATION_CREDENTIALS = "./src/leaf/syncServer/Soro-webApp-1f818381d118.json"

function getWaCreds(){
  const stateLocationId = process.env.LEAF_MME_CODE
  if (!stateLocationId) {
    throw new Error('process.env.LEAF_MME_CODE not defined')
  }

  const datastore = new Datastore({
    projectId: projectId,
  });

  console.log('sta', stateLocationId)
  const query = datastore.createQuery('wa-creds')
    .filter('mjf-mme-code', '=', stateLocationId);

  return datastore
    .runQuery(query)
    .then(results => {
      // clog('cred result', results)
      // process.exit()
      const rawCred = results[0][0]
      if (rawCred) {
        return {
          name: rawCred.name,
          mmeCode: rawCred['mjf-mme-code'],
          mjfKey: rawCred['mjf-key']
        }
      } else {
        throw new Error(`No wa-creds for license: ${stateLocationId}`)
      }
    })
    .catch(err => {
      console.error('DATASTORE ERROR:', err);
    });
}

module.exports = getWaCreds

