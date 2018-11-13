const vm = require('./vm.js');

module.exports.create = function(config) {
    /*
    / Author: Clark McCauley
    / Date: November 12th, 2018
    / Usage:

    vm.create({
        computeObject: compute,
        zone: "us-east1-b",
        name: "development-server",
        config: vm.getConfig({
            machineType: "f1-micro",
            config: "proxy"
        })
    }).then(function(data) {
        console.log(data)
    }).catch(function(err) {
        console.log(err)
    })

    */
    return new Promise(function(resolve, reject) {
        // Initialize the compute object passed in from the caller function
        config.computeObject
        // Specify zone to create instance within
        .zone(config.zone)
        // Call the GCP instance creation function
        .createVM(config.name, config.config)
        // Handle the response
        .then(function(data) {
            resolve(data)
        }).catch(function(err) {
            reject(err)
        })
    });
}

module.exports.getData = function(config) {
    /*
    / Author: Clark McCauley
    / Date: November 12th, 2018
    / Usage:
    /

    vm.getData({
        computeObject: compute,
        zone: "us-east1-b",
        name: "private-devops",
        responseType: "api"
    }).then(function(data) {
        console.log(data)
    })

    */
    return new Promise(function(resolve, reject) {
        // Initialize the compute object passed in from the caller function
        config.computeObject
        // Specify zone to create instance within
        .zone(config.zone)
        // Call the GCP vm function
        .vm(config.name)
        // Get data
        .get()
        // Handle response
        .then(function(data) {
            // Determine what data to send back to the caller based on 'config.responseType'
            switch(config.responseType) {
                case "api":
                    resolve(data[1]);
                    break;
                case "instance":
                    resolve(data[0]);
                    break;
                default:
                    reject("Error, invalid responseType specified")
            }
        }).catch(function(err) {
            reject(); console.error;
        })
    })
}

module.exports.getConfig = function(config) {
    /*
    / Author: Clark McCauley
    / Date: November 12th, 2018
    / Usage:

    vm.getConfig({machineType: "f1-micro", type: "proxy"})

    */

    var a = {};
    switch(config.type) {
        case "proxy":
            a.os = "debian-9";
            a.tags = ["proxy"];
            a.https = true;
            a.machineType = config.machineType;
            return a;
            break;
        default:
            return 'Error, invalid type provided';
            break;
    }
}