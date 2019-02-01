<template>
  <div>
    <h1>Phile Starter</h1>
    <h2>A starter kit for building GraphQL APIs with Postgraphile.</h2>
    <hr>
    <h3>Explore the api thru <a :href="graphiqlUrl" target="_blank">graphiql</a></h3>
    <hr>
    <v-tabs
      dark
      slider-color="yellow"
    >
      <v-tab
        key="philosophy"
        ripple
      >
        Philosophy
      </v-tab>
      <v-tab-item>
        <v-card>
          <h1>Phile-Starter Philosopy</h1>
          <hr>
          <p>
            Phile-starter is a collection of schemas that capture data structures that are commonly needed to 
            build applications ranging from simple data management to collaborative, partially automated, processes.
          </p>
          <p>
            Phile-starter is a starting point for incorporating test-driven development practices into a database-first development
            process targeted at the postgres/postgraphile ecosystem.
          </p>
          <p>
            Phile-starter is an example of a full-stack application build with:
            <ul>
              <li><a href="https://vuejs.org/" target="_blank">Vue.js</a></li>
              <li><a href="https://graphql.org/" target="_blank">GraphQL</a> via <a href="https://www.graphile.org/postgraphile/" target="_blank">Postgraphile</a></li>              
              <li><a href="https://www.postgresql.org/" target="_blank">Postgres</a></li>
            </ul>
          </p>
          <p>
            Phile-starter is designed to be a maintainable and evolving component of a <a href="https://microservices.io" target="_blank">microservices</a> ecosystem.
          </p>
          <h2>Additional Resources</h2>
          <ul>
            <li><a href="https://learn.graphile.org/" target="_blank">https://learn.graphile.org/</a></li>
          </ul>
        </v-card>
      </v-tab-item>

      <v-tab
        key="usage"
        ripple
      >
        Usage
      </v-tab>
      <v-tab-item>
        <v-card>
          <h1>Getting Started</h1>
          <hr>
          <p>
            In a nutshell, these are the high-level steps to begin work on a new project:
            <ol>
              <li>clone the <a href="https://github.com/stlbucket/phile-starter" target="_blank">phile-starter</a> repo</li>
              <li>configure your database environment, including which starter schemas you will be using</li>
              <li>add your new app schema(s)</li>
              <li>configure the api to use appropriate schemas</li>
              <li>run api and web-vue</li>
              <li>iteratively develop</li>
              <li>???</li>
              <li>profit!</li>
            </ol>
          </p>
          <p>
            schemas include:
            <ul>
              <li>auth - app tenants and their users</li>
              <li>
                org - basic organization/contact/facility management, all with location as a central concept.
                other schemas will leverage these tables and relationships
              </li>
              <li>msg - provide for messaging between org.contacts.  support for in-app/email/sms and more.</li>
              <li>app - licensing for app tenants and their users</li>
              <li>prj - basic project management based on milestone and tasks.  coordinate the efforts of contacts from the org schema.</li>
              <li>app_jobs - supports asynchronous processing for automated server tasks</li>
              <li>
                wf - build custom workflows to support business processes.  workflow steps might be automated via app_jobs or triggered
                by user actions.  integration with prj could lead to more advanced scenarios (tasks as workflows, etc)
              </li>
              <li>evt - support for <a href="https://microservices.io/patterns/data/event-sourcing.html" target="_blank">event sourcing</a> in a microservices scenario</li>
              <li>shard - an <a href="https://rob.conery.io/2014/05/28/a-better-id-generator-for-postgresql/" target="_blank">id generator</a> to support later scalability</li>
            </ul>
          </p>
        </v-card>
      </v-tab-item>

      <v-tab
        key="schemata"
        ripple
      >
        Schemata
      </v-tab>
      <v-tab-item
        key="schemata"
      >
        <v-card>
          <v-tabs
            dark
            slider-color="yellow"
          >
            <v-tab
              key="intro"
              ripple
            >
              Intro
            </v-tab>
            <v-tab-item>
              <v-card>
                <h1>The Schemata</h1>
                <hr>
                <p>
                  In a nutshell, these are the high-level steps to begin work on a new project:
                  <ol>
                    <li>clone the <a href="https://github.com/stlbucket/phile-starter" target="_blank">phile-starter</a> repo</li>
                  </ol>
                </p>
                <p>
                  schemas include:
                  <ul>
                    <li>auth - app tenants and their users</li>
                  </ul>
                </p>
              </v-card>
            </v-tab-item>

            <v-tab
              v-for="schema in schemas"
              :key="schema"
              ripple
            >
              {{ schema }}
            </v-tab>
            <v-tab-item
              v-for="schema in schemas"
              :key="schema"
            >
              <v-card>
                <v-img
                :src="`${publicPath}schema-diagrams/${schema}.gif`"
                max-width="1000"
                max-height="1000"
                ></v-img>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>

export default {
  name: "Home",
  components: {
  },
  computed: {
    graphiqlUrl () {
      console.log('w', window.location.origin)
      return `${window.location.origin}/graphiql`
    }
  },
  data () {
    return {
      publicPath: process.env.BASE_URL,
      schemas: [
        'auth'
        ,'org'
        ,'app'
        ,'prj'
      ]
    }
  }
}
</script>
