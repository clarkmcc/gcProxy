// Documentation - https://cloud.google.com/nodejs/docs/reference/compute/0.10.x/VM
'use strict';
const fsutil = require("./bin/fs-utilities.js");
const chalk = require("chalk")
const cliui = require("cliui")();
const vm = require("./bin/vm.js");
const ui = require("./bin/ui.js")
const Compute = require('@google-cloud/compute');
const compute = new Compute({
  projectId: 'ppmproxy',
  keyFilename: './keyfile.json'
});


ui.getVMs(compute, vm, cliui)