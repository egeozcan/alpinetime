"use strict";

var cp = require("child_process");

const debugCommands = ["go-bindata -debug -pkg data -o ./data/bindata.go ./public/...", "go build -tags \"debug\""];
const releaseCommands = ["go-bindata -pkg data -o ./data/bindata.go ./public/...", "go build -o alpinetime_release.exe"];

module.exports = function(isDebug, autorun) {
    var proc = null, inProgress = false;
    return function builder(callback) {
        if (inProgress) {
            console.log("Build in progress...");
            setTimeout(builder.bind(null, callback), 1000);
            return;
        }
        if(proc) {
            proc.kill("SIGINT");
        }
        inProgress = true;
        (isDebug ? debugCommands : releaseCommands).forEach(function (command) {
            console.log("running: ", command);
            cp.execSync(command, {cwd: process.cwd()});
        });
        if (autorun) {
            proc = cp.spawn("./alpinetime");
            proc.stdout.on("data", function (data) {
                console.log(data.toString().replace(/\n+?$/m, ""));
                if(data.toString().indexOf("-- Started --") >= 0) {
                    if(callback) callback();
                    inProgress = false;
                }
            });
        } else {
            if(callback) callback();
            inProgress = false;
        }
    };
};