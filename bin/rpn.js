#!/usr/bin/env node

var fs = require('fs')
var rpn = require('../lib/rpn')

function formatLog(obj, char = '=') {
    console.log(char.repeat(50))
    console.log(obj)
    console.log(char.repeat(50))
    console.log("\n")
}

process.argv.slice(2).forEach(function(file) {
    var input = fs.readFileSync(file);
    var output = rpn.compile(input, {
        originalFilename: file
    }).toStringWithSourceMap({
        file: file.replace(/.[\w]+$/, ".js.map")
    });
    var sourceMapFile = file.replace(/.[\w]+$/, ".js.map");
    fs.writeFileSync(
        file.replace(/.[\w]+$/, ".js"),
        output.code + "\n//# sourceMappingURL=" + sourceMapFile
    );
    fs.writeFileSync(sourceMapFile, JSON.stringify(output.map));
    formatLog(`Compiled rpn DOME
origin-file: ${file}
source-file: ${file.replace(/.[\w]+$/, ".js")}
map-file   : ${sourceMapFile}`)
})
