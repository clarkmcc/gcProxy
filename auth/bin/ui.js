const chalk = require("chalk")
const ui = require("cliui")();
const vm = require("./vm.js");
const fsutil = require("./fs-utilities.js");

module.exports.getVMs = function(compute) {


    vm.getVMs({
        computeObject: compute
    }).then(function(data) {
        data[0].forEach(function(vm) {
            ui.div(
                {
                    text: "______________________________" + "\n" + chalk.bold(vm.name) + "\n" + vm.metadata.status,
                    width: 30,
                    padding: [0, 0, 0, 0]
                },
                {
                    text: "____________________" + "\n" + vm.metadata.networkInterfaces[0].accessConfigs[0].natIP + "\n" + chalk.grey(vm.metadata.networkInterfaces[0].accessConfigs[0].name),
                    width: 20,
                    padding: [0, 0, 0, 0]
                }/*,
                {
                    text: data.scheduling.preemptible + "\r\n" + chalk.grey("Preemptible"),
                    width: 20,
                    padding: [2, 2, 2, 2]
                }*/
            )
        })

        console.log(ui.toString())
    })
}