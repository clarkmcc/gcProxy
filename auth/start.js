// Documentation - https://cloud.google.com/nodejs/docs/reference/compute/0.10.x/VM
'use strict';
const fsutil = require("./bin/fs-utilities.js")
const vm = require("./bin/vm.js");
const Compute = require('@google-cloud/compute');
const compute = new Compute({
  projectId: 'ppmproxy',
  keyFilename: './keyfile.json'
});



