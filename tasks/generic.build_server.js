"use strict";

var cp = require("child_process");

const debugCommands = ["go-bindata -debug -pkg data -o ./data/bindata.go ./public/...", "go build -tags \"debug\""];
const releaseCommands = ["go-bindata -pkg data -o ./data/bindata.go ./public/...", "go build -o alpinetime_release.exe"];

module.exports = function(isDebug, autorun) {
    var proc;
    return function builder(callback) {
        if(proc) {
            proc.kill("SIGINT");
        }
        (isDebug ? debugCommands : releaseCommands).forEach(function (command) {
            console.log("running: ", command);
            cp.execSync(command, {cwd: process.cwd()});
        });
        if (autorun) {
            proc = cp.spawn("./alpinetime");
            proc.stdout.on("data", function (data) {
                console.log(data.toString().replace(/\n+?$/m, ""));
                if(!!callback && data.toString().indexOf("-- Started --") >= 0) {
                    callback();
                }
            });
        } else if(callback) {
            callback();
        }
    };
};