const fs = require('fs')
const inquirer = require('inquirer');
const chalk = require('chalk');
const options = require('./bin/options.js')
const log = console.log;

const header = chalk.bgYellow.black

function getRandomInt(min, max) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min };

log(header('   Google Cloud Proxy Maker   '))
log("Follow the prompts to spin up Squid 3 proxy servers on Google Cloud Compute Instances")


inquirer
  .prompt([
    //{type: "string", message:"GCP project name", name:"project"},
    {type: "list", message:"Server location", name:"location", choices:options.locations(), default: "us-east1-b"},
    {type: "number", message:"How many servers?", name:"qty", default: 1},
    {type: "list", message:"Instance type", name:"instance", choices:options.instances(), default: "f1-micro"},
    {type: "list", message: "Make server preemptible?", name: "preemptible", choices:options.preemptible()},
    {type: "string", message:"Instance name", name: "name", default: "gcprox"},
    {type: "number", message:"Squid port", name:"port", default: 3128},
    {type: "string", message:"Squid username", name:"username", default: "admin"},
    {type: "password", message:"Squid password", name:"password", default: "admin"},
  ])
  .then(function(setup) {
    var serverNames = ""
    for(var i=0; i<setup.qty; i++){
        var serverName = setup.name + '-' + Date.now().toString() + "-" + getRandomInt(100,999)
        serverNames = serverNames + " " + serverName
    }

    fs.readFile('./bin/install.sh', function(err, data) {
        if(!err) {
            var output = ""
            var file = data.toString()
            output = file.replace('SQUID_USERNAME', setup.username)
            output = output.replace('SQUID_PASSWORD', setup.password)
            output = output.replace('SQUID_PORT', setup.port)

            if(setup.port != 3128) output = output.replace('#SED_SQUID_PORT', '/bin/sed -i "s/http_port 3128/http_port ' + setup.port + '/g" /etc/squid/squid.conf')

            var command = `gcloud compute instances create ` + serverNames + ` ` + setup.preemptible + ` --zone=` + setup.location + ` --machine-type=` + setup.instance + ` --image-family=debian-9 --image-project=debian-cloud ` + ` --metadata startup-script='`  + output +`'`

            fs.writeFile('./output.gcprox', command, function() {
                log("")
                //log(chalk.red.bold("[DISCLAIMER] ") + "These gcloud commands execute procedures that can cause billing on the GCP to occur. Please make sure you know what you're doing (i.e. creating 20 n1 instances is not smart).")
                log("The gcloud command has been output to " + chalk.yellow('output.sh') + '. Copy the script and execute it in the Google cloud shell.');
            })
        }
    })

  });
