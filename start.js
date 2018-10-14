const inquirer = require('inquirer');
const chalk = require('chalk');
const locations = require('./locations.js')
const log = console.log;

const header = chalk.bgYellow.black

log(header('   Google Cloud Proxy Maker   '))
log(header('   @clarrkee   '))
log("Follow the prompts to spin up Squid 3 proxy servers on Google Cloud Compute Instances")


inquirer
  .prompt([
    {type: "list", message:"Server location", name:"location", choices:locations(), default: "us-east1-b"},
    {type: "number", message:"How many servers?", name:"qty", default: 1},
    {type: "string", message:"Squid username", name:"username", default: "admin"},
    {type: "password", message:"Squid password", name:"password", default: "admin"},
  ])
  .then(function(answers) {
    console.log(answers)
  });