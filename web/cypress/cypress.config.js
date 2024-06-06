// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
//   "reporter": "cypress-multi-reporters",
//   "reporterOptions": {
//     "configFile": "reporter-config.json"
//   }
// });
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    quiet: true,
    overwrite: false,
    html: false,
    json: true
  }
})