module.exports = {
  apps : [
    {
      name: "admin-wa-api",
      script: "./postgraphile-server.js",
      exec_mode: "cluster",
      instances: 1,
      ignore_watch: ["node_modules", "logs"],
      autorestart: false,
      env: {
        PORT: 3008,
        DB_CONNECTION_STRING: 'postgres://soro:soro$Secret@localhost/soro_sales',
        PG_DEFAULT_ROLE: 'soro_anonymous',
        GRAPHIQL: false,
        JWT_PG_TYPE_IDENTIFIER: 'soro.jwt_token',
        JWT_SECRET: 'S*PERDuPER$#(R#T',
        DISABLE_DEFAULT_MUTATIONS: true,
        CONFIRM_QUOTE_URL_BASE: 'http://localhost:3000/#/confirm-quote/',
        MAILGUN_API_KEY: 'MAILGUN_API_KEY',
        MAILGUN_DOMAIN: 'mg.soro.biz',
        GRAPHIQL: 'true',
        ENHANCE_GRAPHIQL: 'true',          
      },
      env_dev: {
        PORT: 8080,
        DB_CONNECTION_STRING: 'postgres://postgres:soro$Secret@10.138.0.11/soro_sales',
        PG_DEFAULT_ROLE: 'soro_anonymous',
        GRAPHIQL: false,
        JWT_PG_TYPE_IDENTIFIER: 'soro.jwt_token',
        JWT_SECRET: 'S*PERDuPER$#(R#T',
        DISABLE_DEFAULT_MUTATIONS: true,
        CONFIRM_QUOTE_URL_BASE: 'http://dev-wa.soro.biz/#/confirm-quote/',
        MAILGUN_API_KEY: 'MAILGUN_API_KEY',
        MAILGUN_DOMAIN: 'mg.soro.biz',
        GRAPHIQL: 'true',
        ENHANCE_GRAPHIQL: 'true',          
      },
      env_prod: {
        PORT: 8080,
        DB_CONNECTION_STRING: 'postgres://soro:soros)LO@10.138.0.5/soro_sales',
        PG_DEFAULT_ROLE: 'soro_anonymous',
        GRAPHIQL: false,
        JWT_PG_TYPE_IDENTIFIER: 'soro.jwt_token',
        JWT_SECRET: 'S*PERDuPER$#(R#T',
        DISABLE_DEFAULT_MUTATIONS: true,
        CONFIRM_QUOTE_URL_BASE: 'http://wa.soro.biz/#/confirm-quote/',
        MAILGUN_API_KEY: 'MAILGUN_API_KEY',
        MAILGUN_DOMAIN: 'mg.soro.biz'      
      },
    },
    {
      name: "leaf-mme-sync",
      script: "./src/leaf/sync/mme/leaf-sync-mmes.js",
      exec_mode: "cluster",
      instances: 1,
      ignore_watch: ["node_modules", "logs"],
      autorestart: false,
      env: {
        LEAF_MME_NAME: 'FRACTAL',
        LEAF_MME_CODE: 'M417364',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 5)
      },
      env_dev: {
        LEAF_MME_NAME: 'FRACTAL',
        LEAF_MME_CODE: 'M417364',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      },
      env_prod: {
        LEAF_MME_NAME: 'FRACTAL',
        LEAF_MME_CODE: 'M417364',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      }
    },
    {
      name: "leaf-fractal",
      script: "./src/leaf/syncServer/server.js",
      exec_mode: "cluster",
      instances: 1,
      ignore_watch: ["node_modules", "logs"],
      autorestart: false,
      env: {
        LEAF_MME_NAME: 'FRACTAL',
        LEAF_MME_CODE: 'M417364',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 5)
      },
      env_dev: {
        LEAF_MME_NAME: 'FRACTAL',
        LEAF_MME_CODE: 'M417364',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      },
      env_prod: {
        LEAF_MME_NAME: 'FRACTAL',
        LEAF_MME_CODE: 'M417364',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      }
    },
    {
      name: "leaf-stryps",
      script: "./src/leaf/syncServer/server.js",
      exec_mode: "cluster",
      instances: 1,
      ignore_watch: ["node_modules", "logs"],
      autorestart: false,
      env: {
        LEAF_MME_NAME: 'STRYPS',
        LEAF_MME_CODE: 'M417285',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 20)
      },
      env_dev: {
        LEAF_MME_NAME: 'STRYPS',
        LEAF_MME_CODE: 'M417285',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      },
      env_prod: {
        LEAF_MME_NAME: 'STRYPS',
        LEAF_MME_CODE: 'M417285',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      },
    },
    {
      name: "leaf-egherb",
      script: "./src/leaf/syncServer/server.js",
      exec_mode: "cluster",
      instances: 1,
      ignore_watch: ["node_modules", "logs"],
      autorestart: false,
      env: {
        LEAF_MME_NAME: 'EVERGREEN HERBAL',
        LEAF_MME_CODE: 'M078256',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 20)
      },
      env_dev: {
        LEAF_MME_NAME: 'EVERGREEN HERBAL',
        LEAF_MME_CODE: 'M078256',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      },
      env_prod: {
        LEAF_MME_NAME: 'EVERGREEN HERBAL',
        LEAF_MME_CODE: 'M078256',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      }
    },
    // {
    //   name: "leaf-epeaks",
    //   script: "./src/leaf/syncServer/server.js",
    //   exec_mode: "cluster",
    //   instances: 1,
    //   ignore_watch: ["node_modules", "logs"],
    //   autorestart: false,
    //   env: {
    //     LEAF_MME_NAME: 'EMERALD PEAKS',
    //     LEAF_MME_CODE: 'M416198',
    //     LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
    //     SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
    //     SORO_AUTH: true,
    //     SORO_USERNAME: 'sorobucket',
    //     SORO_PASSWORD: 'soro$Secret',
    //     POLLING_INTERVAL: (1000 * 60 * 20)
    //   },
    //   env_dev: {
    //     LEAF_MME_NAME: 'EMERALD PEAKS',
    //     LEAF_MME_CODE: 'M416198',
    //     LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
    //     SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
    //     SORO_AUTH: true,
    //     SORO_USERNAME: 'sorobucket',
    //     SORO_PASSWORD: 'soro$Secret',
    //     POLLING_INTERVAL: (1000 * 60 * 60)
    //   },
    //   env_prod: {
    //     LEAF_MME_NAME: 'EMERALD PEAKS',
    //     LEAF_MME_CODE: 'M416198',
    //     LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
    //     SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
    //     SORO_AUTH: true,
    //     SORO_USERNAME: 'sorobucket',
    //     SORO_PASSWORD: 'soro$Secret',
    //     POLLING_INTERVAL: (1000 * 60 * 60)
    //   }
    // },
    // {
    //   name: "leaf-pur",
    //   script: "./src/leaf/syncServer/server.js",
    //   exec_mode: "cluster",
    //   instances: 1,
    //   ignore_watch: ["node_modules", "logs"],
    //   autorestart: false,
    //   env: {
    //     LEAF_MME_NAME: 'QUALITY GROWERS',
    //     LEAF_MME_CODE: 'J417338',
    //     LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
    //     SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
    //     SORO_AUTH: true,
    //     SORO_USERNAME: 'sorobucket',
    //     SORO_PASSWORD: 'soro$Secret',
    //     POLLING_INTERVAL: (1000 * 60 * 20)
    //   },
    //   env_dev: {
    //     LEAF_MME_NAME: 'QUALITY GROWERS',
    //     LEAF_MME_CODE: 'J417338',
    //     LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
    //     SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
    //     SORO_AUTH: true,
    //     SORO_USERNAME: 'sorobucket',
    //     SORO_PASSWORD: 'soro$Secret',
    //     POLLING_INTERVAL: (1000 * 60 * 60)
    //   },
    //   env_prod: {
    //     LEAF_MME_NAME: 'QUALITY GROWERS',
    //     LEAF_MME_CODE: 'J417338',
    //     LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
    //     SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
    //     SORO_AUTH: true,
    //     SORO_USERNAME: 'sorobucket',
    //     SORO_PASSWORD: 'soro$Secret',
    //     POLLING_INTERVAL: (1000 * 60 * 60)
    //   }
    // },
    {
      name: "leaf-hannah",
      script: "./src/leaf/syncServer/server.js",
      exec_mode: "cluster",
      instances: 1,
      ignore_watch: ["node_modules", "logs"],
      autorestart: false,
      env: {
        LEAF_MME_NAME: 'HANNAH INDUSTRIES',
        LEAF_MME_CODE: 'J424223',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 20)
      },
      env_dev: {
        LEAF_MME_NAME: 'HANNAH INDUSTRIES',
        LEAF_MME_CODE: 'J424223',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      },
      env_prod: {
        LEAF_MME_NAME: 'HANNAH INDUSTRIES',
        LEAF_MME_CODE: 'J424223',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      }
    },
    // {
    //   name: "leaf-gold",
    //   script: "./src/leaf/syncServer/server.js",
    //   exec_mode: "cluster",
    //   instances: 1,
    //   ignore_watch: ["node_modules", "logs"],
    //   autorestart: false,
    //   env: {
    //     LEAF_MME_NAME: 'CAVIAR GOLD',
    //     LEAF_MME_CODE: 'M412861',
    //     LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
    //     SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
    //     SORO_AUTH: true,
    //     SORO_USERNAME: 'sorobucket',
    //     SORO_PASSWORD: 'soro$Secret',
    //     POLLING_INTERVAL: (1000 * 60 * 20)
    //   },
    //   env_dev: {
    //     LEAF_MME_NAME: 'CAVIAR GOLD',
    //     LEAF_MME_CODE: 'M412861',
    //     LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
    //     SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
    //     SORO_AUTH: true,
    //     SORO_USERNAME: 'sorobucket',
    //     SORO_PASSWORD: 'soro$Secret',
    //     POLLING_INTERVAL: (1000 * 60 * 60)
    //   },
    //   env_prod: {
    //     LEAF_MME_NAME: 'CAVIAR GOLD',
    //     LEAF_MME_CODE: 'M412861',
    //     LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
    //     SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
    //     SORO_AUTH: true,
    //     SORO_USERNAME: 'sorobucket',
    //     SORO_PASSWORD: 'soro$Secret',
    //     POLLING_INTERVAL: (1000 * 60 * 60)
    //   }
    // },
    {
      name: "leaf-heylo",
      script: "./src/leaf/syncServer/server.js",
      exec_mode: "cluster",
      instances: 1,
      ignore_watch: ["node_modules", "logs"],
      autorestart: false,
      env: {
        LEAF_MME_NAME: 'HEYLO',
        LEAF_MME_CODE: 'M417288',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 20)
      },
      env_dev: {
        LEAF_MME_NAME: 'HEYLO',
        LEAF_MME_CODE: 'M417288',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      },
      env_prod: {
        LEAF_MME_NAME: 'HEYLO',
        LEAF_MME_CODE: 'M417288',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      }
    },
    {
      name: "leaf-stickybudz",
      script: "./src/leaf/syncServer/server.js",
      exec_mode: "cluster",
      instances: 1,
      ignore_watch: ["node_modules", "logs"],
      autorestart: false,
      env: {
        LEAF_MME_NAME: 'STICKY BUDZ',
        LEAF_MME_CODE: 'J412076',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 20)
      },
      env_dev: {
        LEAF_MME_NAME: 'STICKY BUDZ',
        LEAF_MME_CODE: 'J412076',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      },
      env_prod: {
        LEAF_MME_NAME: 'STICKY BUDZ',
        LEAF_MME_CODE: 'J412076',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      }
    },
    {
      name: "leaf-mfused",
      script: "./src/leaf/syncServer/server.js",
      exec_mode: "cluster",
      instances: 1,
      ignore_watch: ["node_modules", "logs"],
      autorestart: false,
      env: {
        LEAF_MME_NAME: 'MFUSED',
        LEAF_MME_CODE: 'M415766',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 20)
      },
      env_dev: {
        LEAF_MME_NAME: 'MFUSED',
        LEAF_MME_CODE: 'M415766',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      },
      env_prod: {
        LEAF_MME_NAME: 'MFUSED',
        LEAF_MME_CODE: 'M415766',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      }
    },
    {
      name: "leaf-wow",
      script: "./src/leaf/syncServer/server.js",
      exec_mode: "cluster",
      instances: 1,
      ignore_watch: ["node_modules", "logs"],
      autorestart: false,
      env: {
        LEAF_MME_NAME: 'W.O.W. INDUSTRIES',
        LEAF_MME_CODE: 'J413922',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 20)
      },
      env_dev: {
        LEAF_MME_NAME: 'W.O.W. INDUSTRIES',
        LEAF_MME_CODE: 'J413922',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      },
      env_prod: {
        LEAF_MME_NAME: 'W.O.W. INDUSTRIES',
        LEAF_MME_CODE: 'J413922',
        LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
        SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
        SORO_AUTH: true,
        SORO_USERNAME: 'sorobucket',
        SORO_PASSWORD: 'soro$Secret',
        POLLING_INTERVAL: (1000 * 60 * 60)
      }
    },
      {
        name: "leaf-buddy",
        script: "./src/leaf/syncServer/server.js",
        exec_mode: "cluster",
        instances: 1,
        ignore_watch: ["node_modules", "logs"],
        autorestart: false,
        env: {
          LEAF_MME_NAME: 'BUDDY BOY FARMS',
          LEAF_MME_CODE: 'J412053',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 20)
        },
        env_dev: {
          LEAF_MME_NAME: 'BUDDY BOY FARMS',
          LEAF_MME_CODE: 'J412053',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 60)
        },
        env_prod: {
          LEAF_MME_NAME: 'BUDDY BOY FARMS',
          LEAF_MME_CODE: 'J412053',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 60)
        }
      },
      {
        name: "leaf-sweetwater",
        script: "./src/leaf/syncServer/server.js",
        exec_mode: "cluster",
        instances: 1,
        ignore_watch: ["node_modules", "logs"],
        autorestart: false,
        env: {
          LEAF_MME_NAME: 'SWEETWATER FARMS',
          LEAF_MME_CODE: 'J424256',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 20)
        },
        env_dev: {
          LEAF_MME_NAME: 'SWEETWATER FARMS',
          LEAF_MME_CODE: 'J424256',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 60)
        },
        env_prod: {
          LEAF_MME_NAME: 'SWEETWATER FARMS',
          LEAF_MME_CODE: 'J424256',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 60)
        }
      },
      {
        name: "leaf-puffin",
        script: "./src/leaf/syncServer/server.js",
        exec_mode: "cluster",
        instances: 1,
        ignore_watch: ["node_modules", "logs"],
        autorestart: false,
        env: {
          LEAF_MME_NAME: 'PUFFIN FARM',
          LEAF_MME_CODE: 'M426341',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 20)
        },
        env_dev: {
          LEAF_MME_NAME: 'PUFFIN FARM',
          LEAF_MME_CODE: 'M426341',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 60)
        },
        env_prod: {
          LEAF_MME_NAME: 'PUFFIN FARM',
          LEAF_MME_CODE: 'M426341',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 60)
        }
      },
      {
        name: "leaf-solstice",
        script: "./src/leaf/syncServer/server.js",
        exec_mode: "cluster",
        instances: 1,
        ignore_watch: ["node_modules", "logs"],
        autorestart: false,
        env: {
          LEAF_MME_NAME: 'OVER THE TOP',
          LEAF_MME_CODE: 'M412056',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 20)
        },
        env_dev: {
          LEAF_MME_NAME: 'OVER THE TOP',
          LEAF_MME_CODE: 'M412056',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 60)
        },
        env_prod: {
          LEAF_MME_NAME: 'OVER THE TOP',
          LEAF_MME_CODE: 'M412056',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 60)
        }
      },
      {
        name: "leaf-wave",
        script: "./src/leaf/syncServer/server.js",
        exec_mode: "cluster",
        instances: 1,
        ignore_watch: ["node_modules", "logs"],
        autorestart: false,
        env: {
          LEAF_MME_NAME: 'WAVE',
          LEAF_MME_CODE: 'M417008',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'http://localhost:3000/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 20)
        },
        env_dev: {
          LEAF_MME_NAME: 'WAVE',
          LEAF_MME_CODE: 'M417008',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'https://dev-wa.soro.biz/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 60)
        },
        env_prod: {
          LEAF_MME_NAME: 'WAVE',
          LEAF_MME_CODE: 'M417008',
          LEAF_BASE_API: 'https://traceability.lcb.wa.gov/api/v1',
          SORO_QUOTING_API_ENDPOINT: 'https://wa.soro.biz/graphql',
          SORO_AUTH: true,
          SORO_USERNAME: 'sorobucket',
          SORO_PASSWORD: 'soro$Secret',
          POLLING_INTERVAL: (1000 * 60 * 60)
        }
      },
      ]
}