var cp = require('child_process');
var commands = [
  "npm install -g gulp-cli",
  "npm install",
  "go get",
  "go get github.com/jteeuwen/go-bindata/...",
  "go get github.com/elazarl/go-bindata-assetfs/..."
];

commands.forEach(function (command) {
  console.log("running: ", command);
  cp.execSync(command, {cwd: process.cwd()});
})