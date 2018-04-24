const clog = require('fbkt-clog')
const Promise = require('bluebird')
const ApolloClient = require('apollo-client').ApolloClient
const HttpLink = require('apollo-link-http').HttpLink
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache
const fetch = require('node-fetch')
const gql = require('graphql-tag')

let _client
let _clientInitializer
let _credentials = {
  username: '',
  password: ''
};

let _graphqlEndpoint

const signinUserMutation = gql(`
mutation Authenticate(
  $username: String!
  $password: String!
){
  authenticate(input: {
    _username: $username
    _password: $password
  }) {
    jwtToken
  }
}
`)

function initAuthClient (_username, _password) {

  if (_clientInitializer) {
    return Promise.resolve(_clientInitializer)
  } else {
    const _initClient = new ApolloClient({
      // By default, this client will send queries to the
      //  `/graphql` endpoint on the same host
      link: new HttpLink({uri: _graphqlEndpoint, fetch: fetch}),
      cache: new InMemoryCache()
    })

    const variables = {
      username: _username,
      password: _password
    }

    _clientInitializer = _initClient.mutate({
      mutation: signinUserMutation,
      variables: variables
    })
      .then(result => {
        // clog('SIGNIN RESULT', result)
        // console.log('NEW APOLLO SIGNIN', _credentials.username)

        const token = result.data.authenticate.jwtToken

        const headers = {
          'authorization': `Bearer ${token}`
        }

        // clog('HEADERS', headers)

        _client = new ApolloClient({
          // By default, this client will send queries to the
          //  `/graphql` endpoint on the same host
          link: new HttpLink({uri: _graphqlEndpoint, fetch: fetch, headers: headers}),
          cache: new InMemoryCache()
        })

        return _client
      })
      .catch(error => {
        clog.error('UNABLE TO AUTH APOLLO CLIENT', {
          error: error,
          username: _username
        })
        throw error
      })

    return Promise.resolve(_clientInitializer)
  }
}

function setCredentials (credentials) {
  _client = null
  _clientInitializer = null
  _credentials.username = credentials.username
  _credentials.password = credentials.password
}

function setGraphqlEndpoint (endpoint) {
  _graphqlEndpoint = endpoint
}

function getClient () {
  const _username = _credentials.username
  const _password = _credentials.password

  if (_graphqlEndpoint === null || _graphqlEndpoint === undefined || _graphqlEndpoint === '') {
    throw new Error('APOLLO GRAPHQL ENDPOINT must be defined')
  }

  if (_client) {
    return Promise.resolve(_client)
  } else {
    return initAuthClient(_username, _password)
  }
}

function mutate (options) {
  return getClient()
    .then(client => {
      return client.mutate({
        mutation: gql(options.mutation),
        variables: options.variables || {}
      })
    })
    .then(result => {
      // clog('result', result)
      return options.resultPath.split('.').reduce(
        (acc, property) => {
          return acc[property]
        }, result.data
      )
    })
}

function query (options) {
  return getClient()
    .then(client => {
      return client.query({
        query: gql(options.query),
        variables: options.variables || {}
      })
    })
    .then(result => {
      return options.resultPath.split('.').reduce(
        (acc, property) => {
          return acc[property]
        }, result.data
      )
    })
}

module.exports = {
  connect: getClient,
  setGraphqlEndpoint: setGraphqlEndpoint,
  setCredentials: setCredentials,
  mutate: mutate,
  query: query
}