const clog = require('fbkt-clog')
const Promise = require('bluebird')
const ApolloClient = require('apollo-client').ApolloClient;
const HttpLink = require('apollo-link-http').HttpLink;
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;
const fetch = require('node-fetch')
const gql = require('graphql-tag')

let _client;
let _clientInitializer;

const _graphqlEndpoint = process.env.SORO_QUOTING_API_ENDPOINT

if (_graphqlEndpoint === null || _graphqlEndpoint === undefined || _graphqlEndpoint === '') {
  throw new Error('SORO_QUOTING_API_ENDPOINT process variable must be defined');
}

let _soroAuth = process.env.SORO_AUTH;
let _soroUserName = process.env.SORO_USERNAME;
let _soroPassword = process.env.SORO_PASSWORD;

if (_soroAuth && (!_soroUserName || !_soroPassword)) {
  throw new Error('SORO AUTH ENABLED WITH NO EMAIL OR PASSWORD');
}

const signinUserMutation = gql(`mutation Authenticate(
  $username: String!
  $password: String!
  ){
  authenticate(input: {
    _username: $username,
    _password: $password
  }) {
    clientMutationId
    jwtToken
  }
}
`)

function initAuthClient () {
  // const _graphqlEndpoint = process.env.SORO_QUOTING_API_ENDPOINT

  // if (_graphqlEndpoint === null || _graphqlEndpoint === undefined || _graphqlEndpoint === '') {
  //   throw new Error('SORO_QUOTING_API_ENDPOINT process variable must be defined');
  // }
  
  // const _soroAuth = process.env.SORO_AUTH;
  // const _soroUserName = process.env.SORO_USERNAME;
  // const _soroPassword = process.env.SORO_PASSWORD;
  
  // if (_soroAuth && (!_soroUserName || !_soroPassword)) {
  //   throw new Error('SORO AUTH ENABLED WITH NO EMAIL OR PASSWORD');
  // }

  if (_clientInitializer) {
    return Promise.resolve(_clientInitializer);
  } else {
    _soroAuth = process.env.SORO_AUTH;
    _soroUserName = process.env.SORO_USERNAME;
    _soroPassword = process.env.SORO_PASSWORD;

    const _initClient = new ApolloClient({
      // By default, this client will send queries to the
      //  `/graphql` endpoint on the same host
      link: new HttpLink({uri: _graphqlEndpoint, fetch: fetch}),
      cache: new InMemoryCache()
    });

    clog('connecting', {
      username: _soroUserName,
      graphqlEndpoint: _graphqlEndpoint
    })
    
    console.log('username', _soroUserName)
    _clientInitializer = _initClient.mutate({
      mutation: signinUserMutation,
      variables: {
        username: _soroUserName,
        password: _soroPassword
      }
    })
      .then(result => {
        clog('SIGNIN RESULT', result);

        const token = result.data.authenticate.jwtToken;

        const headers = {
          'authorization': `Bearer ${token}`
        };

        clog('HEADERS', headers);

        _client = new ApolloClient({
          // By default, this client will send queries to the
          //  `/graphql` endpoint on the same host
          link: new HttpLink({uri: _graphqlEndpoint, fetch: fetch, headers: headers}),
          cache: new InMemoryCache()
        });

        return _client;
      })
      .catch(error => {
        clog.error('UNABLE TO AUTH APOLLO CLIENT', {
          error: error,
          username: _soroUserName
        });
        throw error;
      })

    return Promise.resolve(_clientInitializer);
  }
}

function initNoAuthClient () {
  _client = new ApolloClient({
    // By default, this client will send queries to the
    //  `/graphql` endpoint on the same host
    link: new HttpLink({uri: _graphqlEndpoint, fetch: fetch}),
    cache: new InMemoryCache()
  });

  return Promise.resolve(_client);
}

function connect () {

  if (_client) {
    return Promise.resolve(_client)
  } else if (_soroAuth) {
    return initAuthClient();
  } else {
    clog("NO AUTH - THAT'S NOT REALLY COOL");
    return initNoAuthClient();
  }
}

function disconnect() {
  _client = null
  _clientInitializer = null

  clog('APOLLO CLIENT DISCONNECTED', {
    _client: _client,
    _clientInitializer: _client
  })
}

module.exports = {
  connect: connect,
  disconnect: disconnect
};