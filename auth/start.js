// Documentation - https://cloud.google.com/nodejs/docs/reference/compute/0.10.x/VM
'use strict';
const runner_vm = require('./auth/bin/vm.js');
const Compute = require('@google-cloud/compute');
const compute = new Compute({
  projectId: 'ppmproxy',
  keyFilename: './auth/keyfile.json'
});

runner_vm.create(compute, zone, name, config)