// Documentation - https://cloud.google.com/nodejs/docs/reference/compute/0.10.x/VM
"use strict";
const express = require("express");
const app = express()
const fsutil = require("./bin/fs-utilities.js");
const chalk = require("chalk")
const cliui = require("cliui")();
const vm = require("./bin/vm.js");
const ui = require("./bin/ui.js")
const Compute = require("@google-cloud/compute");
const compute = new Compute({
  projectId: "ppmproxy",
  keyFilename: "./bin/keyfile.json"
});

app.use(express.static("public"))

app.get("/api/getvms", function(req,res) {
    vm.getVMs({computeObject: compute}).then(function(data) {
        console.log(data[0][0].metadata)
        res.send(data)
    })
})

// ui.getVMs(compute, vm, cliui)

app.listen(process.env.PORT || 3000, function(err) {
    if(err) console.error
})