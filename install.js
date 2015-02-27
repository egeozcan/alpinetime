var cp = require('child_process');
var commands = [
	"mkdir public", //todo: replace with module mkdirp
  "npm install",
  "go get github.com/jteeuwen/go-bindata/...",
  "go get github.com/elazarl/go-bindata-assetfs/...",
	"go-bindata -pkg data -o ./data/bindata.go ./public/...",
  "go get"
];

commands.forEach(function (command) {
  console.log("running: ", command);
  cp.execSync(command, {cwd: process.cwd()});
})