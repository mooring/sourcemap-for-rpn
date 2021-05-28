var jison = require('jison')
var sourceMap = require('source-map')
var lex = require('./rpn/lex').lex
var bnf = require('./rpn/bnf').bnf

var parser = new jison.Parser({
    lex: lex,
    bnf: bnf
})
parser.yy = require('./rpn/ast')

function formatLog(obj, char = '=') {
    console.log(char.repeat(50))
    console.log(obj)
    console.log(char.repeat(50))
    console.log("\n")
}

function getPreamble() {
    return new sourceMap.SourceNode(null, null, null, "")
        .add("var __rpn   = {};\n")
        .add("__rpn.stack = [];\n")
        .add("__rpn.scope = {};\n")
        .add("__rpn.temp  = 0; \n")
        .add("__rpn.push = function (val){\n")
        .add("    __rpn.stack.push(val);\n")
        .add("};\n")
        .add("__rpn.pop = function (){\n")
        .add("    if(__rpn.stack.length > 0){\n")
        .add("        return __rpn.stack.pop();\n")
        .add("    }else{\n")
        .add("        throw new Error('can\\'t pop from empty stack');\n")
        .add("    }\n")
        .add("};\n")
        .add("__rpn.print = function( val, repeat){\n")
        .add("    var tmp = [];\n")
        .add("    while(repeat-- > 0){tmp.push(val);}\n")
        .add("    console.log(tmp.join(''));\n")
        .add("};\n")
}
exports.compile = function(input, data) {
    var expressions = parser.parse(input.toString())
    var preamble = getPreamble()
    var result = new sourceMap.SourceNode(null, null, null, preamble);
    result.add(expressions.map(function(exp) {
        return exp.compile(data)
    }))
    return result;
}
