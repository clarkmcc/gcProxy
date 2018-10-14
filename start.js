const fs = require('fs')
const inquirer = require('inquirer');
const chalk = require('chalk');
const options = require('./options.js')
const log = console.log;

const header = chalk.bgYellow.black

log(header('   Google Cloud Proxy Maker   '))
log(header('   @clarrkee   '))
log("Follow the prompts to spin up Squid 3 proxy servers on Google Cloud Compute Instances")


inquirer
  .prompt([
    {type: "list", message:"Server location", name:"location", choices:options.locations(), default: "us-east1-b"},
    {type: "number", message:"How many servers?", name:"qty", default: 1},
    {type: "number", message:"Instance type", name:"instance", choices:options.instances(), default: "f1-micro"},
    {type: "number", message:"Squid port", name:"port", default: 3128},
    {type: "string", message:"Squid username", name:"username", default: "admin"},
    {type: "password", message:"Squid password", name:"password", default: "admin"},
  ])
  .then(function(answers) {
    var serverNames = ""
    for(var i=0; i<answers.qty; i++){
        var serverName = "gcProx-" + Date.now().toString()
        serverNames = serverNames + " " + serverName
    }

    fs.readFile('./install.sh', function(err, data) {
        if(!err) {
            var file = data
            console.log(data)
        }
    })

    // var CMD = `gcloud compute instances create ` + serverNames + ` --zone=` + answers.location + ` --machine-type=` + instance + ` --image-family=debian-9 --image-project=debian-cloud ` + ` --metadata startup-script='

    // '`
    console.log(CMD)
  });