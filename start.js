const fs = require('fs')
const inquirer = require('inquirer');
const chalk = require('chalk');
const terminalLink = require('terminal-link');
const http = require('http')
const si = require('systeminformation')
const hash = require('object-hash')
const address = require('address')
const axios = require('axios')
const options = require('./bin/options.js')
const log = console.log;
const permissionGranted = 200
const header = chalk.bgYellow.black

function getRandomInt(min, max) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min };
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

inquirer.prompt([
    {type: "string", message: "Username", name: "username", default: "clarkmcc"}
]).then(function(authenticate) {
    profiler(function(machine) {
        var identity = hash(machine)
        axios({
            method:'post',
            url:"http://us-central1-ppmproxy.cloudfunctions.net/verify_gcprox_license?username=" + authenticate.username,
            data: {
                username: authenticate.username,
                identity: identity,
                machine: machine,
                datetime: getDateTime(),
                timestamp: Math.floor(Date.now())
            }
        }).then(function(response) {
            if(response.status == permissionGranted) runner()
        }).catch(function(error) {
            console.log('There was an issue validating your license key, please verify that your username was correct.')
        });
    })
})

var profiler = function(callback) {
    var profile = {osInfo: null, mac: null}
    si.osInfo(function(osInfo) {
        profile.osInfo = osInfo
        address.mac(function(addr) {
            profile.mac = addr
            callback(profile)
        })
    })
}

var runner = function() {
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
                    log("Copy the following command to the Google Cloud shell before creating your instances. This command will open port " + setup.port + " on the VCP network firewall.")
                    log("")
                    log(chalk.grey.bgWhite("gcloud compute firewall-rules create gcprox --allow tcp:"+setup.port+" --source-ranges=0.0.0.0/0 --description='Opens the port "+setup.port+" in configuration to allow Squid proxy server to receive requests.'"))
                    log("")
                    log("The gcloud command has been output to " + chalk.yellow('output.gcprox') + '. Copy the contents of the file and execute it in the Google cloud shell.');
                })
            }
        })

    });
}