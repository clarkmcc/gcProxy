// Documentation - https://cloud.google.com/nodejs/docs/reference/compute/0.10.x/VM
'use strict';
const vm = require("./bin/vm.js");
const Compute = require('@google-cloud/compute');
const compute = new Compute({
  projectId: 'ppmproxy',
  keyFilename: './auth/keyfile.json'
});

var config = {

}

vm.create(compute, "us-central1-a", "my-instance", config).then(function(data) {
    console.log(data)
}).catch(function(err) {
    console.log(err)
})